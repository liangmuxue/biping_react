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
import BaseComponent from '../baseComponent';
/**
 * 支付成功页面
 * @author 董超
 * @Date  2017-12-25
 */


class AccountInfo extends BaseComponent {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  buttonClick() {
    console.log('result to indexMessage');
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'indexMessage' },
    });
  }
  componentWillMount() {
    console.log('componentWillMount in result:', this.props);
    // 由于不请求，所以不走didupdate，所以统一从这里消除加载提示
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'result',
    });
  }
  render() {
    console.log('result payDetailSuccess', this.props);
    const { params } = this.props;
    const { typeName } = params;
    console.log('result111111 payDetailSuccess', typeName);
    return (
      <div>
        <div className={style.successPic}>
          <img src="/images/result/result.png" />
        </div>
        <div className={style.successful}>购买成功</div>
        <div className={style.successTip}>你已购买{typeName}</div>
        <div className={style.toIndex}>
          <WingBlank>
            <Button type="primary" onClick={this.buttonClick.bind(this)} className={style.toButton} style={{ width: '6.9rem', height: '.88rem' }}>回首页</Button><WhiteSpace />
          </WingBlank>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(mobileRouteComponent(AccountInfo));
// export default mobileRouteComponent(AccountInfo);
