import React from 'react';
import styles from './eventDetail.less';
import ReactHtmlParser from 'react-html-parser';

function Currency(props) {
  const { data } = props;
  let logoReal = `${data.logo}?${Math.random()}`;
  logoReal = logoReal.replace('https', 'http');
  console.log(`corImgSrc is:${corImgSrc}`);
  return (
    <div className={styles.currency}>
      <p className={styles.head}>币种介绍</p>
      <div className={styles.currencyDsc}>
        <div className={styles.tl}>
          <img alt="" src={logoReal} />
          <span className={styles.name}>{data.name}</span>
        </div>
        <div id="domText" className={styles.text}>
          {ReactHtmlParser(data.introduce)}
          <span className={styles.spanMore}>...<em>更多</em></span>
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
          {data.map(rowData => (
            <tr>
              <td>{rowData.name}</td>
              <td>{rowData.price}</td>
              {
                rowData.quote.indexOf('+') >= 0 ?
                  <td className={styles.up}>{rowData.quote}</td> :
                  <td className={styles.down}>{rowData.quote}</td>
              }
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
  componentDidMount() {
    // console.log('componentDidMountDom=>', document.getElementById('domText'));
    // const dom = document.getElementById('domText');
    // if (dom) {
    //   const height = 14 * 1.5 * 3;
    //   const domHeight = dom.clientHeight;
    //   if (domHeight > height) {
    //     dom.classList.add('showMore');
    //   }
    // }
  }
  /* clickMore() {
    const dom = document.getElementById('domText');
    dom.classList.remove('showMore');
  } */
  render() {
    console.log('eventDetail=>', this.props);
    const {
      coinInfo, coinPrice, msgDetailData, baseDetail,
    } = this.props;
    // 币种介绍
    if (!coinInfo || !coinInfo.data || !msgDetailData) {
      return null;
    }
    let coinInfodom = null;
    // 币价
    let calenDarDom = null;
    if (coinInfo.data) {
      const data = coinInfo.data;
      let logoReal = `${data.logo}?${Math.random()}`;
      logoReal = logoReal.replace('https', 'http');
      coinInfodom = (<div className={styles.currency}>
        <p className={styles.head}>币种介绍</p>
        <div className={styles.currencyDsc}>
          <div className={styles.tl}>
            <img alt="" src={logoReal} />
            <span className={styles.name}>{data.name}</span>
          </div>
          <div id="domText" className={styles.text}>
            {ReactHtmlParser(data.introduce)}
            {/* <span className="spanMore">...<em onClick={() => this.clickMore()}>更多</em></span> */}
          </div>
        </div>
      </div>);
    } else {
      coinInfodom = '';
    }

    if (msgDetailData.tagName == '币事件日历') {
      const baseDatailData = baseDetail.data;
      if (!baseDatailData || !coinPrice) {
        return null;
      }
      let upBtnStyle = null;
      let downBtnStyle = null;
      if (baseDatailData.lookStatus == 'true') {
        upBtnStyle = {
          width: `${baseDatailData.upIncrease}%`,
        };
        downBtnStyle = {
          width: `${baseDatailData.downIncrease}%`,
        };
      }
      calenDarDom =
        (<div>
          {coinPrice.data.length > 0 ? <Table data={coinPrice.data} /> : ''}
          <div className={styles.CurrencyPrice}>
            <p className={styles.title}>预测事件发生后的币价变化</p>
            <div onClick={() => this.forecast(true)} className={`${styles.btn} ${styles.upBtn}`}>
              <span style={upBtnStyle} />
              <img src="/images/calendar/good.png" alt="" />
              <em>利好</em>
            </div>
            <div onClick={() => this.forecast(false)} className={`${styles.btn} ${styles.downBtn}`}>
              <span style={downBtnStyle} />
              <img src="/images/calendar/bad.png" alt="" />
              <em>利空</em>
            </div>
          </div>
        </div>);
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
