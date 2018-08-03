import React from 'react';
import { connect } from 'dva';
import QrCodeWithLogo from 'qr-code-with-logo';
import html2canvas from 'html2canvas';
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
import { siteAnalysis } from '../../../utils/siteAnalysis.js';
import MessageContent from '../../../pageComponents/weixin/message/messageContentCard.jsx';
import EventDetail from './children/eventDetail';
import { urlUtils } from '../../../utils/urlUtil.js';


/**
* 消息详情
* @author 赵永帅
* @Date  2018-6-12
*/
function shareEvent(dispatch, shortUrl, msgDetailData) {
  // 隐藏分享内容背景
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100%';
  document.documentElement.style.overflow = 'hidden';
  document.getElementById('showShare').style.display = 'block';

  // 替换过空格之后的内容
  const replaceVal = document.getElementById('shareArticle');
  const srcs = [];
  if (replaceVal && replaceVal !== null) {
    const imgs = replaceVal.querySelectorAll('img');
    console.log('get images', imgs);
    if (imgs && imgs.length > 0) {
      for (let i = 0, j = imgs.length; i < j; i++) {
        // 解决跨域,传递现有的img、src数组
        srcs.push({ id: `imgUrl${i}`, src: imgs[i].src });
        imgs[i].setAttribute('id', `imgUrl${i}`);
      }
    }
  }
  dispatch({
    type: 'messageDetail/getImgString',
    payload: {
      srcs,
    },
    onComplete(data) {
      for (let i = 0; i < data.length; i++) {
        const imgs = document.getElementById(data[i].id);
        imgs.setAttribute('src', data[i].src);
      }
    },
  });
  const dom1 = document.getElementById('picBox');
  if (dom1) {
    dom1.style.paddingBottom = '0';
  }
  const { host } = config.env;
  let imgUrl = null;
  const url = `${host}/shortUrl/${shortUrl}`;
  const msgObj = msgDetailData.data;
  console.log(`share url is:${url}`);
  // TODO: img部分机型显示不出来
  /* QrCodeWithLogo.toImage({
    image: document.getElementById('ewmImg'),
    content: url,
    width: 120,
    logo: {
      src: '/images/msgImages/copy.png',
    },
  }) */
  /* QrCodeWithLogo.toCanvas({
    canvas: document.getElementById('canvas'),
    content: url,
    width: 120,
    bgColor: 'transparent',
    logo: {
      src: '/images/msgImages/copy.png',
    },
  }).then(() => {
    console.log('success777', document.getElementById('showShare'));
    html2canvas(document.getElementById('showShare'), { useCORS: false, allowTaint: false }).then((canvas) => {
      imgUrl = canvas.toDataURL('image/png');
      // console.log('imgUrl=>>', imgUrl);
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
  }); */
  /* let imgDom = document.getElementsByName('shareImg')[0];
  dispatch({
    type: 'messageDetail/getQrcode',
    payload: url,
    onComplete(data) {
      const { response } = data;
      const urlBase = response.data.base64;
      imgDom.setAttribute('src', `data:image/png;base64,${urlBase}`);
      html2canvas(document.getElementById('showShare'), { useCORS: false, allowTaint: false }).then((canvas) => {
        imgUrl = canvas.toDataURL('image/png');
        // console.log('imgUrl=>>', imgUrl);
        document.getElementById('showShare').style.display = 'none';
        dispatch({
          type: 'messageDetail/shareMsg',
          payload: {
            messageId: msgObj.mid,
            imgUrl,
          },
        });
        // 分享消息埋点
        /* dispatch({
          type: 'app/analysis',
          payload: {
            page: siteAnalysis.pageConst.MESSAGEDETAIL,
            action: siteAnalysis.actConst.SHAREMESSAGE,
            opt: { messageTitle: msgObj.title, messageId: msgObj.mid },
          },
        });
      });
    },
  }); */
  html2canvas(document.getElementById('showShare'), { useCORS: false, allowTaint: false }).then((canvas) => {
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
}
class MsgDetail extends BaseComponent {
  constructor(props) {
    console.log('props in MsgDetail', props);
    const { analysisParam } = urlUtils;
    const state = analysisParam('state');
    if (state && state.indexOf('messageId') !== -1) {
      const tagNameArea = state.split('tagName');
      // 分享进入时，在此补充tagName
      if (tagNameArea && tagNameArea.length > 1) {
        const tagName = tagNameArea[1].split('#')[0];
        console.log(`tagName get:${tagName}`);
        const tagNameReal = decodeURIComponent(tagName);
        console.log(`tagNameReal get:${tagNameReal}`);
        props.params.tagName = tagNameReal;
      }
    }
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount messageDetail', this.props);
    const { params } = this.props;
    // 初始化时进行查询
    this.props.dispatch({
      type: 'messageDetail/detailQuery',
      payload: { ...this.props.params },
    });
    // 初始化查询币种介绍
    this.props.dispatch({
      type: 'messageDetail/coinInfo',
      payload: { ...this.props.params },
    });
    //  请求币事件日历的币价信息
    if (params && params.tagName == '币事件') {
      this.props.dispatch({
        type: 'messageDetail/coinPrice',
        payload: { ...this.props.params },
      });
      this.props.dispatch({
        type: 'messageDetail/baseDetail',
        payload: { ...this.props.params },
      });
    }
    super.componentWillMount();
  }
  componentDidMount() {
    const { params } = this.props;
    const { enterMessageCase } = params;
    console.log('componentDidMount=>', enterMessageCase);
    let objs = {
      '进入': '进入详情',
    };
    if (enterMessageCase) {
      objs = {
        '进入': '进入详情',
        enterMessageCase,
      };
    }
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'messageDetail',
        obj: objs,
      },
    });
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
  shareClick() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'messageDetailShareClick',
        obj: {
          '分享': '详情页分享',
        },
      },
    });
    const { messageHost, wechatHost } = config.env;
    const { msgDetailData, params, dispatch } = this.props;
    const msgObj = msgDetailData.data;
    const { uid } = params;
    console.log('msgObj is', msgObj);
    const url = `${wechatHost}${messageHost}/&response_type=code&scope=snsapi_userinfo&state=messageId${msgObj.mid}fromUser${uid}tagName${msgObj.verbname}#wechat_redirect`;
    this.props.dispatch({
      type: 'messageDetail/shortUrl',
      payload: url,
      onComplete(res) {
        const { data } = res;
        shareEvent(dispatch, data.data.reuslturl, msgDetailData);
      },
    });
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
    /* this.props.dispatch({
      type: 'app/analysis',
      payload: {
        page: siteAnalysis.pageConst.MESSAGEDETAIL,
        action: siteAnalysis.actConst.BROWSE,
        opt: { enterMessageCase: 'sameCase' },
      },
    }); */
  }
  closeShare() {
    const { dispatch } = this.props;
    console.log('closeShare in');
    dispatch({
      type: 'messageDetail/closeShare',
    });
    // 恢复背景滚动
    document.body.style.overflow = 'scroll';
    document.documentElement.style.overflow = 'scroll';
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
  // 带标签的列表页
  tagListClick(msgObj) {
    return;
    const { dispatch, msgDetailData } = this.props;
    const msgDetailDataObj = msgDetailData.data;
    const { mid } = msgDetailDataObj;
    // 传递标签id
    if (msgObj) {
      msgObj.labelId = msgObj.id;
    }
    console.log('messageDetail msgObj', msgObj);
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'subTagList',
        params: {
          ...msgObj, mid, fromLabel: true, backPath: 'messageDetail',
        },
      },
    });
  }

  forecast(bol) {
    console.log('forecast=>', bol);
    const { params } = this.props;
    const { messageId } = params;
    this.props.dispatch({
      type: 'messageDetail/forecast',
      payload: {
        status: bol,
        id: messageId,
      },
    });
  }
  /* shortUrl() {
    const { messageHost, wechatHost } = config.env;
    const { msgDetailData, params } = this.props;
    const msgObj = msgDetailData.data;
    const { uid } = params;
    console.log('msgObj in short is', msgObj);
    const url = `${wechatHost}${messageHost}/&response_type=code&scope=snsapi_userinfo&state=messageId${msgObj.mid}fromUser${uid}tagName${msgObj.verbname}#wechat_redirect`;
    this.props.dispatch({
      type: 'messageDetail/shortUrl',
      payload: url,
    });
  } */

  render() {
    console.log('MsgDetail Now render', this.props);
    const {
      msgDetailData, showMsgShare, params, imgUrl, curAct, srcs, shortUrl,
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
    // 拿到数据之后长链接转短链接
    /* if (!shortUrl&&msgDetailData&&msgDetailData.data) {
      console.log("need get short url,msgDetailData:",msgDetailData);
      this.shortUrl();
    } */
    // 分享请求,只有点击share方法才进
    /* if (srcs && curAct && curAct === 'shareClick') {
      for (let i = 0; i < srcs.length; i++) {
        const imgs = document.getElementById(srcs[i].id);
        imgs.setAttribute('src', srcs[i].src);
      }
      shareEvent(this.props);
    } */
    const msgObj = msgDetailData.data;
    if (!msgObj.tagList && !msgObj.relateMsg && !msgObj.content) {
      return null;
    }
    console.log('msgObj44444', msgDetailData.data);
    // 内容（异动币和币事件、交易所公告的不同）
    let contentCard = null;
    // 分享文章内容
    let shareContentCard = null;
    let val = null;
    console.log('88888888', msgDetailData.data.typeCode);
    // if (msgDetailData.data.typeCode && msgDetailData.data.typeCode === 'currencies') {
    if (msgDetailData.data.verbid === 717 || msgDetailData.data.verbid === 718) {
      console.log('MessageContent', msgObj.typeCode);
      contentCard = (<MessageContent content={JSON.parse(msgObj.content)} />);
      shareContentCard = (<MessageContent content={JSON.parse(msgObj.content)} shareType={1} />);
    } else {
      if (!msgObj) {
        return null;
      }
      if (!msgObj.content) {
        msgObj.content = ' ';
      }
      val = msgObj.content.replace(/＆nbsp;/g, ' ');
      val = val.replace('https://biping.oss-cn-beijing.aliyuncs.com', 'http://biping.oss-cn-beijing.aliyuncs.com');
      // val = val.replace('//Static', '/Static');
      // console.log('val after rep:'+val);
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
        <div style={{ height: 400, overflow: 'scroll' }}>
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
    if (relateMsg && relateMsg.length === 0) {
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
            <Hammer onTap={this.shareClick.bind(this)}>
              <div className={style.friendBox}>
                <div className={style.toFriend} />
                <a className={style.tofriends}>分享给好友</a>
              </div>
            </Hammer>
          </div>
          <EventDetail forecast={bol => this.forecast(bol)} {...this.props} />
          <div className={style.up}>
            <div className={style.upCenter}>
              <div className={style.upTitle}>所属标签</div>
              <ul className={style.labels}>
                {msgObj.tagList.map(msg => (
                  <li className={style.labelsList}>
                    <Button
                      onClick={() => this.tagListClick(msg)}
                      className={style.similarList}
                    >{msg.name}
                    </Button>
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

        <div id="showShare" className={style.hide}>
          <div className={style.picBox} id="picBox">
            <div className={style.bgImg}>
              <img alt="币评" src="/images/msgImages/bg.jpg" />
            </div>
            <div className={style.shareCon}>
              <div className={style.picKinds}><span >{msgObj.verbname}</span></div>
              <div className={style.picTitle}>{msgObj.title}</div>
              <div className={msgObj.verbname === '币事件' ? style.startTimes : style.hide}>事件开始日期：{msgObj.startTime}</div>
              <div className={style.clear} />
              <div id="shareArticle">
                {shareContentCard}
                <EventDetail forecast={bol => this.forecast(bol)} {...this.props} />
              </div>
            </div>
            <div className={style.ewmCon}>
              {/* <canvas id="canvas" className={style.leftImg}></canvas> */}
              {/* <img alt="" name="shareImg" className={style.leftImg}  />  */}
              <img className={style.leftImg}  alt="" src="/images/share/ewm.jpg" />
              <img className={style.rightImg} src="/images/share/detail.jpg" alt="" />
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
