import React, { Component } from 'react';
import { connect } from 'dva';
import 'antd-mobile/es/button/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';

/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

function genSubList({ dispatch, data }) {
  // const { customerName } = accountInfo;
  console.log('genSubList data', data);
  if (data) {
    return (
      <div>
        {data.map(item => <SubTypeCard key={item.typeId} typeObj={item} />)}
      </div>
    );
  }
  return null;
}

class subList extends Component {
  constructor(props) {
    console.log('props in subList', props);
    super(props);
  }
  render() {
    console.log('subList render');
    return genSubList(this.props);
  }
}

function mapStateToProps(state) {
  return state.subscribe;
}

export default connect(mapStateToProps)(mobileRouteComponent(subList));
// export default mobileRouteComponent(AccountInfo);
