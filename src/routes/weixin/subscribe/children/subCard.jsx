import React from 'react';
import styles from './subCard.less';

class SubCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goDetail(item) {
    this.props.itemClick(item);
  }

  render() {
    const { item } = this.props;
    let imgSrc = '';
    switch (item.typeName) {
      case '暴涨暴跌':
        imgSrc = '/images/coinList/coin3.png';
        break;
      case '大单买卖':
        imgSrc = '/images/coinList/coin4.png';
        break;
      case '异动币':
        imgSrc = '/images/coinList/coin3.png';
        break;
      case '交易所公告':
        imgSrc = '/images/coinList/coin2.png';
        break;
      case '币事件':
        imgSrc = '/images/coinList/coin1.png';
        break;
      default:
        imgSrc = '/images/coinList/coin1.png';
    }
    return (
      <div onClick={() => this.goDetail(item)} onKeyUp={() => {}} className={styles.subCard}>
        <div className={styles.leftCon}>
          <img alt="" src={imgSrc} />
        </div>
        <div className={styles.rightCon}>
          <div className={styles.msg}>
            <span className={styles.name}>{item.typeName}</span>
            <span className={styles.date}>{item.remainDate < 0 ? '未开通' : `剩 ${item.remainDate} 天`}</span>
            <button>管理订阅</button>
          </div>
          <div className={styles.detail}>
            {item.tagDesc}
          </div>
        </div>
      </div>
    );
  }
}

export default SubCard;
