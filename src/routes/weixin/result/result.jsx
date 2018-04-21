import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace, Result, Icon } from 'antd-mobile';
import { Button, WingBlank } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import styles from './result.less';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
 const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

 const ResultExample = () => (<div className="result-example">


function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
      <div>

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
