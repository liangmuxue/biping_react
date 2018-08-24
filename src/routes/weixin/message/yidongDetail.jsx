import React from 'react';
import { connect } from 'dva';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import HeaderBar from '../../../components/headerBar';
import styles from './yidongDetail.less';

class YidongDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      backPath: 'indexMessage',
    };
  }
  componentWillMount() {
    const { params } = this.props;
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'yidongDetail',
    });
    this.props.dispatch({
      type: 'yidongDetail/message',
      payload: { ...params },
    });
  }
  render() {
    const { messageData } = this.props;
    console.log('render=>', this.props, messageData);
    return (
      <div>
        <HeaderBar headerText="详情" backRouteLink={this.state.backPath} {...this.props} />
        <div className={styles.xiaoxiDetail}>
          <div className={styles.detailHheader}>【火币PRO】EOS/USDT 5分钟内涨幅：4.16% 2018-05-24 21：26</div>
          <div className={styles.typeTime}>2018-05-23 <em>异动指标</em></div>
          <ul className={styles.yidong}>
            <li>
              <span className={styles.leftC}>预警时间：</span>
              <span className={`${styles.rightC} ${styles.upColo}`}>12:35</span>
            </li>
            <li>
              <span className={styles.leftC}>异动类型：</span>
              <span className={styles.rightC}>MACD(一小时线)</span>
            </li>
            <li>
              <span className={styles.leftC}>信号建议：</span>
              <span className={styles.rightC}>看多</span>
            </li>
            <li>
              <span className={styles.leftC}>信号详情：</span>
              <span className={styles.rightC}>看多</span>
            </li>
            <li>
              <span className={styles.leftC}>交易所：</span>
              <span className={styles.rightC}>OKEX</span>
            </li>
            <li>
              <span className={styles.leftC}>交易对：</span>
              <span className={styles.rightC}>HT/USDT</span>
            </li>
            <li>
              <span className={styles.leftC}>当前价格：</span>
              <span className={styles.rightC}>
                577.87 USDT
                <br />
                （≈ 人民币3,735.86）
              </span>
            </li>
          </ul>
          <div className={styles.coinDes}>
            <div className={styles.titleText}>币种介绍</div>
            <div className={styles.bzCon}>
              <div className={styles.headText}>
                <img className={styles.mipImg} alt="" src="http://biping.oss-cn-beijing.aliyuncs.com/Static/images/coinlogo/bitcoin-cash.png?0.6589261686392847"  />
                <span>比特现金，Bitcoin Cash(BCC)（BCH）</span>
              </div>
              <div className={styles.textDes}>
                2017年7月21日，比特币分叉方案bip91已经获得全网算力支持，
                一致同意先进行隔离见证升级，并在之后的6个月内把底层区块链的区块大小升级至2m。
                然而“搅局者”出现了——挖矿巨头比特币大陆旗下的矿池viabtc准备了一套硬分叉的体系，
                基于比特币的原链推出“比特币现金”。2017年8月1日20时20分，比特币现金开始挖矿，
                这是比特币的新的分支还是另外一种“山寨币”，业内论调不一，
                但是此前bcc提前报价已经达到2000元，也就是已经超过比特币价格的十分之一。
                比特币现金修改了比特币的代码，支持大区块（将区块大小提升至8m），
                不包含segwit功能，是bitcoinabc方案产生的区块链资产。
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { messageData: state.messageData };
}

export default connect(mapStateToProps)(mobileRouteComponent(YidongDetail));
