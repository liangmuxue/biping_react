import React from 'react';
import styles from './eventDetail.less';

function Currency(props) {
  return (
    <div className={styles.currency}>
      <p className={styles.head}>币种介绍</p>
      <div className={styles.currencyDsc}>
        <div className={styles.tl}>
          <img alt="" src="/images/calendar/icon.png" />
          <span className={styles.name}>波场,TRON(TRX)</span>
        </div>
        <div className={styles.text}>
          在多种区块链项目中，波场tron作为是全球首家将分布式计算、社交金融，共享经济引入数字娱乐领域的科技金融公司备受资本瞩目。波场ron是基于区块链的…
        </div>
      </div>
    </div>
  );
}
function Table(props) {
  return (
    <div className={styles.effettable}>
      <p className={styles.title}>事件影响</p>
      <table>
        <thead>
          <tr>
            <th>时间点</th>
            <th>币价</th>
            <th>涨跌幅</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>事件发布</td>
            <td>¥0.472</td>
            <td>-</td>
          </tr>
          <tr>
            <td>一小时后</td>
            <td>¥0.472</td>
            <td>-</td>
          </tr>
          <tr>
            <td>一天后</td>
            <td>¥0.472</td>
            <td>-</td>
          </tr>
          <tr>
            <td>5天后</td>
            <td>¥0.472</td>
            <td>-</td>
          </tr>
          <tr>
            <td>事件开始</td>
            <td>¥0.472</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function CurrencyPrice(props) {
  return (
    <div className={styles.CurrencyPrice}>
      <p className={styles.title}>预测事件发生后的币价变化</p>
      <div className={`${styles.btn} ${styles.upBtn}`}>
        <span></span>
        <img src="/images/calendar/good.png" alt="" />
        <em>利好</em>
      </div>
      <div className={`${styles.btn} ${styles.downBtn}`}>
        <span></span>
        <img src="/images/calendar/bad.png" alt="" />
        <em>利空</em>
      </div>
    </div>
  );
}
class EventDetail extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    return (
      <div className={styles.eventDetail}>
        <Currency />
        <Table />
        <CurrencyPrice />
      </div>
    );
  }
}

export default EventDetail;
