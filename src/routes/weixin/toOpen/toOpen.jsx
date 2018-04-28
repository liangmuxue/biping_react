import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace, Result, Icon, Button, WingBlank } from 'antd-mobile';
import { List, Checkbox, Flex } from 'antd-mobile';
import OpenCard from '../../../pageComponents/weixin/toOpen/openCard.jsx';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/checkbox/style/index.css';

import style from './toOpen.less';
import styles from '../myself/myself.less';

/**
 * 订阅包
 * @author 赵永帅
 * @Date 2018-4-25
 */

const { CheckboxItem } = Checkbox;
const { AgreeItem } = Checkbox;
const WechatJSSDK = require('../../../models/client');


const ButtonExample = () => (
  <WingBlank className={style.transfrom}>
    <Button type="primary" className={style.toGret}>去获取</Button><WhiteSpace />
  </WingBlank>
);

const ButtonPay = () => (
  <WingBlank className={style.pay}>
    <Button type="primary" className={style.toPay}>确认支付</Button><WhiteSpace />
  </WingBlank>
);


function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
      <div className={styles.mineBox}>
        <div><img src="/assets/myselfImg/mine_pic.png" className={styles.minePic} /></div>
        <div className={styles.mineName}>币评</div>
      </div>

      <div className={style.introduce}>
        <img src="/assets/toOpen/open_bg.png" className={style.openbg} />
        <div className={style.introduceTitle}>套餐介绍</div>
        <div className={style.slogan}>拉好友、<span className={style.colorFont}>免费</span>开通</div>
        <ButtonExample />
        <div className={style.matterBox}>每邀请1位好友关注「币评区块链」公众号、免费获得「币事件」服务<span className={style.redData}>30</span>天</div>
      </div>
      <Test />

      <div className={style.full} />
      <div className={style.payBottom}>
        <ButtonPay />
        <div className={style.payMoney}>支付金额：<span className={style.sum}>20</span>元</div>
      </div>
    </div>


  );
}

class toOpenDetail extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  openClick(type) {
    console.log('dddddddd', this);
  }
  render() {
    console.log('toOpenDetail render', this.props.toOpen);
    const { toOpenData } = this.props.toOpen;
    // 如果没有数据，需要首先进行查询
    if (!toOpenData) {
      this.props.dispatch({
        type: 'toOpen/toOpenDetail',
        payload: { typeId: this.props.params.typeId },
      });
      return null;
    }
    const { data, typeId } = toOpenData;
    const { dispatch } = this.props;
    console.log('content in subdetail', data);
    if (data.timeStamp) {
      const config = data;
      console.log('config111111', config);
      const wechatObj = new window.WechatJSSDK(config);
    }
    return (
      <div>
        <OpenCard openObj={this.props.systemUser} openClick={this.openClick.bind(this)} />
        {data.map((i) => {
          return React.createElement(
            CheckboxItem,
            {
              key: i.count,
              onChange: function onChange() {
                console.log('i.count');
                // 请订阅包信息
                dispatch({
                  type: 'toOpen/toOpenPayDetail',
                  payload: { verbId: typeId, commoId: i.commid },
                });
              },
            },
            i.name, i.count, '元',
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dd666666', state);
  return { toOpen: state.toOpen, systemUser: state.app.systemUser };
}

export default connect(mapStateToProps)(mobileRouteComponent(toOpenDetail));
