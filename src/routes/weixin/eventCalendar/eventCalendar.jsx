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
      show: false,
      config: {
        type: 'one',
      },
      weekArrZn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      thisDate: null,
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
    // 获取币事件日历列表
    this.props.dispatch({
      type: 'eventCalendar/getListData',
    })
  }

  // 点击今日
  clickThisDay() {
    this.props.dispatch({
      type: 'eventCalendar/getTime',
    });
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
  }
  // 展示日历
  toggleCalendar() {
    this.setState({
      show: !this.state.show,
    });
  }
  // 星期点击
  weekChange() {
    console.log('weekChange');
  }

  render() {
    console.log('calendar**=>', this.props);
    const { eventTime } = this.props;
    if (!eventTime || !eventTime.data) {
      return null;
    }
    const weekArr = weekDay(eventTime.data.time); // 一周的日期数组
    this.state.thisDate = new Date().getDate(); // 今天
    let thisDateDOm = null;
    if (this.state.thisDate == convertDate(eventTime.data.time, 'DD')) {
      thisDateDOm = null;
    } else {
      thisDateDOm = <span onClick={this.clickThisDay.bind(this)} className={styles.today}>今</span>;
    }
    return (
      <div>
        <div className={styles.calendar}>
          <div className={styles.clearFix}>
            <div className={styles.left}>
              <span className={styles.time}>{convertDate(eventTime.data.time, 'YYYY年MM月')}</span>
              {thisDateDOm}
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
              <Flex.Item className={`${styles.item} ${msg == convertDate(eventTime.data.time, 'DD') ? styles.selectItem : ''}`} key={msg} onClick={this.weekChange.bind(this)} >
                <span className={styles.text1}>{this.state.weekArrZn[index]}</span>
                <span className={styles.text2}>{msg}</span>
              </Flex.Item>
            ))}
          </Flex>
        </div>
        <EventList {...this.props} />
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
  return state.eventCalendar;
}

export default connect(mapStateToProps)(mobileRouteComponent(EventCalendar));
