import React from 'react';
// import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
import styles from './buyHistory.less';


/**
 * 购买记录卡片
 * @date        2018-04-20
 * @author 梁慕学
 */

class BuyCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in BuyCard', props);
    this.state = {
    };
  }

  handleTap(e) {
    console.log('handleTap in,props:', this.props);
    this.props.cardClick(this.props.msgObj);
  }

  render() {
    const { msgObj } = this.props;
    console.log('msgObj888888', msgObj);
    const costNum = msgObj.cost;
    let newContent = null;
    if (costNum !== 0 && msgObj.inviteNum !== 0) {
      newContent = <div className={styles.incident}>￥{msgObj.cost / 100}元,已邀请{msgObj.inviteNum}人</div>;
    } else if (costNum !== 0 && msgObj.inviteNum === 0) {
      newContent = <div className={styles.incident}>￥{msgObj.cost / 100}元</div>;
    } else if (costNum === 0 && msgObj.inviteNum !== 0) {
      newContent = <div className={styles.incident}>已邀请{msgObj.inviteNum}人</div>;
    }
    return (
      <Hammer onTap={this.handleTap.bind(this)}>
        <div className={styles.historyBox}>
          <div className={styles.tops}>
            <div><img src="/images/buyHistoryImg/1.png" className={styles.leftlogo} /></div>
            <div className={styles.events}>{msgObj.buyType}</div>
            <div><a href="#" ><span className={styles.watch}>查看</span><img src="/images/buyHistoryImg/right_arrow.png" className={styles.right_arrow} /></a>
            </div>
          </div>

          <div className={styles.bottoms}>
            <Card full>
              <Card.Header title={<div className={styles.btm_title}>{msgObj.buyContent}{msgObj.validityTime}</div>} />
              <Card.Body>
                {newContent}
              </Card.Body>
              <Card.Footer content={<div className={styles.datas}>{msgObj.validity}</div>} />
            </Card>
          </div>
        </div>
      </Hammer>
    );
  }
}

export default BuyCard;
