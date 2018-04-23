import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
// import 'antd-mobile/es/card/style/index.css';
import React from 'react';
import styles from './messageCard.less';


/**
 * 订阅消息卡片
 * @date        2018-04-20
 * @author 梁慕学
 */

class MessageCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }


  render() {
    const { msgObj } = this.props;

    return (
      <div className={styles.mesList}>
        <WhiteSpace size="lg" />
        <Card full>
          <Card.Header title={<div className={styles.cardtitle}> {msgObj.title}</div>} />
          <Card.Body>
            <div className={styles.cardContent}>{msgObj.title}</div>
          </Card.Body>
          <Card.Footer
            content={
              <div className={styles.cardFooter}>
                <span className={styles.event}>#{msgObj.tagName}</span>
                <span className={styles.readNum}>{msgObj.readCnt}阅读</span>
                <span className={styles.times}>{msgObj.time}</span>
              </div>
              }
            extra={<div ><img alt="noicon" src="/images/messageListImg/close_btn.png"className={styles.closeBtn} /></div>}
          />
        </Card>
      </div>
    );
  }
}

export default MessageCard;
