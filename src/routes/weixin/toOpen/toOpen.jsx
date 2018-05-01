import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Checkbox } from 'antd-mobile';
import OpenCard from '../../../pageComponents/weixin/toOpen/openCard.jsx';
import 'antd-mobile/es/checkbox/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import HeaderBar from '../../../components/headerBar';

/**
 * 订阅包
 * @author 赵永帅
 * @Date 2018-4-25
 */

const { CheckboxItem } = Checkbox;
// const WechatJSSDK = require('../../../models/client');

class toOpenDetail extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  openClick(type) {
    console.log('dddddddd', this);
  }
  switchPayType(val) {
    console.log('switchPayType in', val);
    this.props.dispatch({
      type: 'toOpen/payTypeChange',
      payload: val,
    });
  }
  render() {
    console.log('toOpenDetail render', this.props);
    const { toOpenData } = this.props.toOpen;
    const { typeId, typeName } = this.props.params;
    // 如果没有数据，需要首先进行查询
    if (!toOpenData) {
      this.props.dispatch({
        type: 'toOpen/toOpenDetail',
        payload: { typeId, typeName },
      });
      return null;
    }
    const { data } = toOpenData;
    const { dispatch } = this.props;
    console.log('content in subdetail', data);
    if (data.timeStamp) {
      const config = data;
      console.log('config111111', config);
      // WechatJSSDK.chooseWXPay(config);
    }
    const subDesc = `订阅${toOpenData.typeName}`;
    return (
      <div>
        <HeaderBar headerText={subDesc} backRouteLink="subList" {...this.props} />
        <OpenCard openObj={this.props.systemUser} openClick={this.openClick.bind(this)} />
        {data.map(i => (
          <CheckboxItem key={i.count} onChange={() => this.switchPayType(i)} checked={i.checked}>
            {`${i.name + i.count}元`}
          </CheckboxItem>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dd666666', state);
  return { toOpen: state.toOpen, systemUser: state.app.systemUser };
}

export default connect(mapStateToProps)(mobileRouteComponent(toOpenDetail));
