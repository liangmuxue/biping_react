import React from 'react';
import { connect } from 'dva';
import { buildPagiProps } from '../../common/paginationRoute';
import { rebuildMessageList } from '../../../selectors/messageList';
import InfiniteListView from '../../../components/infiniteListView';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTagCard from '../../../pageComponents/weixin/subTag/subTagCard.jsx';
import SubContentCard from '../../../pageComponents/weixin/subTag/subContentCard.jsx';

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
    super.componentWillMount();
    // 初始化时进行查询
    this.props.dispatch({
      type: 'subTagList/msgQuery',
      payload: { ...this.props.params },
    });
  }
  render() {
    console.log(this.props);
    // 加工数据
    const { messageList } = rebuildMessageList({ messageList: this.props });
    console.log('messageList is:', messageList);
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      renderRow: (rowData, sectionID, rowID) => {
        console.log('rowData is', rowData);
        return (
          <SubContentCard />
        );
      },
    });
    const height = document.documentElement.clientHeight;
    console.log('height is', height);
    const key = 'subTag';
    return (
      <div>
        <SubTagCard subTagObj={this.props} />
        <InfiniteListView
          bkey={key}
          needChange
          {...messageListProps}
          height={height}
          pageSize={this.props.paginationDef.pageSize}
        />
      </div>
    );
  }
}
function subTagProps(state) {
  console.log('subTagProps in messageList,state', state.subTagList);
  return state.subTagList;
}

export default connect(subTagProps)(mobileRouteComponent(SubTag));
