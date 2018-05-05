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

/**
* 老人账号信息页面
* @author 梁慕学
* @Date  2017-12-25
*/

class MsgDetail extends Component {
  constructor(props) {
    console.log('props in MsgDetail', props);
    super(props);
  }
  // 去开通
  toOpen() {
    const { dispatch, msgDetailData } = this.props;
    const { tagId, tagName } = msgDetailData;
    console.log('to open in md', this.props);
    // 跳转到订阅包页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'toOpen',
        params: { typeId: tagId, typeName: tagName, backPath: 'messageDetail' },
      },
    });
  }
  // 分享点击
  shareClick(event) {
    const { dispatch, msgDetailData } = this.props;
    const msgObj = msgDetailData.data;
    console.log(`shareClick in:${msgObj.mid}`, event);
    // event.prventDefault();
    dispatch({
      type: 'messageDetail/shareMsg',
      payload: {
        messageId: msgObj.mid,
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
  componentDidMount() {
    console.log('componentDidMount messageLisst', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'messageDetail/detailQuery',
      payload: { ...this.props.params },
    });
  }
  render() {
    console.log('MsgDetail render', this.props);
    const { msgDetailData, showMsgShare } = this.props;
    console.log('msgDetail', msgDetailData);
    // 如果没有数据，需要首先进行查询
    if (!msgDetailData) {
      return null;
    }
    const msgObj = msgDetailData.data;
    console.log('msgObj44444', msgObj);
    // 分享消息的图片链接
    const msgImgUrl = `${config.env.msgShareUrl}/${msgObj.mid}.png`;
    // msgImgUrl = `${config.env.msgShareUrl}/gim_test_tnb99_net.png`;
    const modal = (<Modal
      visible={showMsgShare}
      transparent
      maskClosable={false}
      closable
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      onClose={this.closeShare.bind(this)}
      footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.closeShare.bind(this); } }]}
    >
      <div style={{ overflow: 'hidden' }}>
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

    return (
      <div className={style.contentBox}>
        {modal}
        <HeaderBar headerText="详情" backRouteLink={this.props.backPath} {...this.props} />
        <div className={style.bannerBox}>
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
            <div className={style.detail}>{msgObj.verbname}</div>
          </div>

          <div className={style.caption}>{msgObj.title}</div>
          <div className={style.article}>{msgObj.content}
          </div>

          <div className={style.toFriend}>
            <Hammer onTap={this.shareClick.bind(this)}>
              <a>分享给好友</a>
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

          <div className={style.similarBox}>
            <div className={style.similarCenter}>
              <div className={style.similarTitle}>类似消息</div>
              <ul className={style.similarListUl}>
                {msgObj.relateMsg.map(msg =>
                  (
                    <li className={style.similarListLi}>
                      <Button onClick={() => this.switchTitle(msg)} className={style.similarList}>{msg.title}</Button>
                    </li>
                  ))}
              </ul>
            </div>
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
