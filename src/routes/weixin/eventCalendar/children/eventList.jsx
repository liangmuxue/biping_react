import React from 'react';
// import { ListView } from 'antd-mobile';
import 'antd-mobile/es/list-view/style/index.css';
import styles from './eventList.less';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    console.log(this.props);
    /* this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'eventList',
    }); */
  }

  render() {
    return (
      <div className={styles.eventList}>
        <div className={styles.tag}>
          <ul>
            <li>全部</li>
            <li>交易所公告</li>
            <li>空投</li>
            <li>代币销毁</li>
            <li>硬分叉</li>
            <li>硬分叉</li>
            <li>硬分叉</li>
            <li>硬分叉</li>
          </ul>
          <div className={styles.rightBtn}>
            <img alt="分类" src="/images/calendar/type-right-Button.png" />
          </div>
        </div>
        {/* <ListView /> */}
        <div className={styles.listItem}>
          <div className={styles.leftCon}>
            <div className={styles.dsc}>
              <img alt="币种" src="https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png" />
              <span className={styles.name}>ZIL</span>
              <span className={styles.time}>2天前发布</span>
            </div>
            <p className={styles.title}>Kryptono平台上线ZIL</p>
            <p className={styles.detail}>
            事件发布时单价 ￥0.67，1天后单价
            ￥0.85，涨幅<em className={styles.up}>+26.86%</em>
            </p>
          </div>
          <button className={styles.rightBtn}>提醒</button>
          <div className={styles.rightTop}>
            交易所公告
          </div>
        </div>
      </div>
    );
  }
}

export default EventList;
