import React from 'react';
import { connect } from 'dva';
import BaseComponent from '../../baseComponent';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './subscribeResult.less';


class SubscribeResult extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'result',
    });
  }
  goIndex() {
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'indexMessage' },
    });
  }
  goOn() {
    const { params } = this.props;
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'coinList', params: { verbId: params.verbId, exchangeId: params.exchangeId, tabName: params.tabName } },
    });
  }
  render() {
    return (
      <div className={styles.subscribeResult}>
        <img src="/images/result/result.png" alt="" />
        <p className={styles.p1}>订阅成功</p>
        <p className={styles.p2}>当出现异动时，我们会第一时间推送给你</p>
        <button onClick={() => this.goIndex()} className={styles.btn1}>返回首页</button>
        <button onClick={() => this.goOn()} className={styles.btn2}>继续添加</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscribeResult: state.subscribeResult,
  };
};

export default connect(mapStateToProps)(mobileRouteComponent(SubscribeResult));
