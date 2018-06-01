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
import EmptyMsgCard from '../../../pageComponents/weixin/message/emptyMsgCard.jsx';
import HeaderBar from '../../../components/headerBar';
import BaseComponent from '../baseComponent';

/**
 * 消息列表页面--某个标签
 * @author 梁慕学
 * @Date  2018-4-29
 */

@pureRender
class MessageList extends BaseComponent {
  cardClick(msgObj) {
    const backPath = 'messageList';
    console.log(`cardClick in,backPath:${backPath}`);
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'messageDetail',
        params: {
          messageId: msgObj.mid, backPath, tagId: msgObj.tagId, tagName: msgObj.tagName,
        },
      },
    });
  }

  emptyClick(e) {
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'SubList' },
    });
  }
  componentWillMount() {
    console.log('componentDidMount messageLisst', this.props);
    super.componentWillMount();
    // 初始化时进行查询
    this.props.dispatch({
      type: 'messageList/msgQuery',
      payload: { ...this.props.params },
    });
  }

  render() {
    console.log('cd render in messageLisst', this.props);
    if (!this.props.dataSource) {
      return null;
    }
    // 加工数据
    const { messageList } = rebuildMessageList({ messageList: this.props });
    console.log('messageList is:', messageList);
    const { totalCount } = messageList.pagination;
    if (totalCount === 0) {
      return (
        <EmptyMsgCard emptyClick={this.emptyClick.bind(this)} />
      );
    }
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      renderRow: (rowData, sectionID, rowID) => {
        console.log('rowData is', rowData);
        return (
          <MessageCard msgObj={rowData} cardClick={this.cardClick.bind(this)} />
        );
      },
    });
    const height = document.documentElement.clientHeight;
    const { tagName } = this.props.paramsData;
    const key = 'messageList';
    return (
      <div>
        <div style={{ width: '100%', height: '.88rem' }} />
        <HeaderBar
          headerText={tagName}
          backRouteLink="indexMessage"
          {...this.props}
        />
        <InfiniteListView
          bkey={key}
          {...messageListProps}
          height={height}
          pageSize={this.props.paginationDef.pageSize}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps in messageList,state', state);
  return state.messageList;
}


export default connect(mapStateToProps)(mobileRouteComponent(MessageList));
