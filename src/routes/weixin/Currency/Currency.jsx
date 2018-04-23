import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank,List } from 'antd-mobile';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from '../bEvents/bEvents.less';
import styles from '../indexControl/indexControl.less';
import 'antd-mobile/es/tabs/style/index.css';

/**
 * 异动币 订阅管理 页面
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
  <List style={{  backgroundColor: 'white'}}>
    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # BCH/BTC
    </List.Item>

    <List.Item
      extra={<Button type="" size="small" inline className={style.readBtn}>已订阅</Button>}multipleLine>

      # ETH/BTC
    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>
      # LTC/BTC

    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # ETC/BTC

    </List.Item>

    <List.Item
      extra={<Button type="primary" size="small" inline className={style.unreadBtn}>订阅</Button>}multipleLine>

      # E0S/BTC

    </List.Item>

  </List>
);

function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...styles, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '自选' },
  { title: 'USDT' },
  { title: 'BTC' },
  { title: 'ETH' },
];

const TabExample = () => (
  <div>
    <WhiteSpace />
    <StickyContainer>
      <Tabs tabs={tabs}
        initalPage={'t2'}
        renderTabBar={renderTabBar}
      >
        <div style={{  alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        <ComplexButton />
        </div>
        <div style={{  alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            <ComplexButton />
        </div>
        <div style={{  alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
          <ComplexButton />
        </div>
        <div style={{  alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            <ComplexButton />
        </div>

        <div style={{  alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            <ComplexButton />
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
    <div className={style.toptitle}>
    异动币
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
      <div className={style.listTitle}>【异动币】订阅管理</div>
      <TabExample />

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
