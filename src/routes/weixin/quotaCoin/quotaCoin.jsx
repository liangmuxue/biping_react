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
    this.state = {
      dTime: 0,
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoin',
        obj: {
          '进入': '进入诊币',
        },
        siv: 0,
      },
    });
    this.getHostList();
  }
  componentWillUnmount() {
    clearInterval(this.state.siv);
  }
  getHostList() {
    const that = this;
    this.props.dispatch({
      type: 'quotaCoin/hotList',
      onComplete(data) {
        const { time } = data.response.data;
        const date = (time.minute * 60) + time.second;
        that.setState({
          dTime: date,
        });
        that.state.siv = setInterval(() => {
          that.setState({
            dTime: that.state.dTime - 1,
          }, () => {
            if (that.state.dTime === 0) {
              clearInterval(that.state.siv);
              that.getHostList();
            }
          });
        }, 1000);
      },
    });
  }
  // 诊币详情页
  toDetail(item) {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoinDetailClick',
        obj: {
          '名称': item.name,
        },
      },
    });
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
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoinSearch',
      },
    });
    const { data } = this.props.hotDetail;
    if (data.isVerb) {
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'quotaCoinSearch',
          params: {
            backPath: 'quotaCoin',
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
  render() {
    const { hotDetail } = this.props;
    if (!hotDetail || !hotDetail.data) {
      return null;
    }
    const { data } = hotDetail;
    return (
      <div>
        <div className={styles.banner}>{}
        </div>
        <div className={styles.hotCoin}>
          <div id="wrap" className={styles.search}>
            <span onClick={() => this.toSearch()}>
              <input type="search" placeholder="输入币种简称" disabled />
            </span>
          </div>
          <div className={styles.time}>
            <p className={styles.lastTime}>
              更新于：{convertDate(data.time.lastTime, 'MM-DD hh:ss')}
            </p>
            <p className={styles.newTime}>
              预计下次更新:<em>{parseInt(this.state.dTime / 60)}</em>分<em>{this.state.dTime % 60 < 10 ? `0${this.state.dTime % 60}` : this.state.dTime % 60}</em>秒
            </p>
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
                      <p className={`${styles.fontWeight} ${styles.p1}`}>{item.baseCoinCode}</p>
                      <p className={`${styles.p2} ${item.range < 0 ? styles.down : styles.up}`}>
                        {item.range < 0 ? `- ${NP.times(Math.abs(item.range), 100)}%` : `+ ${NP.times(Math.abs(item.range), 100)}%`} (24H)
                      </p>
                    </div>
                    <button className={`${styles.rightBtn} ${item.result < 0 ? styles.sellBtn : (item.result === 0 ? styles.neutralBtn : styles.buyBtn)}`}>
                      {item.result < 0 ? '卖出' : (item.result === 0 ? '中立' : '买入') }
                    </button>
                  </li>
                ))
              ) : null
            }
          </ul>
        </div>
        <div className={styles.bottomtext}>
        免责申明：本预测指标是利用技术指标结合历史数据实时运算所得，投资者须知未来行情趋势具有极强随机性，本指标仅供参考，需要投资者根据不同行情合理应用，控制风险。币圈有风险，投资需谨慎。
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.quotaCoin;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoin));

