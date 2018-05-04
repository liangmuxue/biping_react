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
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'enterGroup' },
    });
  }
  switchPayType(val) {
    const { params } = this.props;
    console.log('switchPayType in', params);
    const filter = { verbId: params.typeId, commoId: val.commid };
    this.props.dispatch({
      type: 'toOpen/payTypeChange',
      payload: val,
    });
  }
  toPayWechat() {
    const { params } = this.props;
    const { commId } = this.props.toOpen;
    console.log('toPayWechat in', params);
    const filter = { verbId: params.typeId, commoId: commId };
    this.props.dispatch({
      type: 'toOpen/toOpenPayDetail',
      payload: filter,
    });
  }

  render() {
    let isHide = true;
    console.log('toOpenDetail render', this.props);
    const {
      toOpenData, backPath, selectedItem,
    } = this.props.toOpen;
    // 如果没有数据，需要首先进行查询
    if (!toOpenData) {
      this.props.dispatch({
        type: 'toOpen/toOpenDetail',
        payload: { ...this.props.params },
      });
      return null;
    }
    if (selectedItem) {
      console.log('selectedItem', selectedItem);
      isHide = false;
    }
    const { data } = toOpenData;
    console.log('content in subdetail', data);

    const subDesc = `订阅${toOpenData.typeName}`;
    return (
      <div>
        <HeaderBar headerText={subDesc} backRouteLink={backPath} {...this.props} />
        <OpenCard openObj={this.props.systemUser} openClick={this.openClick.bind(this)} />
        {data.map(i => (
          <CheckboxItem key={i.count} onChange={() => this.switchPayType(i)} checked={i.checked}>
            {`${i.name + i.currentPrice / 100}元`}
          </CheckboxItem>
          ))}
        <div className={style.full} />
        <div className={isHide ? style.hide : style.payBottom}>
          <WingBlank className={style.pay}>
            <Button type="primary" className={style.toPay} onClick={this.toPayWechat.bind(this)}>确认支付</Button><WhiteSpace />
          </WingBlank>
          <div className={style.payMoney}>支付金额：<span className={style.sum}>{selectedItem}</span>元</div>
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
