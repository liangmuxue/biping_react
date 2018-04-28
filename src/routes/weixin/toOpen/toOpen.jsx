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
      WechatJSSDK.chooseWXPay(config);
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
