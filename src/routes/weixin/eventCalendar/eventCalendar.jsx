import React from 'react';
import { connect } from 'dva';
import QrCodeWithLogo from 'qr-code-with-logo';
import html2canvas from 'html2canvas';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import { Flex, Calendar } from 'antd-mobile';
import 'antd-mobile/es/flex/style/index.css';
import 'antd-mobile/es/calendar/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import styles from './eventCalendar.less';
import EventList from './children/eventList';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import BaseComponent from '../baseComponent';
import { convertDate, weekDay } from '../../../utils/dateFormat';
import { config } from '../../../../config/environment';
import { Toast } from 'antd-mobile';

function shareEvent(dispatch, shortUrl) {
  const { host } = config.env;
  // 隐藏分享内容背景
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100%';
  document.documentElement.style.overflow = 'hidden';
  document.getElementById('eventShareDom').style.display = 'block';
  // 替换过空格之后的内容
  const replaceVal = document.getElementById('contentImg');
  const srcs = [];
  if (replaceVal && replaceVal !== null) {
    const imgs = replaceVal.querySelectorAll('img');
    if (imgs && imgs.length > 0) {
      for (let i = 0, j = imgs.length; i < j; i++) {
        // 解决跨域,传递现有的img、src数组
        srcs.push({ id: `imgUrl${i}`, src: imgs[i].src });
        imgs[i].setAttribute('id', `imgUrl${i}`);
        imgs[i].setAttribute('src', `${host}/imgProxy?targetUrl=${imgs[i].src}`);
      }
    }
  }
  dispatch({
    type: 'eventCalendar/getImgString',
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
  const dom1 = document.getElementsByClassName('am-list-view-scrollview')[1];
  const dom2 = document.getElementsByClassName('am-list-view-scrollview-content')[1];
  const dom3 = document.getElementsByClassName('am-list-footer')[1];
  const dom4 = document.getElementsByClassName('list-view-section-body')[1];
  if (dom1) {
    dom1.style.height = 'auto';
  }
  if (dom2) {
    dom2.style.position = 'relative';
  }
  if (dom3) {
    dom3.style.height = '0px';
  }
  if (dom4) {
    dom4.style.marginBottom = '0px';
  }
  let imgUrl = null;
  const url = `${host}/shortUrl/${shortUrl}`;
  console.log(`share url is:${url}`);
  let imgDom = document.getElementsByName('shareImg')[0];
  dispatch({
    type: 'eventCalendar/getQrcode',
    payload: url,
    onComplete(data) {
      console.log('onComplete=>>>>', data);
      const { response } = data;
      const urlBase = response.data.base64;
      imgDom.setAttribute('src', `data:image/png;base64,${urlBase}`);
      imgDom.setAttribute('crossOrigin', 'Anonymous');
      html2canvas(document.getElementById('eventShareDom'), { useCORS: true, allowTaint: false }).then((canvas) => {
        imgUrl = canvas.toDataURL('image/png');
        document.getElementById('eventShareDom').style.display = 'none';
        Toast.hide();
        dispatch({
          type: 'eventCalendar/shareMsg',
          payload: {
            imgUrl,
          },
        });
      });
    },
  });
}
class EventCalendar extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false, // 日历组件显示
      config: {
        type: 'one', // 日历组件单选
      },
      weekArrZn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], // 一周汉字
      thisDate: null, // 当前日期 => DD
      typeId: '',
      shareTime: new Date().getTime(),
    };
  }
  componentWillMount() {
    const { eventCalendar, extraData } = this.props;
    console.log('extraData in', extraData);
    if (extraData && extraData.time) {
      this.props.dispatch({
        type: 'eventCalendar/getTimeSuccess',
        payload: {
          response: {
            data: { time: parseInt(extraData.time) },
          },
        },
      });
      this.getListData(extraData.time);
    } else {
      // 判断如果有时间的，不从服务器取了。
      if (!eventCalendar || !eventCalendar.eventTime || !eventCalendar.eventTime.data) {
        // 获取服务器时间
        this.props.dispatch({
          type: 'eventCalendar/getTime',
        });
        this.getListData();
      }
    }
    // 获取币事件类型
    this.props.dispatch({
      type: 'eventCalendar/getTypeList',
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'eventCalendar',
        obj: {
          '进入': '进入币事件日历',
        },
      },
    });
  }
  newShareEvent() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'eventCalendarShare',
      },
    });
    Toast.loading('正在生成...', 0);
    const { messageHost, wechatHost } = config.env;
    const { systemUser, dispatch } = this.props;
    const { uid } = systemUser;
    const times = this.state.shareTime;
    const wxUrl = `${wechatHost}${messageHost}/&response_type=code&scope=snsapi_userinfo&state=directPage_eventCalendar-fromUser_${uid}-time_${times}#wechat_redirect`;
    this.props.dispatch({
      type: 'eventCalendar/shortUrl',
      payload: wxUrl,
      onComplete(res) {
        const { data } = res;
        shareEvent(dispatch, data.data.reuslturl);
      },
    });
  }
  getListData(timeOri) {
    // 获取币事件日历列表,初始化时进行查询
    let time = null;
    const type = this.state.typeId || null;
    if (timeOri) {
      time = convertDate(parseInt(timeOri), 'YYYY-MM-DD') || null;
    }
    const times = parseInt(timeOri) || new Date().getTime();
    this.setState({
      shareTime: times,
    });
    this.props.dispatch({
      type: 'eventCalendar/getListData',
      payload: {
        filter: { time, type },
        modelDef: {
          modelName: 'eventCalendar',
          endpoint: 'event/eventList',
        },
        pagination: {
          current: 0, // 当前页码
          pageSize: 10, // 默认每页条目
        },
      },
    });
  }

  // 点击今日
  clickThisDay() {
    this.props.dispatch({
      type: 'eventCalendar/getTime',
    });
    setTimeout(() => {
      this.getListData();
    }, 300);
  }

  // 日历关闭
  onCancel() {
    this.setState({
      show: false,
    });
  }

  // 日历确定
  onConfirm(time) {
    this.setState({
      show: false,
    });
    this.props.dispatch({
      type: 'eventCalendar/confirmTime',
      payload: { time: time.getTime() },
    });
    this.getListData(time.getTime());
  }
  // 展示日历
  toggleCalendar() {
    this.setState({
      show: !this.state.show,
    });
  }
  // 星期点击
  weekChange(msg) {
    const { eventCalendar } = this.props;
    const { eventTime } = eventCalendar;
    const time = new Date(eventTime.data.time);
    const clickTime = new Date(time.getFullYear(), time.getMonth(), msg);
    this.onConfirm(clickTime);
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'eventCalendarDateClick',
        obj: {
          '日期': clickTime,
        },
      },
    });
  }

  // 子组件type点击
  changeType(id) {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'eventCalendarTypeClick',
        obj: {
          '币事件交易所点击': id,
        },
      },
    });
    this.setState({
      typeId: id,
    });
    const { eventCalendar } = this.props;
    const { eventTime } = eventCalendar;
    let time = null;
    if (eventTime && eventTime.data) {
      time = eventTime.data.time;
    }
    console.log('getListData in', eventCalendar);
    setTimeout(() => {
      this.getListData(time);
    }, 300);
  }
  // 子组件提醒点击
  reminder(data) {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'eventCalendarReminder',
      },
    });
    this.props.dispatch({
      type: 'eventCalendar/reminder',
      payload: {
        id: data.id,
      },
    });
  }
  // 去详情页
  toDetail(data) {
    console.log(this, data);
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'eventCalendarDetail',
        obj: {
          '名称': data.coincode,
          '标题': data.title,
        }
      },
    });
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'messageDetail',
        params: {
          messageId: data.id,
          backPath: 'eventCalendar',
          tagName: '币事件',
        },
      },
    });
  }
  // 分享点击
  shareClick() {
    Toast.loading('正在生成...', 0);
    // 隐藏分享内容背景
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.getElementById('eventShareDom').style.display = 'block';
    console.log(document.getElementById('ewmImg'));


    // 替换过空格之后的内容
    const replaceVal = document.getElementById('eventShareDom');
    const srcs = [];
    if (replaceVal && replaceVal !== null) {
      const imgs = replaceVal.querySelectorAll('img');
      if (imgs && imgs.length > 0) {
        for (let i = 0, j = imgs.length; i < j; i++) {
          // 解决跨域,传递现有的img、src数组
          srcs.push({ id: `imgUrl${i}`, src: imgs[i].src });
          imgs[i].setAttribute('id', `imgUrl${i}`);
        }
      }
    }

    const { dispatch } = this.props;
    console.log('ppppppppp', srcs);
    dispatch({
      type: 'eventCalendar/getImgString',
      payload: {
        srcs,
      },
    });
  }
  closeShare() {
    const { dispatch } = this.props;
    dispatch({
      type: 'eventCalendar/closeShare',
    });
    // 恢复背景滚动
    document.body.style.overflow = 'scroll';
    document.documentElement.style.overflow = 'scroll';
  }
  render() {
    console.log('eventCalendar render', this.props);
    const { eventCalendar } = this.props;
    const {
      eventTime, curAct, srcs, showMsgShare, imgUrl,
    } = eventCalendar;
    if (!eventTime || !eventTime.data) {
      return null;
    }
    if (!showMsgShare) {
      console.log('touchmove rm', this.tmListener);
      document.body.removeEventListener('touchmove', this.tmListener);
    }
    // 分享消息的图片链接
    const msgImgUrl = imgUrl;
    const modal = (<Modal
      className={styles.shareBg}
      visible={showMsgShare}
      transparent
      maskClosable
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      onClose={this.closeShare.bind(this)}
    >
      <div >
        <div style={{ lineHeight: '1.08rem' }}>
          <span className={styles.titleTips}>长按图片发送好友</span>
          <img src="/images/msgImages/1.png" alt="" className={styles.finger} />
        </div>
        <div style={{ height: 400, overflow: 'scroll' }}>
          <img src={msgImgUrl} alt="" />
        </div>
      </div>
    </Modal>);
    const weekArr = weekDay(eventTime.data.time); // 一周的日期数组
    this.state.thisDate = new Date().getDate(); // 今天
    let thisDateDom = null;
    if (this.state.thisDate == convertDate(eventTime.data.time, 'DD')) {
      thisDateDom = null;
    } else {
      thisDateDom = <span onClick={this.clickThisDay.bind(this)} className={styles.today}>今</span>;
    }
    return (
      <div>
        {modal}
        <div id="calendarDom" className={styles.calendar}>
          <div className={styles.clearFix}>
            <div className={styles.left}>
              <span className={styles.time}>{convertDate(eventTime.data.time, 'YYYY年MM月')}</span>
              {thisDateDom}
            </div>
            <div
              className={styles.right}
              onClick={this.toggleCalendar.bind(this)}
              onKeyUp={() => {}}
            >
              <img alt="日历" src="/images/calendar/calendar.png" />
            </div>
          </div>
          <Flex>
            {weekArr.map((msg, index) => (
              <Flex.Item className={`${styles.item} ${msg == convertDate(eventTime.data.time, 'DD') ? styles.selectItem : ''}`} key={msg} onClick={() => this.weekChange(msg)} >
                <span className={styles.text1}>{this.state.weekArrZn[index]}</span>
                <span className={styles.text2}>{msg}</span>
              </Flex.Item>
            ))}
          </Flex>
        </div>
        <EventList
          {...this.props}
          changeType={id => this.changeType(id)}
          reminder={data => this.reminder(data)}
          toDetail={data => this.toDetail(data)}
        />
        {/* <div className={styles.shareBtn} onClick={() => this.shareClick()}>
          <span>分享</span>
        </div> */}
        <div className={styles.shareBtn} onClick={() => this.newShareEvent()}>
          <span>分享</span>
        </div>
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onConfirm.bind(this)}
          minDate={new Date(eventTime.data.staTime)}
          maxDate={new Date(eventTime.data.time + 63158400000)}
        />
        <div id="eventShareDom" className={styles.shareDom}>
          <div id="calendarDom" className={styles.calendar}>
            <div className={styles.shareTop}>
              <p>事件日历</p>
              <p>{convertDate(eventTime.data.time, 'YYYY/MM/DD')}</p>
            </div>
            <Flex className={styles.flexTime}>
              {weekArr.map((msg, index) => (
                <Flex.Item className={`${styles.item} ${msg == convertDate(eventTime.data.time, 'DD') ? styles.selectItem : ''}`} key={msg} onClick={() => this.weekChange(msg)} >
                  <span className={styles.text1}>{this.state.weekArrZn[index]}</span>
                  <span className={styles.text2}>{msg}</span>
                </Flex.Item>
              ))}
            </Flex>
          </div>
          <div id="contentImg">
            <EventList
              {...this.props}
              changeType={id => this.changeType(id)}
              reminder={data => this.reminder(data)}
              toDetail={data => this.toDetail(data)}
            />
          </div>
          <div className={styles.bottomDom}>
            <img className={styles.leftImg} src="/images/share/calendar.jpg" alt="" />
            {/* <canvas id="canvas" className={styles.shareewm} /> */}
            <img className={styles.shareewm} name="shareImg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { eventCalendar: state.eventCalendar, extraData: state.app.directPageData.params, systemUser: state.app.systemUser, pagiLoading: state.app.pagiLoading };
}

export default connect(mapStateToProps)(mobileRouteComponent(EventCalendar));
