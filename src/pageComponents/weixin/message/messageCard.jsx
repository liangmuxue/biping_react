// import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
// import 'antd-mobile/es/card/style/index.css';
import React from 'react';
import styles from './messageCard.less';
import moment from 'moment';

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
  handleTagTap(e) {
  // 点击标签，进行筛选
    console.log('handleTagTap in,props:', this.props);
    e.preventDefault();
    this.props.tagClick(this.props.msgObj);
  }


  render() {
    const { msgObj } = this.props;
    let title = msgObj.title;
    if (msgObj.tagName === '异动币') {
      // 异动币需要加工标题，加入时间
      title = `${title},${msgObj.createTime}`;
    }
    return (
      <div className={styles.mesList} >
        <Card full>
          <Hammer onTap={this.handleTap.bind(this)}>
            <div>
              <Card.Header title={
                <div className={styles.cardtitle}>
                  <div className={styles.listLogo}> <img src={msgObj.img} /> </div>
                  <div className={styles.logoNameBox}>
                    <div className={styles.logoName}>{msgObj.name}</div>
                    <div className={styles.logoFrom}>来自订阅：{msgObj.tagName} · {msgObj.time}</div>
                    <div className={styles.clear} />
                  </div>
                </div>}
              />
              <Card.Body>
                <div className={styles.cardtitles}> {title}</div>
                <span className={msgObj.tagName === '币事件' ? styles.eventStrat : styles.hide}>事件开始日期：{msgObj.startTime}</span>
              </Card.Body>

            </div>
          </Hammer>
        </Card>
      </div>


    );
  }
}

export default MessageCard;
