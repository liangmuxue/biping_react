import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Modal from 'antd-mobile/lib/modal/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import Button from 'antd-mobile/lib/button/index';
import 'antd-mobile/es/modal/style/index.css';
import Hammer from 'react-hammerjs';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import HeaderBar from '../../../components/headerBar';
import style from './messageDetail.less';
import { config } from '../../../../config/environment';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import BaseComponent from '../baseComponent';
import html2canvas from 'html2canvas';
import { siteAnalysis } from '../../../utils/siteAnalysis.js';
import QrCodeWithLogo from 'qr-code-with-logo';
import MessageContent from '../../../pageComponents/weixin/message/messageContentCard.jsx';

/**
* 消息详情
* @author 赵永帅
* @Date  2018-6-12
*/

class MsgDetail extends BaseComponent {
  constructor(props) {
    console.log('props in MsgDetail', props);
    super(props);
    this.tmListener = null;
    const self = this;
    this.pageDef = null;
    // this.setPageRef = (element) => {
    //   // 根据变量决定是否允许滑动
    //   this.pageDef = element;
    //   this.tmListener = document.body.addEventListener('touchmove', (event) => {
    //     self.touchMoveJudge(event);
    //   }, false);
    // };
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
    const { messageHost } = config.env;
    const { wechatHost } = config.env;
    let imgUrl = null;
    console.log('this.props', this.props);
    const { dispatch, msgDetailData, params } = this.props;
    const msgObj = msgDetailData.data;
    console.log('params1111', params);
    const { uid } = params;
    const url = `${wechatHost}${messageHost}/&response_type=code&scope=snsapi_userinfo&state=messageId${msgObj.mid}fromUser${uid}#wechat_redirect`;
    console.log('url1111', url);
    document.getElementById('showShare').style.display = 'block';
    QrCodeWithLogo.toImage({
      image: document.getElementById('ewmImg'),
      content: url,
      width: 380,
      logo: {
        src: '/images/msgImages/copy.png',
      },
    }).then(() => {
      console.log('success777');
      html2canvas(document.getElementById('showShare'), { useCORS: true }).then((canvas) => {
        imgUrl = canvas.toDataURL('image/png');
        document.getElementById('showShare').style.display = 'none';
        dispatch({
          type: 'messageDetail/shareMsg',
          payload: {
            messageId: msgObj.mid,
            imgUrl,
          },
        });
        // 分享消息埋点
        dispatch({
          type: 'app/analysis',
          payload: {
            page: siteAnalysis.pageConst.MESSAGEDETAIL,
            action: siteAnalysis.actConst.SHAREMESSAGE,
            opt: { messageTitle: msgObj.title, messageId: msgObj.mid },
          },
        });
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
    // 进入详情埋点，same类型
    this.props.dispatch({
      type: 'app/analysis',
      payload: {
        page: siteAnalysis.pageConst.MESSAGEDETAIL,
        action: siteAnalysis.actConst.BROWSE,
        opt: { enterMessageCase: 'sameCase' },
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
    console.log(`likeClick in:${msgObj.title}`);
    dispatch({
      type: 'messageDetail/msgLike',
      // 不需要传是否喜欢，model中根据原数据判断
      payload: {
        messageId: msgObj.mid,
      },
    });
    // 喜欢消息埋点
    dispatch({
      type: 'app/analysis',
      payload: {
        page: siteAnalysis.pageConst.MESSAGEDETAIL,
        action: siteAnalysis.actConst.LIKEMESSAGE,
        opt: { messageTitle: msgObj.title },
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
    // 不喜欢消息埋点
    dispatch({
      type: 'app/analysis',
      payload: {
        page: siteAnalysis.pageConst.MESSAGEDETAIL,
        action: siteAnalysis.actConst.UNLIKEMESSAGE,
        opt: { messageTitle: msgObj.title },
      },
    });
  }
  render() {
    console.log('MsgDetail render', this.props);
    const {
      msgDetailData, showMsgShare, params, imgUrl, curAct,
    } = this.props;
    let ifEnterGroup = 0;
    if (params) {
      ({ ifEnterGroup } = params);
    }
    console.log('msgDetail', msgDetailData);
    // 如果没有数据，需要首先进行查询
    if (!msgDetailData || !msgDetailData.data) {
      return null;
    }
    const msgObj = msgDetailData.data;
    console.log('msgObj44444', msgDetailData.data);
    // 内容（异动币和币事件、交易所公告的不同）
    let contentCard = null;
    // 分享文章内容
    let shareContentCard = null;
    let val = null;
    console.log('88888888', msgDetailData.data.typeCode);
    if (msgDetailData.data.typeCode && msgDetailData.data.typeCode === 'currencies') {
      console.log('MessageContent', msgObj.typeCode);
      contentCard = (<MessageContent content={JSON.parse(msgObj.content)} />);
      shareContentCard = contentCard;
    } else {
      val = msgObj.content.replace(/＆nbsp;/g, ' ');
      contentCard = (<div id="article" className={style.article} dangerouslySetInnerHTML={{ __html: val }} />);
      shareContentCard =
      (<div className={style.picFonts} dangerouslySetInnerHTML={{ __html: val }} />);
    }

    if (!showMsgShare) {
      console.log('touchmove rm', this.tmListener);
      document.body.removeEventListener('touchmove', this.tmListener);
    }
    // 分享消息的图片链接
    const msgImgUrl = imgUrl;
    const modal = (<Modal
      className={style.shareBg}
      visible={showMsgShare}
      transparent
      maskClosable
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      onClose={this.closeShare.bind(this)}
    >
      <div >
        <div style={{ lineHeight: '1.08rem' }}>
          <span className={style.titleTips}>长按图片发送好友</span>
          <img src="/images/msgImages/1.png" alt="" className={style.finger} />
        </div>
        <div style={{ height: 500, overflow: 'scroll' }}>
          <img src={msgImgUrl} alt="" />
        </div>
      </div>

    </Modal>);

    // 喜欢
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

    // 类似消息不存在，隐藏
    let hideRelateMsg = 0;
    const { relateMsg } = msgObj;
    console.log('relateMsg', relateMsg.length);
    if (relateMsg.length === 0) {
      hideRelateMsg = 1;
    }
    // 进入的时候需要跳到头部
    if (curAct && curAct === 'queryDetail') {
      window.scrollTo(0, 0);
    }


    return (
      <div id="page_messageDetail" ref={this.setPageRef}>
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
            <div className={style.caption}>{msgObj.title}</div>
            <div className={style.noticeTitle}>
              <div className={style.times}>{msgObj.time}</div>
              <Hammer >
                <div
                  className={style.detail}
                  onClick={this.tagClick.bind(this)}
                >
                  {msgObj.verbname}
                </div>
              </Hammer>
            </div>
            <div className={msgObj.verbname === '币事件' ? style.startTimes : style.hide}>事件开始日期：{msgObj.startTime}</div>
            <div className={style.clear} />
            {contentCard}

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

            <div className={hideRelateMsg === 0 ? style.hide : style.showBox} />

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

        <div id="showShare">
          <div className={style.picBox}>
            <div className={style.picKinds}><span >{msgObj.verbname}</span></div>
            <div className={style.picTitle}>{msgObj.title}</div>
            <div className={msgObj.verbname === '币事件' ? style.startTimes : style.hide}>事件开始日期：{msgObj.startTime}</div>
            <div className={style.clear} />
            {shareContentCard}

            <div className={style.wechatBox}>
              <img id="ewmImg" crossOrigin="anonymous" alt="" />
              <div className={style.readAll}>扫码阅读全文</div>
            </div>

            <div className={style.bottomCopy}>
              <div>
                <div className={style.copytop}>
                  <img src="/images/msgImages/copy.png" />
                </div>

                <div className={style.logotop}>【币评】你最想要的币市信息</div>
                <div className={style.logobottom}>biping.io <i style={{ color: '#032c4c' }}>扫码阅读全文</i></div>
              </div>
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
