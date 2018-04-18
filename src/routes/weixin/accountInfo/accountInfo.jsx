import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';

/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>老人账户信息</div>
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
