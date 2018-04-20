import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import styles from './indexControl.less';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

 // 去注册按钮
 const Register = () => (
   <WingBlank>
   <Button type="primary"  className={styles.toRegister}>去开通</Button><WhiteSpace />
   </WingBlank>
)
const Renew = () => (
  <WingBlank>
  <Button className={styles.Renew}>剩81天&nbsp;| 续费</Button><WhiteSpace />
  </WingBlank>
)
function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
      <div className={styles.whiteBox}>
      <Register/>
        <div className={styles.boxCenter}>
            <div className={styles.hadReady}>已经有1000人订阅：</div>
            <h1 className={styles.titles}>交易所公告</h1>
            <div className={styles.contents}>智能抓取「币安、火币、Bitfinex…」等50余家主流交易所最新公告。</div>
            <div className={styles.bottomBtn}><a href="#">查看所有渠道<img src="/assets/messageListImg/right_arrow.png" className={styles.arrowRight}/></a></div>
        </div>
      </div>

      <div className={styles.whiteBox}>
      <Renew /  >
        <div className={styles.boxCenter}>
            <div className={styles.hadReady}>已经有1000人订阅：</div>
            <h1 className={styles.titles}>币事件</h1>
            <div className={styles.contents}>我们会从社交媒体收录加密货币未来可能会发生的事件，来帮助投资者多个维度预测行情。</div>
            <div className={styles.bottomBtn}><a href="#">查看所有事件类型<img src="/assets/messageListImg/right_arrow.png" className={styles.arrowRight}/></a></div>
        </div>
      </div>

      <div className={styles.whiteBox}>
      <Renew /  >
        <div className={styles.boxCenter}>
            <div className={styles.hadReady}>已经有500人订阅：</div>
            <h1 className={styles.titles}>异动币</h1>
            <div className={styles.contents}>异动币指的是一定时间内，涨幅超过一定幅度，净收入超过净流出，类似异动股。</div>
            <div className={styles.bottomBtn}><a href="#">查看所有交易对<img src="/assets/messageListImg/right_arrow.png" className={styles.arrowRight}/></a></div>
        </div>
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
