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
import style from './subTag.less';

/**
 * 消息列表页面--某个标签
 * @author 梁慕学
 * @Date  2018-4-29
 */

@pureRender
class SubTag extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  // 卡片点击
  handleTap() {
    console.log('handleTap in,props:', this.props);
    this.props.cardClick(this.props.msgObj);
  }
  handleTagTap(e) {
  // 点击标签，进行筛选
    console.log('handleTagTap in,props:', this.props);
    e.preventDefault();
    this.props.tagClick(this.props.msgObj);
  }


  render() {
    const { msgObj } = this.props;
    return (
      <div className={style.mesList} >
        <div className={style.bgBox} ><img className={style.bgPic} src="/images/coinList/coinBg.png" /></div>
      </div>


    );
  }
}


export default SubTag;
