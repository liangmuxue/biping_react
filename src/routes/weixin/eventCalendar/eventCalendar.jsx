import React from 'react';
import { connect } from 'dva';
import { Flex, Calendar } from 'antd-mobile';
import 'antd-mobile/es/flex/style/index.css';
import 'antd-mobile/es/calendar/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import styles from './eventCalendar.less';
import EventList from './children/eventList';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import BaseComponent from '../baseComponent';
import { convertDate, weekDay } from '../../../utils/dateFormat';

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
    };
  }
  componentWillMount() {
    // 获取服务器时间
    this.props.dispatch({
      type: 'eventCalendar/getTime',
    });
    // 获取币事件类型
    this.props.dispatch({
      type: 'eventCalendar/getTypeList',
    });
    this.getListData();
  }

  getListData() {
    // 获取币事件日历列表,初始化时进行查询
    const { eventCalendar } = this.props;
    const { eventTime } = eventCalendar;
    var time = null;
    const type = this.state.typeId || null;
    if (eventTime && eventTime.data) {
      time = convertDate(eventTime.data.time, 'YYYY-MM-DD') || null;
    }
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
    this.getListData();
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
    this.getListData();
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
  }

  // 子组件type点击
  changeType(id) {
    this.setState({
      typeId: id,
    });
    setTimeout(() => {
      this.getListData();
    }, 300);
  }
  // 子组件提醒点击
  reminder(data) {
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
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'messageDetail',
        params: {
          messageId: data.id,
          backPath: 'eventCalendar',
          tagName: '币事件日历',
        },
      },
    });
  }
  render() {
    console.log('eventCalendar render', this.props);
    const { eventCalendar } = this.props;
    const { eventTime } = eventCalendar;
    if (!eventTime || !eventTime.data) {
      return null;
    }
    console.log('eventCalendar render', this.props);
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
        <div className={styles.calendar}>
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
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onConfirm.bind(this)}
          minDate={new Date(eventTime.data.staTime)}
          maxDate={new Date(eventTime.data.time + 63158400000)}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { eventCalendar: state.eventCalendar };
}

export default connect(mapStateToProps)(mobileRouteComponent(EventCalendar));
