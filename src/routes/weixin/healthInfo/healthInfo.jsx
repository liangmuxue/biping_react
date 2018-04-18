import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import pureRender from 'pure-render-decorator';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import PieReact from '../../../components/pieReact';
/**
 * 老人体检数据页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
function genDynamics({ dispatch, healthInfo }) {
  // const { customerName } = healthInfo;

  return (
    <div><PieReact /></div>
  );
}

class HealthInfo extends Component {
  constructor(props) {
    console.log('props in HealthInfo', props);
    super(props);
  }
  render() {
    console.log('render in HealthInfo');
    return genDynamics(this.props);
  }
}

function mapStateToProps({ state }) {
  return { state };
}

export default connect(mapStateToProps)(mobileRouteComponent(HealthInfo));
// export default withRouter(HealthInfo);
