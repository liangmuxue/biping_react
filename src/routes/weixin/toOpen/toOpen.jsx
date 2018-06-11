import React from 'react';
import { connect } from 'dva';
// import Card from 'antd-mobile/lib/card/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
// import Result from 'antd-mobile/lib/result/index';
// import Icon from 'antd-mobile/lib/icon/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import Checkbox from 'antd-mobile/lib/checkbox/index';
import 'antd-mobile/es/checkbox/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import HeaderBar from '../../../components/headerBar';
import OpenCard from '../../../pageComponents/weixin/toOpen/openCard.jsx';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import style from './toOpen.less';
import BaseComponent from '../baseComponent';

/**
 * 订阅包
 * @author 赵永帅
 * @Date 2018-4-25
 */

const { CheckboxItem } = Checkbox;

class toOpenDetail extends BaseComponent {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  openClick(type) {
    console.log('dddddddd', this);
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'enterGroup', params: { footerHide: true } },
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
  toPayWechat(val) {
    const { params } = this.props;
    console.log('ddddddddddddddddddddd777777', val);
    let commId = null;
    let typeName = null;
    if (val) {
      commId = val.commId;
      typeName = val.typeName;
    } else {
      console.log('ddddddddddddddddddddd888888', this.props);
      commId = this.props.toOpen.commId;
      typeName = this.props.toOpen.typeName;
    }
    console.log('toPayWechat in', params);
    let verbId = params.typeId;
    // 直接打开模式，需要从另外的地方拿参数
    if (this.props.toOpen.actType === 'toOpenDetailDirect') {
      verbId = this.props.toOpen.params.typeId;
    }
    const filter = { verbId, commoId: commId, typeName };
    this.props.dispatch({
      type: 'toOpen/toOpenPayDetail',
      payload: filter,
    });
  }
  backButtonClick() {
    console.log('result to indexMessage');
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'indexMessage' },
    });
  }
  componentDidMount() {
    console.log('componentDidMount messageLisst', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'toOpen/toOpenDetail',
      payload: { ...this.props.params },
    });
  }
  render() {
    let isHide = true;
    console.log('toOpenDetail render', this.props);
    const {
      toOpenData, backPath, firstEnter,
    } = this.props.toOpen;
    let { selectedItem, params } = this.props.toOpen;
    const { paySuccess, typeName } = this.props.toOpen;
    const { systemUser } = this.props;
    // 如果是支付成功标志，则跳转到成功页面
    if (paySuccess) {
      return (
        <div className={style.successBox}>
          <div className={style.successPic}>
            <img src="/images/result/result.png" />
          </div>
          <div className={style.successful}>购买成功</div>
          <div className={style.successTip}>你已购买{typeName}</div>
          <div className={style.toIndex}>
            <WingBlank>
              <Button
                type="primary"
                onClick={this.backButtonClick.bind(this)}
                className={style.toIndex}
              >回首页
              </Button><WhiteSpace />
            </WingBlank>
          </div>
        </div>
      );
    }
    if (selectedItem) {
      console.log('selectedItem', selectedItem);
      isHide = false;
    }
    if (!toOpenData) {
      return null;
    }
    const { data } = toOpenData;
    let value = {};
    // 判断是不是初次进入此页面
    if (data && !firstEnter) {
      console.log('99999999', firstEnter);
      const { checked } = data[0];
      data[0].checked = true;
      value = { commId: data[0].commid, typeName: data[0].name };
      isHide = false;
      selectedItem = data[0].currentPrice / 100;
    }
    console.log('content in subdetail', data);
    let subDesc = `订阅${toOpenData.typeName}`;
    if (this.props.toOpen.actType === 'toOpenDetailDirect') {
      subDesc = `订阅${params.typeName}`;
    }
    return (
      <div>
        <HeaderBar headerText={subDesc} backRouteLink={backPath} {...this.props} />
        <OpenCard openObj={systemUser} openClick={this.openClick.bind(this)} />
        <div className={style.introduceTitle}>套餐介绍</div>
        {data.map(i => (
          <CheckboxItem key={i.count} onChange={() => this.switchPayType(i)} checked={i.checked} className={style.lastList}>
            {`${i.name + i.currentPrice / 100}元`}
          </CheckboxItem>
          ))}
        <div className={style.full} />
        <div className={isHide ? style.hide : style.payBottom}>
          <WingBlank className={style.pay}>
            <Button type="primary" className={style.toPay} onClick={() => this.toPayWechat(value)}>确认支付</Button><WhiteSpace />
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
