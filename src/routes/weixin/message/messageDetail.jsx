import React, { Component } from 'react';
import { connect } from 'dva';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import Hammer from 'react-hammerjs';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from './messageDetail.less';
import HeaderBar from '../../../components/headerBar';
import { config } from '../../../../config/environment';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import BaseComponent from '../baseComponent';
import html2canvas from 'html2canvas';

/**
* 老人账号信息页面
* @author 梁慕学
* @Date  2017-12-25
*/

class MsgDetail extends BaseComponent {
  constructor(props) {
    console.log('props in MsgDetail', props);
    super(props);
  }
  componentWillMount() {
    console.log('componentWillMount messageDetail', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'messageDetail/detailQuery',
      payload: { ...this.props.params },
    });
    super.componentWillMount();
  }
  // 去开通
  toOpen() {
    const { dispatch, msgDetailData } = this.props;
    const { tagId, tagName } = msgDetailData;
    console.log('to open in md', this.props);
    const { preventFlag } = this.props;
    console.log(`preventFlag is:${preventFlag}`);
    // 避免重复点击，用标志控制
    if (!preventFlag) {
      // 跳转到订阅包页面
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId: tagId, typeName: tagName, backPath: 'messageDetail' },
        },
      });
    }
  }
  // 分享点击
  shareClick(event) {
    let imgUrl = null;
    const { dispatch, msgDetailData } = this.props;
    const msgObj = msgDetailData.data;
    document.getElementById('showShare').style.display = 'block';
    html2canvas(document.getElementById('showShare')).then((canvas) => {
      imgUrl = canvas.toDataURL('image/png');
      document.getElementById('showShare').style.display = 'none';
      dispatch({
        type: 'messageDetail/shareMsg',
        payload: {
          messageId: msgObj.mid,
          imgUrl,
        },
      });
    });
    // event.prventDefault();
  }
  // 类似消息的点击
  switchTitle(msg) {
    console.log('switchTitle in:', this.props);
    const { tagId, tagName } = this.props.msgDetailData;
    // event.prventDefault();
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'messageDetail',
        params: {
          messageId: msg.id, backPath: this.props.backPath, tagId, tagName,
        },
      },
    });
  }
  closeShare() {
    const { dispatch } = this.props;
    console.log('closeShare in');
    dispatch({
      type: 'messageDetail/closeShare',
    });
  }
  // 跳转到信息类型列表页面
  tagClick() {
    console.log('props in tagcli', this.props);
    const { tagId, tagName } = this.props.msgDetailData;
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'messageList', params: { tagId, tagName, backPath: 'messageDetail' } },
    });
  }

  likeClick() {
    const { dispatch, msgDetailData } = this.props;
    const msgObj = msgDetailData.data;
    console.log(`likeClick in:${msgObj.mid}`);
    dispatch({
      type: 'messageDetail/msgLike',
      // 不需要传是否喜欢，model中根据原数据判断
      payload: {
        messageId: msgObj.mid,
      },
    });
  }
  unlikeClick() {
    const { dispatch, msgDetailData } = this.props;
    const msgObj = msgDetailData.data;
    console.log(`unlikeClick in:${msgObj.mid}`);
    dispatch({
      type: 'messageDetail/msgUnLike',
      // 不需要传是否喜欢，model中根据原数据判断
      payload: {
        messageId: msgObj.mid,
      },
    });
  }
  render() {
    console.log('MsgDetail render', this.props);
    const {
      msgDetailData, showMsgShare, params, imgUrl,
    } = this.props;
    let ifEnterGroup = 0;
    if (params) {
      ({ ifEnterGroup } = params);
    }
    console.log('msgDetail', msgDetailData);
    // 如果没有数据，需要首先进行查询
    if (!msgDetailData) {
      return null;
    }
    const msgObj = msgDetailData.data;
    console.log('msgObj44444', msgObj);
    if (!msgObj.mid) {
      return null;
    }
    // 分享消息的图片链接
    const msgImgUrl = imgUrl;
    const imgShareUrl = `${config.env.imgShareUrl}/qrcode/${msgObj.mid}.png`;
    // msgImgUrl = `${config.env.msgShareUrl}/gim_test_tnb99_net.png`;

    const modal = (<Modal
      className={style.shareBg}
      visible={showMsgShare}
      transparent
      maskClosable
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      onClose={this.closeShare.bind(this)}
    >
      <div>
        <div style={{ lineHeight: '.7rem' }}>
          <span className={style.titleTips}>长按图片发送好友</span>
          <img src="/images/msgImages/1.png" alt="" className={style.finger} />
        </div>
        <img src={msgImgUrl} alt="" />
      </div>

    </Modal>);


    const likeArea = (<Hammer onTap={this.likeClick.bind(this)}>
      <div>
        <img
          src={msgObj.userlike === 1 ? '/images/details/zan.png' : '/images/details/buzan.png'}
          className={style.goodImg}
          alt=""
        />
        <span className={style.numbers}>{msgObj.likeCnt}</span>
      </div>
    </Hammer>);

    // 不喜欢
    const unlikeArea = (<Hammer onTap={this.unlikeClick.bind(this)}>
      <div>
        <img
          src={msgObj.userunlike === 1 ? '/images/details/cai.png' : '/images/details/bucai.png'}
          className={style.goodImg}
          alt=""
        />
        <span className={style.numbers}>不喜欢</span>
      </div>
                        </Hammer>);

    const val = msgObj.content.replace(/＆nbsp;/g, ' ');
    // 类似消息不存在，隐藏
    let hideRelateMsg = 0;
    const { relateMsg } = msgObj;
    console.log('relateMsg', relateMsg.length);
    if (relateMsg.length === 0) {
      hideRelateMsg = 1;
    }
    // 需要调到头部
    window.scrollTo(0, 0);
    return (
      <div>
        <div className={style.contentBox}>
          {modal}
          <HeaderBar headerText="详情" backRouteLink={this.props.backPath} {...this.props} />
          <div className={style.fullBox} />
          <div className={ifEnterGroup === 0 ? style.bannerBox : style.hide}>
            <div><img src="/images/details/banner.png" className={style.bannerPic} /></div>
            <div className={style.btnBox}>
              <WingBlank>
                <Button type="primary" onClick={this.toOpen.bind(this)} className={style.toButton}>去开通</Button><WhiteSpace />
              </WingBlank>
            </div>
          </div>

          <div className={style.notice}>
            <div className={style.noticeTitle}>
              <div className={style.times}>{msgObj.time}</div>
              <Hammer >
                <div className={style.detail} onClick={this.tagClick.bind(this)}>{msgObj.verbname} </div>
              </Hammer>
            </div>

            <div className={style.caption}>{msgObj.title}</div>
            <div className={style.article} dangerouslySetInnerHTML={{ __html: val }} />

            <div className={style.friendBox}>
              <div className={style.toFriend} />
              <Hammer onTap={this.shareClick.bind(this)}>
                <a className={style.tofriends}>分享给好友</a>
              </Hammer>
            </div>

          </div>

          <div className={style.up}>
            <div className={style.upCenter}>
              <div className={style.upTitle}>所属标签</div>

              <ul className={style.labels}>
                {msgObj.tagList.map(msg =>
                  (
                    <li className={style.labelsList}>
                      {msg.name}
                    </li>
                  ))}
              </ul>

              <div className={style.likesBox}>
                <div className={style.like}>
                  {likeArea}
                </div>
                <div className={style.unlike}>
                  {unlikeArea}
                </div>
              </div>
            </div>

            <div className={hideRelateMsg === 0 ? style.similarBox : style.hide}>
              <div className={style.similarCenter}>
                <div className={style.similarTitle}>类似消息</div>
                <ul className={style.similarListUl}>
                  {msgObj.relateMsg.map(msg =>
                  (
                    <li className={style.similarListLi}>
                      <Button
                        onClick={() => this.switchTitle(msg)}
                        className={style.similarList}
                      >{msg.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={style.hide} id="showShare">
          <div className={style.picBox}>
            <div className={style.picKinds}><span >{msgObj.verbname}</span></div>

            <div className={style.picTitle}>{msgObj.title}</div>
            <div className={style.picFonts} dangerouslySetInnerHTML={{ __html: val }} />

            <div className={style.wechatBox}>
              <img src={imgShareUrl} alt="" />
            </div>

            <div className={style.bottomName}>【币评】</div>
            <div className={style.bottomStation}>国内领先的区块链行业综合网站</div>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToPropsmessageDetail', state);
  // 直接返回本model
  // const { messageDetail, app } = state;
  return state.messageDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(MsgDetail));
