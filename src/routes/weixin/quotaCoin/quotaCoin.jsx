import React from 'react';
import { connect } from 'dva';
import NP from 'number-precision';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import styles from './quotaCoin.less';
import { convertDate } from '../../../utils/dateFormat';

class QuotaCoin extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'quotaCoin/hotList',
    });
  }
  // 诊币详情页
  toDetail(item) {
    const { data } = this.props.hotDetail;
    if (data.isVerb) {
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'quotaCoinDetail',
          params: {
            backPath: 'quotaCoin',
            exchangeId: item.exchangeId,
            symbolId: item.symbolId,
          },
        },
      });
    } else {
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'quotaCoinBlock',
          params: {
            backPath: 'quotaCoin',
          },
        },
      });
    }
  }
  // 搜索点击
  toSearch() {
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'quotaCoinSearch',
        params: {
          backPath: 'quotaCoin',
        },
      },
    });
  }
  render() {
    const { hotDetail } = this.props;
    if (!hotDetail || !hotDetail.data) {
      return null;
    }
    const { data } = hotDetail;
    return (
      <div>
        <div className={styles.banner}>
          <p className={styles.text}>
            <p>多维度技术指标、300余种热门货币、</p>
            <p>小时级别的交易信号</p>
          </p>
          <span className={styles.line}></span>
          <span className={styles.time}>更新于：{convertDate(data.time, 'MM-DD hh:ss')}</span>
        </div>
        <div className={styles.hotCoin}>
          <div className={styles.search}>
            <span onClick={() => this.toSearch()}>
              <input type="search" placeholder="输入币种简称" disabled />
            </span>
          </div>
          <div className={styles.hotTitle}>
            <i className={styles.hotIcon}></i>
            热门币种
          </div>
          <ul className={styles.hotList}>
            {
              data.list instanceof Array ? (
                data.list.map(item => (
                  <li key={item.symbolId} onClick={() => this.toDetail(item)}>
                    <img className={styles.headImg} alt="" src={item.symbolLogo} />
                    <div className={styles.rightCon}>
                      <p className={styles.p1}>{item.name}</p>
                      <p className={`${styles.p2} ${item.range < 0 ? styles.down : styles.up}`}>
                        {item.range < 0 ? `- ${NP.times(Math.abs(item.range), 100)}%` : `+ ${NP.times(Math.abs(item.range), 100)}%`} (24H)
                      </p>
                    </div>
                    <button className={`${styles.rightBtn} ${item.result < 0 ? styles.sellBtn : (item.result === 0 ? styles.neutralBtn : styles.buyBtn)}`}>
                      {item.result < 0 ? '建议卖出' : (item.result === 0 ? '保持中立' : '建议买入') }
                    </button>
                  </li>
                ))
              ) : null
            }
          </ul>
        </div>
        <div className={styles.bottomtext}>
          免责说明：本功能中的内容仅供参考，建议投资者根据自身投资风格进行筛选，并合理控制风险。
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.quotaCoin;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoin));

