import React from 'react';
import { Flex, Calendar } from 'antd-mobile';
import 'antd-mobile/es/flex/style/index.css';
import 'antd-mobile/es/calendar/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import styles from './eventCalendar.less';
import EventList from './children/eventList'

class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      config: {
        type: 'one',
      },
    };
  }
  onCancel() {
    this.setState({
      show: false,
    });
  }
  onConfirm(time) {
    console.log(time);
    this.setState({
      show: false,
    });
  }
  toggleCalendar() {
    this.setState({
      show: !this.state.show,
    });
  }
  render() {
    return (
      <div>
        <div className={styles.calendar}>
          <div className={styles.clearFix}>
            <div className={styles.left}>
              <span className={styles.time}>2018年6月</span>
              <span className={styles.today}>今</span>
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
            <Flex.Item className={`${styles.item} ${styles.selectItem}`}>
              <span className={styles.text1}>周日</span>
              <span className={styles.text2}>03</span>
            </Flex.Item>
            <Flex.Item className={styles.item}>
              <span className={styles.text1}>周一</span>
              <span className={styles.text2}>04</span>
            </Flex.Item>
            <Flex.Item className={styles.item}>
              <span className={styles.text1}>周二</span>
              <span className={styles.text2}>05</span>
            </Flex.Item>
            <Flex.Item className={styles.item}>
              <span className={styles.text1}>周三</span>
              <span className={styles.text2}>06</span>
            </Flex.Item>
            <Flex.Item className={styles.item}>
              <span className={styles.text1}>周四</span>
              <span className={styles.text2}>07</span>
            </Flex.Item>
            <Flex.Item className={styles.item}>
              <span className={styles.text1}>周五</span>
              <span className={styles.text2}>08</span>
            </Flex.Item>
            <Flex.Item className={styles.item}>
              <span className={styles.text1}>周六</span>
              <span className={styles.text2}>09</span>
            </Flex.Item>
          </Flex>
        </div>
        <EventList />
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onConfirm.bind(this)}
        />
      </div>
    );
  }
}

export default EventCalendar;
