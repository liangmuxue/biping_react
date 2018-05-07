import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
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
  // 卡片点击
  handleTap() {
    console.log('handleTap in,props:', this.props);
    this.props.cardClick(this.props.msgObj);
  }
  // 点击标签，进行筛选
  handleTagTap(e) {
    console.log('handleTagTap in,props:', this.props);
    e.preventDefault();
    this.props.tagClick(this.props.msgObj);
  }

  render() {
    const { msgObj } = this.props;

    return (

                <div className={styles.mesList} >
                  <WhiteSpace size="lg" />
                  <Card full>
                    <Hammer onTap={this.handleTap.bind(this)}>
                      <div>
                        <Card.Header title={<div className={styles.cardtitle}> {msgObj.title}</div>} />
                        <Card.Body>
                          <div className={styles.cardContent}>{msgObj.content}</div>
                        </Card.Body>
                      </div>
                    </Hammer>
                    <Card.Footer
                      content={
                        <div className={styles.cardFooter}>
                          <Hammer onTap={this.handleTagTap.bind(this)}>
                            <span className={styles.event}>#{msgObj.tagName}</span>
                          </Hammer>
                          <span className={styles.readNum}>{msgObj.readCnt}阅读</span>
                          <span className={styles.times}>{msgObj.time}</span>
                        </div>
                        }
                      extra
                    />
                  </Card>
                </div>


    );
  }
}

export default MessageCard;
