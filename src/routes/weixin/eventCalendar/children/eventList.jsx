import React from 'react';
import { ListView } from 'antd-mobile';
import 'antd-mobile/es/list-view/style/index.css';
import styles from './eventList.less';

function ListCard(props) {
  return (
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
  );
}
class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    // console.log(this.props);
    /* this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'eventList',
    }); */
  }

  render() {
    const { typeList, listData } = this.props;
    console.log('eventList**=>', this.props, listData);
    if (!typeList || !typeList.data || !listData || !listData.data) {
      return null;
    }
    const typelistData = typeList.data;
    const conlistData = listData.data.pager;
    console.log('conlistData=>', conlistData);
    const height = document.documentElement.clientHeight;
    return (
      <div className={styles.eventList}>
        <div className={styles.tag}>
          <ul>
            <li className={styles.selected}>全部</li>
            {typelistData.map((msg, index) => (
              <li key={msg.id}>{msg.name}</li>
            ))}
          </ul>
          <div className={styles.rightBtn}>
            <img alt="分类" src="/images/calendar/type-right-Button.png" />
          </div>
        </div>
        <ListCard />
      </div>
    );
  }
}

export default EventList;
