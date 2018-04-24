import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
import styles from './buyHistory.less';
import React from 'react';

/**
 * 订阅消息卡片
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
    return (
      <Hammer onTap={this.handleTap.bind(this)}>
        <div className={styles.historyBox}>
          <div className={styles.tops}>
            <div><img src="/images/buyHistoryImg/1.png" className={styles.leftlogo} /></div>
            <div className={styles.events}>购买：</div>
            <div><a href="#"><span className={styles.watch}>查看</span><img src="/images/buyHistoryImg/right_arrow.png" className={styles.right_arrow} /></a>
            </div>
          </div>

          <div className={styles.bottoms}>
            <Card full>
              <Card.Header title={<div className={styles.btm_title}>{msgObj.buyContent}</div>} />
              <Card.Body>
                <div className={styles.incident}>{msgObj.cost}</div>
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
