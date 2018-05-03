import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace, Result, Icon, Button, WingBlank } from 'antd-mobile';
import { Checkbox } from 'antd-mobile';
import OpenCard from '../../../pageComponents/weixin/toOpen/openCard.jsx';
import 'antd-mobile/es/checkbox/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import HeaderBar from '../../../components/headerBar';
import style from './toOpen.less';

/**
 * 订阅包
 * @author 赵永帅
 * @Date 2018-4-25
 */

const { CheckboxItem } = Checkbox;
const { AgreeItem } = Checkbox;
const WechatJSSDK = require('weixin-js-sdk');

class toOpenDetail extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  openClick(type) {
    console.log('dddddddd', this);
  }
  switchPayType(val) {
    const { params } = this.props;
    console.log('switchPayType in', params);
    const filter = { verbId: params.typeId, commoId: val.commid };
    this.props.dispatch({
      type: 'toOpen/payTypeChange',
      payload: val,
    });
    this.props.dispatch({
      type: 'toOpen/toOpenPayDetail',
      payload: filter,
    });
  }
  render() {
    console.log('toOpenDetail render', this.props);
    const { toOpenData, backPath } = this.props.toOpen;
    // 如果没有数据，需要首先进行查询
    if (!toOpenData) {
      this.props.dispatch({
        type: 'toOpen/toOpenDetail',
        payload: { ...this.props.params },
      });
      return null;
    }
    const { data } = toOpenData;
    const { dispatch } = this.props;
    console.log('content in subdetail', data);
    const dataReturn = this.props.toOpen.data;
    if (dataReturn && dataReturn.timeStamp) {
      const config = dataReturn;
      console.log('config111111', config);
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          alert('wechat');
          // document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          alert('nowechat');
          // document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          // document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        alert('yeswechat');
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            config,
          },
          (res) => {
            alert(res.err_msg);
            // if (res.err_msg == 'get_brand_wcpay_request:ok') {} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          },
        );
      }
      // WechatJSSDK.chooseWXPay();
    }
    const subDesc = `订阅${toOpenData.typeName}`;
    return (
      <div>
        <HeaderBar headerText={subDesc} backRouteLink={backPath} {...this.props} />
        <OpenCard openObj={this.props.systemUser} openClick={this.openClick.bind(this)} />
        {data.map(i => (
          <CheckboxItem key={i.count} onChange={() => this.switchPayType(i)} checked={i.checked}>
            {`${i.name + i.count}元`}
          </CheckboxItem>
          ))}
        <div className={style.full} />
        <div className={style.payBottom}>
          <WingBlank className={style.pay}>
            <Button type="primary" className={style.toPay}>确认支付</Button><WhiteSpace />
          </WingBlank>
          <div className={style.payMoney}>支付金额：<span className={style.sum}>20</span>元</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dd666666', state);
  return { toOpen: state.toOpen, systemUser: state.app.systemUser };
}

export default connect(mapStateToProps)(mobileRouteComponent(toOpenDetail));
