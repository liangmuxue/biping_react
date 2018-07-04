import React from 'react';
import styles from './eventDetail.less';

function Currency(props) {
  const { data } = props;
  return (
    <div className={styles.currency}>
      <p className={styles.head}>币种介绍</p>
      <div className={styles.currencyDsc}>
        <div className={styles.tl}>
          <img alt="" src={data.logo} />
          <span className={styles.name}>{data.name}</span>
        </div>
        <div className={styles.text}>
          {data.introduce}
        </div>
      </div>
    </div>
  );
}
function Table(props) {
  const { data } = props;
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
          {data.map((rowData) => (
            <tr>
              <td>{rowData.name}</td>
              <td>{rowData.price}</td>
              <td>{rowData.quote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
class EventDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  forecast(boo) {
    this.props.forecast(boo);
  }
  render() {
    console.log('eventDetail=>', this.props);
    const { coinInfo, coinPrice, msgDetailData, baseDetail } = this.props;
    // 币种介绍
    var coinInfodom = null;
    // 币价
    var calenDarDom = null;
    if (coinInfo.data) {
      coinInfodom = <Currency data={coinInfo.data} />;
    } else {
      coinInfodom = '';
    }
    const baseDatailData = baseDetail.data;
    var upBtnStyle = null;
    var downBtnStyle = null;
    if (baseDatailData.lookStatus == 'true') {
      upBtnStyle = {
        'width': baseDatailData.upIncrease + '%',
      }
      downBtnStyle = {
        'width': baseDatailData.downIncrease + '%',
      }
    }

    if (msgDetailData.tagName == '币事件日历') {
      calenDarDom =
      <div>
        <Table data={coinPrice.data} />
        <div className={styles.CurrencyPrice}>
          <p className={styles.title}>预测事件发生后的币价变化</p>
          <div onClick={() => this.forecast(true)} className={`${styles.btn} ${styles.upBtn}`}>
            <span style={upBtnStyle}></span>
            <img src="/images/calendar/good.png" alt="" />
            <em>利好</em>
          </div>
          <div onClick={() => this.forecast(false)} className={`${styles.btn} ${styles.downBtn}`}>
            <span style={downBtnStyle}></span>
            <img src="/images/calendar/bad.png" alt="" />
            <em>利空</em>
          </div>
        </div>
      </div>;
    } else {
      calenDarDom = '';
    }
    return (
      <div className={styles.eventDetail}>
        {coinInfodom}
        {calenDarDom}
      </div>
    );
  }
}

export default EventDetail;
