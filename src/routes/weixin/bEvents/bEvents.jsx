import React, { Component } from 'react';
import { connect } from 'dva';
// import Card from 'antd-mobile/lib/card/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import List from 'antd-mobile/lib/list/index';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from './bEvents.less';
import mobileRouteComponent from '../../common/mobileRouteComponent';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

// 去注册按钮
const Register = () => (
  <WingBlank>
    <Button type="primary" className={styles.toRegister}>去开通</Button><WhiteSpace />
  </WingBlank>
);
const Renew = () => (
  <WingBlank>
    <Button className={styles.Renew}>剩81天&nbsp;| 续费</Button><WhiteSpace />
  </WingBlank>
);
const ComplexButton = () => (
  <List style={{ backgroundColor: 'white' }}>
    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}
      multipleLine
    >

    # 交易所公告
    </List.Item>

    <List.Item
      extra={<Button type="" size="small" inline className={style.readBtn}>已订阅</Button>}
      multipleLine
    >

      # 空投
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}
      multipleLine
    >

      # 代币销毁
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}
      multipleLine
    >

      # 硬分叉
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}
      multipleLine
    >

      # 升级通知
    </List.Item>

  </List>
);

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
      <div className={style.toptitle}>
    币事件
        <a href="#" ><img src="/images/messageListImg/left_arrow.png" className={style.leftArrow} /></a>
      </div>
      <div className={styles.whiteBox}>
        <Renew />
        <div className={styles.boxCenter}>
          <div className={styles.hadReady}>已经有1000人订阅：</div>
          <h1 className={styles.titles}>币事件</h1>
          <div className={styles.contents}>我们会从社交媒体收录加密货币未来可能会发生的事件，来帮助投资者多个维度预测行情。</div>
          <div className={styles.bottomBtn}><a href="#">查看所有事件类型<img src="/images/messageListImg/right_arrow.png" className={styles.arrowRight} /></a></div>
        </div>
      </div>
      <div className={style.listTitle}>【币事件】订阅管理</div>
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
