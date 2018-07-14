import React from 'react';
import styles from './subscribeResult.less';

class SubscribeResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.subscribeResult}>
        <img src="/images/result/result.png" alt="" />
        <p className={styles.p1}>订阅成功</p>
        <p className={styles.p2}>当出现异动时，我们会第一时间推送给你</p>
        <button className={styles.btn1}>返回首页</button>
        <button className={styles.btn2}>继续添加</button>
      </div>
    );
  }
}

export default SubscribeResult;
