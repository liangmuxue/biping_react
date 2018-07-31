import React from 'react';
import { connect } from 'dva';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import styles from './quotaCoinDetail.less';
import { convertDate } from '../../../utils/dateFormat';

class QuotaCoinDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {
    const { params } = this.props;
    this.props.dispatch({
      type: 'quotaCoinDetail/getDetail',
      payload: {
        exchangeId: params.exchangeId,
        symbolId: params.symbolId,
      },
    });
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'quotaCoin',
    });
  }
  render() {
    console.log('render=>', this.props);
    const { quotaCoinDetail } = this.props;
    if (!quotaCoinDetail) {
      return null;
    }
    const { data } = quotaCoinDetail;
    /* **
    * symbol 交易对
    * quota 量化指标
    * percentage 买入 中立 卖出百分比
    * range 当天开盘价格、此刻涨跌幅(range)、此时价格（close）
    * exchange 交易所信息
    * * */
    const {
      symbol, quota, percentage, range, exchange,
    } = data;
    let rgs = 0;
    if (percentage.result < 0) {
      rgs = -30 - (-60 * percentage.sellPer);
    } else if (percentage.result === 0) {
      rgs = -30 + (60 * percentage.neutralityPer);
    } else {
      rgs = 30 + (60 * percentage.buyPer);
    }
    let textRg = 0;
    let spanRg = 0;
    const { support } = quota.rsPosition; // 支撑位
    const { resistance } = quota.rsPosition; // 阻力位
    const { bpCurPrice } = range; // 当前价格
    const a = resistance - support;
    const b = bpCurPrice - support;
    textRg = (b / a) * 74;
    spanRg = (b / a) * 95;
    console.log(textRg, spanRg);
    return (
      <div>
        <div className={styles.headMsg}>
          <div className={styles.left}>
            <span className={styles.exc}>{exchange.exchangeZhName}</span>
            <div className={styles.name}>
              <img src={symbol.symbolLogo} alt="" />
              <span>{symbol.baseCoinCode}<em>/{symbol.quoteCoinCode}</em></span>
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.price}>¥ {range.bpOpen}</span>
            <span className={styles.time}>24小时涨跌幅：
              <em>
                {range.range < 0 ? `- ${Math.abs(range.range) * 100}%` : `+ ${range.range * 100}%`}
              </em>
            </span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.suggest}>
            <img className={styles.suggestImg} src="/images/quotaCoin/green.jpg" alt="" />
            <div className={styles.suggestText}>
              <span className={`${styles.text2} ${percentage.result < 0 ? styles.sell : (percentage.result === 0 ? styles.neutral : styles.buy)}`}>
                {percentage.result < 0 ? '卖出' : (percentage.result === 0 ? '中立' : '买入') }
              </span>
              <span className={styles.line} style={{ transform: `rotateZ(${rgs}deg)` }}>{}</span>
              <span className={styles.circle}>{}</span>
              <span className={styles.text1}>
                {percentage.result < 0 ? `${percentage.sellPer * 100}%` : (percentage.result === 0 ? `${percentage.neutralityPer * 100}%` : `${percentage.buyPer * 100}%`) }
              </span>
            </div>
          </div>
          <div className={styles.fluctuate}>
            <div className={styles.conTitle}>
              <div className={styles.column}>{}</div>
              <span className={styles.titleText}>波动区间</span>
              <img className={styles.titleImg} src="/images/quotaCoin/wen.png" alt="" />
              <span className={styles.rightText}>单位（元）</span>
            </div>
            <div className={styles.conText}>
              <div className={styles.centerText} style={{ textIndent: `${textRg}%` }}>
                <span className={styles.text1}>{range.bpCurPrice}</span>
                <span className={styles.text2}>上次更新 {convertDate(range.bpUpdateTime, 'hh:ss')}</span>
              </div>
              <div className={styles.bgColr}>
                <span style={{ left: `${spanRg}%` }}>{}</span>
              </div>
              <div className={styles.leftText}>
                <span className={styles.triangle}>{}</span>
                <span className={styles.text1}>{quota.rsPosition ? quota.rsPosition.support : null}</span>
                <span className={styles.text2}>支撑位</span>
              </div>
              <div className={styles.rightText}>
                <span className={styles.triangle}>{}</span>
                <span className={styles.text1}>{quota.rsPosition ? quota.rsPosition.resistance : null}</span>
                <span className={styles.text2}>阻力位</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tableList}>
          <div className={styles.tableItem}>
            <div className={styles.conTitle}>
              <div className={styles.column}>{}</div>
              <span className={styles.titleText}>趋势</span>
            </div>
            <div className={`${styles.tableCon} ${styles.tableHeader}`}>
              <div className={styles.tableLeft}>名</div>
              <div className={styles.tableCenter}>值</div>
              <div className={styles.tableRight}>行动</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>移动平均线（5）</div>
              <div className={styles.tableCenter}>{quota.ma ? quota.ma.ma5 : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>移动平均线（10）</div>
              <div className={styles.tableCenter}>{quota.ma ? quota.ma.ma10 : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>移动平均线（90）</div>
              <div className={styles.tableCenter}>{quota.ma ? quota.ma.ma90 : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>移动平均线综合</div>
              <div className={styles.tableCenter}>{}</div>
              <div className={styles.tableRight}>
                <button className={`${quota.ma ? (quota.ma.result < 0 ? styles.sellBtn : (quota.ma.result === 0 ? styles.neutralBtn : styles.buyBtn)) : null}`}>
                  {quota.ma ? (quota.ma.result < 0 ? '卖出' : (quota.ma.result === 0 ? '中立' : '买入')) : null}
                </button>
              </div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>MTM</div>
              <div className={styles.tableCenter}>{quota.mtm ? quota.mtm.mtmValue : null}</div>
              <div className={styles.tableRight}>
                <button className={`${quota.mtm ? (quota.mtm.result < 0 ? styles.sellBtn : (quota.mtm.result === 0 ? styles.neutralBtn : styles.buyBtn)) : null}`}>
                  {quota.mtm ? (quota.mtm.result < 0 ? '卖出' : (quota.mtm.result === 0 ? '中立' : '买入')) : null}
                </button>
              </div>
            </div>
          </div>
          <div className={`${styles.tableItem} ${styles.shockItem}`}>
            <div className={styles.conTitle}>
              <div className={styles.column}>{}</div>
              <span className={styles.titleText}>震荡指标</span>
            </div>
            <div className={`${styles.tableCon} ${styles.tableHeader}`}>
              <div className={styles.tableLeft}>名</div>
              <div className={styles.tableCenter}>值</div>
              <div className={styles.tableRight}>行动</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>KDJ</div>
              <div className={styles.tableCenter}>{quota.kdj ? quota.kdj.kdjValue : null}</div>
              <div className={styles.tableRight}>
                <button className={`${quota.kdj ? (quota.kdj.result < 0 ? styles.sellBtn : (quota.kdj.result === 0 ? styles.neutralBtn : styles.buyBtn)) : null}`}>
                  {quota.kdj ? (quota.kdj.result < 0 ? '卖出' : (quota.kdj.result === 0 ? '中立' : '买入')) : null}
                </button>
              </div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>RSI</div>
              <div className={styles.tableCenter}>{quota.rsi ? quota.rsi.rsiValue : null}</div>
              <div className={styles.tableRight}>
                <button className={`${quota.rsi ? (quota.rsi.result < 0 ? styles.sellBtn : (quota.rsi.result === 0 ? styles.neutralBtn : styles.buyBtn)) : null}`}>
                  {quota.rsi ? (quota.rsi.result < 0 ? '卖出' : (quota.rsi.result === 0 ? '中立' : '买入')) : null}
                </button>
              </div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>布林带上轨</div>
              <div className={styles.tableCenter}>{quota.boll ? quota.boll.up : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>布林带中轨</div>
              <div className={styles.tableCenter}>{quota.boll ? quota.boll.mp : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>布林带下轨</div>
              <div className={styles.tableCenter}>{quota.boll ? quota.boll.down : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>布林带综合</div>
              <div className={styles.tableCenter}>{quota.boll ? quota.boll.zh : null}</div>
              <div className={styles.tableRight}>
                <button className={`${quota.boll ? (quota.boll.result < 0 ? styles.sellBtn : (quota.boll.result === 0 ? styles.neutralBtn : styles.buyBtn)) : null}`}>
                  {quota.boll ? (quota.boll.result < 0 ? '卖出' : (quota.boll.result === 0 ? '中立' : '买入')) : null}
                </button>
              </div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>DIF</div>
              <div className={styles.tableCenter}>{quota.macd ? quota.macd.dif : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>DEA</div>
              <div className={styles.tableCenter}>{quota.macd ? quota.macd.dea : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>MACD</div>
              <div className={styles.tableCenter}>{quota.macd ? quota.macd.macdValue : null}</div>
              <div className={styles.tableRight}>{}</div>
            </div>
            <div className={styles.tableCon}>
              <div className={styles.tableLeft}>MACD综合</div>
              <div className={styles.tableCenter}>{}</div>
              <div className={styles.tableRight}>
                <button className={`${quota.macd ? (quota.macd.result < 0 ? styles.sellBtn : (quota.macd.result === 0 ? styles.neutralBtn : styles.buyBtn)) : null}`}>
                  {quota.macd ? (quota.macd.result < 0 ? '卖出' : (quota.macd.result === 0 ? '中立' : '买入')) : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.quotaCoinDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoinDetail));
