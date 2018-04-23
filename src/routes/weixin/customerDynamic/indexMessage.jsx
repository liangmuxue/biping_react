import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'dva';
import 'antd-mobile/es/wing-blank/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import InfiniteListView from '../../../components/infiniteListView';
import { buildPagiProps } from '../../common/paginationRoute';
import { rebuildMessageList } from '../../../selectors/messageList';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import MessageCard from '../../../pageComponents/weixin/message/messageCard.jsx';
import styles from './index.less';
/**
 * 老人动态页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
function genDynamics({
  dispatch, messageList,
}) {
  console.log('messageList is:', messageList);
  const messageListProps = buildPagiProps(dispatch, {
    ...messageList,
    renderRow: (rowData, sectionID, rowID) => {
      console.log('rowData is', rowData);
      return (
        <MessageCard msgObj={rowData} />
      );
    },
  });
  const height = document.documentElement.clientHeight * 3 / 4;
  return (
    <div>
      {/* 使用继承infinite的列表页组件，传递上拉加载更多的处理方法 */}
      <InfiniteListView {...messageListProps} height={height} />
    </div>
  );
}

@pureRender
class MessageList extends Component {
  render() {
    console.log('cd render');
    return genDynamics(this.props);
  }
}

function mapStateToProps(state, ownProps) {
  // 第一次进入时没有数据，直接返回
  if (!state.message.dataSource) {
    const { message } = state;
    return { message };
  }
  // 加工数据
  const messageList = rebuildMessageList(state.message);
  return messageList;
}


export default connect(mapStateToProps)(mobileRouteComponent(MessageList));
