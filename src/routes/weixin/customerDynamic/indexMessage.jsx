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
 * 消息列表页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

@pureRender
class MessageList extends Component {
  cardClick(msgObj) {
    console.log('cardClick in,msgObj:', msgObj);
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'messageDetail' },
    });
  }
  render() {
    console.log('cd render');
    const { messageList } = this.props;
    console.log('messageList is:', messageList);
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      renderRow: (rowData, sectionID, rowID) => {
        console.log('rowData is', rowData);
        return (
          <MessageCard msgObj={rowData} cardClick={this.cardClick.bind(this)} />
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
}

function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps in indexMessage,state', state);
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
