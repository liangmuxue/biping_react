import React from 'react';
// import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
import styles from './myLike.less';


/**
 * 我关注的
 * @date        2018-06-13
 * @author 赵永帅
 */

class MyLikeCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in BuyCard', props);
    this.state = {
    };
  }

  handleTap(e) {
    console.log('handleTap in,props,event:', e);
    e.preventDefault();
    this.props.myLikeClick(this.props.msgObj);
  }

  render() {
    const { msgObj } = this.props;
    console.log('msgObj888888', msgObj);
    const costNum = msgObj.cost;
    const buyTypeCode = msgObj.buyTypeCode;
    let newLogo = null;
    let newContent = null;
    if (costNum !== 0 && msgObj.inviteNum !== 0) {
      newContent = <div className={styles.incident}>￥{msgObj.cost / 100}元,已邀请{msgObj.inviteNum}人</div>;
    } else if (costNum !== 0 && msgObj.inviteNum === 0) {
      newContent = <div className={styles.incident}>￥{msgObj.cost / 100}元</div>;
    } else if (costNum === 0 && msgObj.inviteNum !== 0) {
      newContent = <div className={styles.incident}>已邀请{msgObj.inviteNum}人</div>;
    }

    if (buyTypeCode === 0) {
      newLogo = <img src="/images/buyHistoryImg/2.png" className={styles.leftlogo} alt="" />;
    } else {
      newLogo = <img src="/images/buyHistoryImg/1.png" className={styles.leftlogo} alt="" />;
    }
    return (
      <Hammer onTap={this.handleTap.bind(this)}>
        <div className={styles.historyBox}>
          <div className={styles.tops}>
            <div>{newLogo}</div>
            <div className={styles.events}>比特币,BitCoin(BTC)</div>
          </div>

          <div className={styles.bottoms}>
            比特币的一大堆描述
          </div>
        </div>
      </Hammer>
    );
  }
}

export default MyLikeCard;
