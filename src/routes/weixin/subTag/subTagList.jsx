import React from 'react';
import { connect } from 'dva';
import { buildPagiProps } from '../../common/paginationRoute';
import { rebuildMessageList } from '../../../selectors/messageList';
import InfiniteListView from '../../../components/infiniteListView';
import Hammer from 'react-hammerjs';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTagCard from '../../../pageComponents/weixin/subTag/subTagCard.jsx';
import SubContentCard from '../../../pageComponents/weixin/subTag/subContentCard.jsx';
import { siteAnalysis } from '../../../utils/siteAnalysis.js';
import HeaderBar from '../../../components/headerBar';
import style from './subTagList.less';

/**
* 消息列表页面--某个标签
* @author 赵永帅
* @Date  2018-6-13
*/
class SubTag extends BaseComponent {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }

  componentWillMount() {
    console.log('componentDidMount messageLisst', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'subTagList/msgQuery',
      payload: { ...this.props.params },
    });
    super.componentWillMount();
  }

  // 卡片点击事件，进入详情页
  cardClick(msgObj) {
    console.log('cardClick in,msgObj:', this.props);
    const { systemUser } = this.props;
    // 是否入群
    let ifEnterGroup = 0;
    let uid = null;
    if (systemUser) {
      ifEnterGroup = systemUser.ifEnterGroup;
      uid = systemUser.uid;
    }
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'messageDetail',
        params: {
          messageId: msgObj.mid, backPath: 'indexMessage', tagId: msgObj.tagId, tagName: msgObj.tagName, ifEnterGroup, uid,
        },
      },
    });
    // 进入详情埋点，feed类型
    this.props.dispatch({
      type: 'app/analysis',
      payload: {
        page: siteAnalysis.pageConst.MESSAGEDETAIL,
        action: siteAnalysis.actConst.USERSMTMESSAGEDETAIL,
        opt: { enterMessageCase: 'feedCase' },
      },
    });
  }
  backTo() {
    console.log('back to in');
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'indexMessage', backArrow: true, currentPage: 'subTagList',
      },
    });
  }
  render() {
    console.log('subTagList99999', this.props);
    const { data } = this.props.subTagList;
    if (!data) {
      return null;
    }

    // 加工数据
    const { messageList } = rebuildMessageList({ messageList: this.props.subTagList });
    console.log('messageList is:', messageList);
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      renderRow: (rowData, sectionID, rowID) => {
        console.log('rowData is', rowData);
        return (
          <SubContentCard subObj={rowData} cardClick={this.cardClick.bind(this)} />
        );
      },
    });
    const height = document.documentElement.clientHeight;
    console.log('height is', height);
    const key = 'subTag';
    return (
      <div data-name="subTagList">
        <div className={style.ufFixed}>
          <Hammer onTap={this.backTo.bind(this)}>
            <img className={style.coinArrow} src="/images/coinList/coinArrow.png" alt="-" />
          </Hammer>
        </div>
        <InfiniteListView
          noPullRefresh
          bkey={key}
          needChange
          {...messageListProps}
          pageHead={<SubTagCard subTagObj={this.props} />}
          height={height}
          top={40}
          renderFooter={() => (<div style={{ padding: 0, textAlign: 'center' }} />)}
          pageSize={this.props.subTagList.paginationDef.pageSize}
        />
      </div>
    );
  }
}
function subTagProps(state) {
  console.log('subTagProps in messageList,state', state);
  return { subTagList: state.subTagList, systemUser: state.app.systemUser };
}

export default connect(subTagProps)(mobileRouteComponent(SubTag));
