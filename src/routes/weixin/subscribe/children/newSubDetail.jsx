import React from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import BaseComponent from '../../baseComponent';
import HeaderBar from '../../../../components/headerBar';
import styles from './newSubDetail.less';

class NewSubDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('newSubDetail=>', this.props);
    const { params } = this.props;
    const { backPath } = params;
    const title = '币事件';
    return (
      <div>
        <HeaderBar headerText={title} backRouteLink={backPath} {...this.props} />
        <div className={styles.topCard}>
          <button>去开通</button>
          <span className={styles.num}>已经有500人订阅</span>
          <div className={styles.conText}>
            <img alt="" src="/images/coinList/coinBg.png" />
            <span>币事件</span>
          </div>
          <p className={styles.dsc}>我们会从社交媒体收录加密货币未来可能会发生的事件，来帮助投资者多个维度预测行情。</p>
        </div>
        <div className={styles.listCon}>
          <div className={styles.listTitle}>
            <p className={styles.left}>【事件类型】订阅设置</p>
            <span className={styles.right}>打开所有</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newSubDetails: state.newSubDetails,
  };
}

export default connect(mapStateToProps)(mobileRouteComponent(NewSubDetail));
