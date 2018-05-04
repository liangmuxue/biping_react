import React, { Component } from 'react';
import { connect } from 'dva';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Result from 'antd-mobile/lib/result/index';
import Icon from 'antd-mobile/lib/icon/index';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/result/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

 const ResultExample = () => (
   <div className="result-example">
      <Result
      img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
    title="购买成功"
    message="你已购买「交易所公告」3个月礼包"

        />
          <WhiteSpace />
      </div>
);

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
      <div>
<ResultExample/>
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
