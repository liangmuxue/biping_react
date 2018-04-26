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

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class toOpenDetail extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  openClick(type) {
    console.log('dddddddd');
  }
  render() {
    console.log('toOpenDetail render', this.props.toOpen);
    if (!this.props.toOpen.data) {
      return null;
    }
    const { data } = this.props.toOpen;
    console.log('content in subdetail', data);
    return (
      <div>
        <OpenCard openObj={this.props.systemUser} openClick={this.openClick.bind(this)} />
        {data.map((i) => {
          return React.createElement(
            CheckboxItem,
            {
              key: i.count,
              onChange: function onChange() {
                console.log('i.count', i.count);
                // return this.onChange(i.count);
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
  // console.log('toooooo', { toOpen: state.toOpen, systemUser: state.app.systemUser });
  return { toOpen: state.toOpen, systemUser: state.app.systemUser };
}

export default connect(mapStateToProps)(mobileRouteComponent(toOpenDetail));
// export default mobileRouteComponent(AccountInfo);
