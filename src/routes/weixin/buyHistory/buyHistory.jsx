import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from '../announcement/announcement.less'
import styles from './buyHistory.less';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
 const Buttongo = () => (
   <WingBlank>
      <Button type="primary">去看看</Button><WhiteSpace />
  </WingBlank>
)

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
    <div className={style.toptitle}>
    购买记录
    <a href="#" ><img src="/assets/messageListImg/left_arrow.png" className={style.leftArrow}/></a>
    </div>

    <div className={styles.historyBox}>
        <div className={styles.tops}>
          <div><img src="/assets/buyHistoryImg/1.png" className={styles.leftlogo}/></div>
          <div className={styles.events}>购买：</div>
          <div><a href="#"><span className={styles.watch}>查看</span><img src="/assets/buyHistoryImg/right_arrow.png" className={styles.right_arrow}/></a>
        </div>
        </div>

        <div className={styles.bottoms}>
            <div className={styles.btm_title}>【币事件】项目3个月</div>
            <div className={styles.incident}>¥60</div>
            <div className={styles.datas}>2018.4.16-2018.7.16</div>
        </div>
    </div>

    <div className={styles.historyBox}>
        <div className={styles.tops}>
          <div><img src="/assets/buyHistoryImg/2.png" className={styles.leftlogo}/></div>
          <div className={styles.events}>分享有礼：</div>
          <div><a href="#"><span className={styles.watch}>查看</span><img src="/assets/buyHistoryImg/right_arrow.png" className={styles.right_arrow}/></a>
        </div>
        </div>

        <div className={styles.bottoms}>
            <div className={styles.btm_title}>【交易所公告】项目5个月</div>
            <div className={styles.incident}>已邀请5个好友</div>
            <div className={styles.datas}>2018.4.16-2018.7.16</div>
        </div>
    </div>

    <div className={styles.historyBox}>
        <div className={styles.tops}>
          <div><img src="/assets/buyHistoryImg/1.png" className={styles.leftlogo}/></div>
          <div className={styles.events}>购买：</div>
          <div><a href="#"><span className={styles.watch}>查看</span><img src="/assets/buyHistoryImg/right_arrow.png" className={styles.right_arrow}/></a>
        </div>
        </div>

        <div className={styles.bottoms}>
            <div className={styles.btm_title}>【币事件】项目12个月</div>
            <div className={styles.incident}>¥60 | 已邀请5个好友</div>
            <div className={styles.datas}>2018.4.16-2018.7.16</div>
        </div>
    </div>

    <div className={styles.bottomtip}>没有的更多啦</div>


    <div className={styles.empty}>
        <div><img src="/assets/buyHistoryImg/3.png"  className={styles.buycar}/></div>
        <div className={styles.notread}>您还没有买过任何订阅包</div>
        <Buttongo />
    </div>
    </div>


  );
}

class AccountInfo extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  render() {
    console.log('AccountInfo render');
    return genDynamics(this.props);
  }
}

function mapStateToProps({ state }) {
  return { state };
}

export default connect(mapStateToProps)(mobileRouteComponent(AccountInfo));
// export default mobileRouteComponent(AccountInfo);
