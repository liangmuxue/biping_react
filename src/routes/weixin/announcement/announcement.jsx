import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank,List } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from './announcement.less';
import styles from '../indexControl/indexControl.less';
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
);
const ComplexButton = () => (
  <List style={{  backgroundColor: 'white' }}>
    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # 火币PRO
    </List.Item>

    <List.Item
      extra={<Button type="" size="small" inline className={style.readBtn}>已订阅</Button>}multipleLine>

      # 币安
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # OKEx
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # Bitfinex
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # CEN
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # BitMEX
    </List.Item>
  </List>
);

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
    <div className={style.toptitle}>
    交易所公告
    <a href="#" ><img src="/images/messageListImg/left_arrow.png" className={style.leftArrow}/></a>
    </div>
      <div className={styles.whiteBox}>
      <Renew /  >
        <div className={styles.boxCenter}>
            <div className={styles.hadReady}>已经有1000人订阅：</div>
            <h1 className={styles.titles}>币事件</h1>
            <div className={styles.contents}>我们会从社交媒体收录加密货币未来可能会发生的事件，来帮助投资者多个维度预测行情。</div>
            <div className={styles.bottomBtn}><a href="#">查看所有事件类型<img src="/images/messageListImg/right_arrow.png" className={styles.arrowRight}/></a></div>
        </div>
      </div>
      <div className={style.listTitle}>【交易所公告】订阅管理</div>
        <ComplexButton />
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
