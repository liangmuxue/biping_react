import React from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'dva';
import 'antd-mobile/es/wing-blank/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import InfiniteListView from '../../../components/infiniteListView';
import { buildPagiProps } from '../../common/paginationRoute';
import { rebuildMessageList } from '../../../selectors/messageList';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import MessageCard from '../../../pageComponents/weixin/message/messageCard.jsx';
import EmptyMsgCard from '../../../pageComponents/weixin/message/emptyMsgCard.jsx';
import BaseComponent from '../baseComponent';
import styles from './index.less';
import { siteAnalysis } from '../../../utils/siteAnalysis.js';

/**
* 消息列表页面
* @author 梁慕学
* @Date  2017-12-25
*/

@pureRender
class MessageList extends BaseComponent {
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
  // logo点击事件
  logoClick(msgObj) {
    // 跳转到信息类型列表页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subTagList', params: { ...msgObj, backPath: 'indexMessage' } },
    });
  }

  // 标签点击，进行条件筛选
  tagClick(msgObj) {
    // 跳转到信息类型列表页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'messageList', params: { ...msgObj, backPath: 'indexMessage' } },
    });
  }
  emptyClick(e) {
    console.log('toSublist55555');
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subList' },
    });
  }
  componentWillMount() {
    console.log('componentWillMount indexMessage', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'indexMessage/msgQuery',
      payload: {
        modelDef: {
          modelName: 'indexMessage',
          endpoint: 'messageList',
        },
        pagination: {
          current: 0, // 当前页码
          pageSize: 10, // 默认每页条目
        },
      },
    });
  }
  render() {
    console.log('cd renders in indexMessage', this.props);
    const { indexMessage } = this.props;
    if (!indexMessage) {
      return null;
    }

    const { flag, list } = this.props.indexMessage;
    console.log(`flag inx is:${flag}`);
    // 未开通大类别,需要判断list为空
    if (flag && flag === 1001) {
      console.log('pagination2222', flag);
      return (<EmptyMsgCard emptyClick={this.emptyClick.bind(this)} />);
    }
    // 未订阅小类别,需要判断list为空
    if (flag && flag === 1002) {
      return (
        <div className={styles.empty}>
          <div><img src="/images/indexImg/nomsg.png" className={styles.buycar} alt="" /></div>
          <div className={styles.notread}>暂无消息</div>
        </div>);
    }
    if (flag === 0 && this.props.indexMessage.list.length === 0) {
      return (
        <div className={styles.empty}>
          <div><img src="/images/indexImg/nomsg.png" className={styles.buycar} alt="" /></div>
          <div className={styles.notread}>暂无消息</div>
        </div>);
    }

    // 加工数据
    const { messageList } = rebuildMessageList({ messageList: this.props.indexMessage });
    console.log('messageList in idx', messageList);
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      pageSize: this.props.indexMessage.paginationDef.pageSize,
      renderRow: (rowData, sectionID, rowID) => {
        // console.log('rowData is', rowData);
        return (
          <MessageCard
            msgObj={rowData}
            cardClick={this.cardClick.bind(this)}
            logoClick={this.logoClick.bind(this)}
          />
        );
      },
    });
    const height = document.documentElement.clientHeight;
    const key = 'indexMessage';
    return (
      <div>
        {/* 使用继承infinite的列表页组件，传递上拉加载更多的处理方法 */}
        <InfiniteListView
          bkey={key}
          {...messageListProps}
          height={height}
          top={0}
          pageSize={this.props.indexMessage.paginationDef.pageSize}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps in indexMessage,state', state);
  return { indexMessage: state.indexMessage, systemUser: state.app.systemUser };
}


export default connect(mapStateToProps)(mobileRouteComponent(MessageList));
