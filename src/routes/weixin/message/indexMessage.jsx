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
import BaseComponent from '../baseComponent';
import styles from './index.less';


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
    if (systemUser) {
      ifEnterGroup = systemUser.ifEnterGroup;
    }
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'messageDetail',
        params: {
          messageId: msgObj.mid, backPath: 'indexMessage', tagId: msgObj.tagId, tagName: msgObj.tagName, ifEnterGroup,
        },
      },
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
      return (<div className={styles.empty}>
        <div><img src="/images/indexImg/nomsg.png" className={styles.buycar} /></div>
        <div className={styles.notread}>暂无消息</div>
      </div>);
    }
    if (flag === 0 && this.props.indexMessage.list.length === 0) {
      return (<div className={styles.empty}>
        <div><img src="/images/indexImg/nomsg.png" className={styles.buycar} /></div>
        <div className={styles.notread}>暂无消息</div>
      </div>);
    }

    // 加工数据
    const { messageList } = rebuildMessageList({ messageList: this.props.indexMessage });
    console.log('messageList', messageList);
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      pageSize: this.props.indexMessage.paginationDef.pageSize,
      renderRow: (rowData, sectionID, rowID) => {
        // console.log('rowData is', rowData);
        return (
          <MessageCard
            msgObj={rowData}
            cardClick={this.cardClick.bind(this)}
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
