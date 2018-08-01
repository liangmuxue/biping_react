import React from 'react';
import styles from './bipingEwm.less';

class BipingEwm extends React.Component {
  render() {
    return (
      <div className={styles.layerCon}>
        <div className={styles.content}>
          <img className={styles.headerImg} alt="" src="/images/quotaCoin/layerheader.jpg" />
          <div className={styles.headerCon}>
            <span className={styles.headerText}>去【币评VIP福利群】问老师</span>
          </div>
          <span className={styles.text1}>扫描下方二维码，免费获得</span>
          <span className={styles.text1}>每日点评币市早晚报</span>
          <img className={styles.ewmImg} alt="" src="/images/quotaCoin/ewm.jpg" />
          <span className={styles.text2}>长按扫描二维码关注</span>
        </div>
      </div>
    );
  }
}

export default BipingEwm;
