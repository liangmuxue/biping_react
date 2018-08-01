import React from 'react';
import { connect } from 'dva';
import NP from 'number-precision';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import html2canvas from 'html2canvas';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import styles from './quotaCoinDetail.less';
import { convertDate } from '../../../utils/dateFormat';
import BipingEwm from './layer/bipingEwm';

class QuotaCoinDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      bipingEwm: false,
      showModel: false,
      imgUrl: null,
      showTextLayer: false,
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
  shareBtn() {
    document.getElementById('shareBottom').style.display = 'block';
    html2canvas(document.getElementById('shareCon'), { useCORS: true, allowTaint: false }).then((canvas) => {
      document.getElementById('shareBottom').style.display = 'none';
      this.state.imgUrl = canvas.toDataURL('image/png');
      this.setState({
        showModel: true,
      });
    });
  }
  showEwm() {
    this.setState({
      bipingEwm: true,
    });
  }
  closeShare() {
    this.setState({
      showModel: false,
    });
  }
  closeShareEwm() {
    this.setState({
      bipingEwm: false,
    });
  }
  showTextBtn() {
    this.setState({
      showTextLayer: true,
    });
  }
  closeshowTextLayer() {
    this.setState({
      showTextLayer: false,
    });
  }
  render() {
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
      rgs = -30 - (60 * percentage.sellPer);
    } else if (percentage.result === 0) {
      rgs = -30 + (60 * percentage.neutralityPer);
    } else {
      rgs = 30 + (60 * percentage.buyPer);
    }
    let textRg = 0; // 波动区间文字
    let spanRg = 0; // 波动区间白框
    let leftBtnDom = null;
    let rightBtnDom = null;
    if (quota.rsPosition) {
      const { support } = quota.rsPosition; // 支撑位
      const { resistance } = quota.rsPosition; // 阻力位
      const { bpCurPrice } = range; // 当前价格
      const a = resistance - support;
      const b = bpCurPrice - support;
      if (bpCurPrice < support) {
        textRg = 0;
        spanRg = 0;
        leftBtnDom = (<a className={styles.rightBtn}>突破支撑位</a>);
      } else if (bpCurPrice > resistance) {
        textRg = 65;
        spanRg = 95;
        rightBtnDom = (<a className={styles.leftBtn}>突破阻力位</a>);
      } else {
        textRg = (b / a) * 85;
        spanRg = (b / a) * 95;
      }
    }
    // 波动区间弹层
    let showTextLayerDom = null;
    showTextLayerDom = (
      <Modal
        visible={this.state.showTextLayer}
        transparent
        maskClosable
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        onClose={this.closeshowTextLayer.bind(this)}
      >
        <div className={styles.textLayer}>
          <span className={styles.text}>
            压力位就是当汇价上升到某价位附近时，汇价会停止上涨，甚至回落。这个起着阻止或暂时阻止股价继续上升的价位就是压力线所在的位置。支撑位又称为抵抗线。当汇价跌到某个价位附近时，汇价停止下跌，甚至有可能还会回升。这个起着阻止或暂时阻止股价继续下跌的价位就是支撑线所在的位置。
          </span>
          <span onClick={this.closeshowTextLayer.bind(this)} className={styles.btn}>
            我知道了
          </span>
        </div>
      </Modal>
    );
    // 问币评弹层
    let bipingEwmDom = null;
    bipingEwmDom = (
      <Modal
        visible={this.state.bipingEwm}
        transparent
        maskClosable
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        onClose={this.closeShareEwm.bind(this)}
      >
        <BipingEwm />
      </Modal>
    );
    // 问群友弹层
    const modal = (
      <Modal
        className={styles.shareBg}
        visible={this.state.showModel}
        transparent
        maskClosable
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        onClose={this.closeShare.bind(this)}
      >
        <div >
          <div style={{ lineHeight: '1.08rem' }}>
            <span className={styles.titleTips}>长按图片发送好友</span>
            <img src="/images/msgImages/1.png" alt="" className={styles.finger} />
          </div>
          <div style={{ height: 400, overflow: 'scroll' }}>
            <img style={{ height: 'auto', width: '5rem' }} src={this.state.imgUrl} alt="" />
          </div>
        </div>
      </Modal>
    );
    return (
      <div>
        <div id="shareCon">
          <div className={styles.headMsg}>
            <div className={styles.left}>
              <div className={styles.top}>
                <span>{exchange.exchangeZhName}</span>
                <span className={styles.time}>上次更新 {convertDate(range.bpUpdateTime, 'hh:mm')}</span>
              </div>
              <div className={styles.name}>
                <img src={symbol.symbolLogo} alt="" />
                <span>{symbol.baseCoinCode}<em>/{symbol.quoteCoinCode}</em></span>
                <div className={styles.timeZf}>24h涨跌幅：
                  <em>
                    {range.range < 0 ? `- ${NP.times(Math.abs(range.range), 100)}%` : `+ ${NP.times(range.range, 100)}%`}
                  </em>
                </div>
              </div>
            </div>
            <div>
              <span className={styles.usdtPrice}>7963.03</span>
              <span>USDT ≈ ¥ </span>
              <span className={styles.price}>{range.bpCurPrice}</span>
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
                  {percentage.result < 0 ? `${NP.times(percentage.sellPer, 100)}%` : (percentage.result === 0 ? `${NP.times(percentage.neutralityPer, 100)}%` : `${NP.times(percentage.buyPer, 100)}%`) }
                </span>
              </div>
            </div>
            <div className={styles.fluctuate}>
              <div className={styles.conTitle}>
                <div className={styles.column}>{}</div>
                <span className={styles.titleText}>波动区间</span>
                <img onClick={this.showTextBtn.bind(this)} className={styles.titleImg} src="/images/quotaCoin/wen.png" alt="" />
                <span className={styles.rightText}>单位（元）</span>
              </div>
              <div className={styles.conText}>
                <div className={styles.centerText} style={{ textIndent: `${textRg}%` }}>
                  <span className={styles.text1}>
                    {rightBtnDom}
                    {range.bpCurPrice}
                    {leftBtnDom}
                  </span>
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
                <div className={styles.tableCenter}>{}</div>
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
          <div id="shareBottom" className={styles.shareBottom}>
            <div className={styles.leftCon}>
              <p>本信号由币评AI诊币系统产生，并提取了部分内容发布</p>
              <ul>
                <li>暴涨暴跌提醒</li>
                <li>大单买卖提醒</li>
                <li>事件日历</li>
                <li>交易所公告</li>
              </ul>
            </div>
            <div className={styles.rightCon}>
              <img src="/images/share/ewm.jpg" alt="" />
            </div>
          </div>
          <div className={styles.bottomText}>免责说明：本功能中的内容仅供参考，建议投资者根据自身投资风格进行筛选，并合理控制风险。币圈有风险，投资需谨慎。</div>
        </div>
        <div className={styles.btnList}>
          <div onClick={() => this.shareBtn()}>
            <img alt="" src="/images/quotaCoin/share.jpg" />
          </div>
          <div onClick={() => this.showEwm()}>
            <img alt="" src="/images/quotaCoin/wen.jpg" />
          </div>
        </div>
        {bipingEwmDom}
        {modal}
        {showTextLayerDom}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.quotaCoinDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoinDetail));
