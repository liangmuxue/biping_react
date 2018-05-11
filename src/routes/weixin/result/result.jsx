import React, { Component } from 'react';
import { connect } from 'dva';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import Icon from 'antd-mobile/lib/icon/index';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/result/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import style from './result.less';
/**
 * 支付成功页面
 * @author 董超
 * @Date  2017-12-25
 */


function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
      <div className={style.successPic}>
        <img src="/images/result/result.png" />
      </div>
      <div className={style.successful}>购买成功</div>
      <div className={style.successTip}>你已购买「交易所公告」3个月礼包</div>
      <div className={style.toIndex}>
        <WingBlank>
          <Button type="primary" className={style.toButton} style={{ width: '6.9rem', height: '.88rem' }}>回首页</Button><WhiteSpace />
        </WingBlank>
      </div>
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
