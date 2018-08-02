import React from 'react';
import { connect } from 'dva';
import BaseComponent from '../../baseComponent';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './quotaCoinBlock.less';

class QuotaCoinBlock extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'quotaCoin',
    });
  }
  render() {
    return (
      <div className={styles.centerBlock}>
        <div className={styles.banner}>
          <img alt="" src="/images/quotaCoin/one.png" />
        </div>
        <div className={styles.one}>
          <img alt="" src="/images/quotaCoin/two.jpg" />
        </div>
        <div className={styles.text1}>
          <div className={styles.header}>
            <div className={styles.line}>{}</div>
            <span>币评团队</span>
          </div>
          <div className={styles.textCon}>
            团队成员来自腾讯、阿里及知名区块链公司，拥有互联网、金融、数学等专业背景。在区块链领域鱼龙混杂的当下，币评致力于打造最好用的币圈投资工具，为投资者提供最有价值的建议。
          </div>
          <div className={styles.userInfo}>
            <img alt="" src="/images/quotaCoin/three.png" />
            <div className={styles.infoCenter}>
              <span className={styles.span1}>币评（No:62831）</span>
              <span className={styles.span2}>还需邀请5人才有参与资格</span>
            </div>
            <button className={styles.infoBtn}>邀请好友</button>
          </div>
          <div className={styles.userPrice}>
            <div className={styles.left}>
              <span className={styles.triangle}>{}</span>
              <span>活动原价</span>
              <span className={styles.spanNum}>￥39.00</span>
            </div>
            <div className={styles.center}>
              <span>需邀请人数</span>
              <span className={styles.spanNum}>5</span>
            </div>
            <div className={styles.right}>
              <span>已邀请</span>
              <span className={styles.spanNum}>0</span>
            </div>
          </div>
        </div>
        <div className={styles.text2}>
          <div className={styles.header}>
            <div className={styles.line}>{}</div>
            <span>参与规则</span>
          </div>
          <p className={styles.p1}>
          免费方式：点击右下角“邀请好友”按钮，分享到朋友圈或发送给好友，成功邀请5个好友关注【币评区块链】公众号，即可获得AI诊币内测服务，本次免费内测仅开放500个名额，先到先得。
          </p>
          <p className={styles.p2}>付费方式：AI诊币服务￥99元，本次开放300个名额。缴费成功后，系统即为您自动开通。</p>
          <p className={styles.p3}>
            进入限时购买通道
            <img alt="" src="/images/quotaCoin/four.png" />
          </p>
        </div>
        <div className={styles.footerBtn}>
          <div className={styles.leftBtn}>参与规则</div>
          <div className={styles.rightBtn}>邀请好友</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.quotaCoinBlock;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoinBlock));
