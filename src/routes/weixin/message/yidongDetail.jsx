import React from 'react';
import { connect } from 'dva';
import ReactHtmlParser from 'react-html-parser';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import HeaderBar from '../../../components/headerBar';
import styles from './yidongDetail.less';
import { convertDate } from '../../../utils/dateFormat';

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
    if (!messageData.detailData) {
      return null;
    }
    const { detailData } = messageData;
    const { data } = detailData;
    console.log('render=>', this.props, messageData);
    return (
      <div>
        <HeaderBar headerText="详情" backRouteLink={this.state.backPath} {...this.props} />
        <div className={styles.xiaoxiDetail}>
          <div className={styles.detailHheader}>【{data.exchange.exchangeName}】{data.symbol.baseCoinCode}/{data.symbol.quoteCoinCode}出现{data.quota.remindTitle}</div>
          <div className={styles.typeTime}>{convertDate(data.quota.createTime, 'YYYY-MM-DD')} <em>异动指标</em></div>
          <ul className={styles.yidong}>
            <li>
              <span className={styles.leftC}>预警时间：</span>
              <span className={`${styles.rightC} ${styles.upColo}`}>{convertDate(data.quota.createTime, 'hh:mm')}</span>
            </li>
            <li>
              <span className={styles.leftC}>异动类型：</span>
              <span className={styles.rightC}>{data.quota.typeCodeName}({data.quota.timeTypeName})</span>
            </li>
            <li>
              <span className={styles.leftC}>信号建议：</span>
              <span className={styles.rightC}>{data.quota.computedValue < 0 ? '看空' : '看多'}</span>
            </li>
            <li>
              <span className={styles.leftC}>信号详情：</span>
              <span className={styles.rightC}>{data.quota.computedContent}</span>
            </li>
            <li>
              <span className={styles.leftC}>交易所：</span>
              <span className={styles.rightC}>{data.exchange.exchangeName}</span>
            </li>
            <li>
              <span className={styles.leftC}>交易对：</span>
              <span className={styles.rightC}>{data.symbol.baseCoinCode}/{data.symbol.quoteCoinCode}</span>
            </li>
            <li>
              <span className={styles.leftC}>当前价格：</span>
              <span className={styles.rightC}>
                {data.symbol.bpCurPrice} USDT
                <br />
                （≈ 人民币{data.symbol.bpCurPriceCny}）
              </span>
            </li>
          </ul>
          <div className={styles.imgList}>
            {
              data.chart.map((item, index) => (
                <div>
                  {index === 1 ? (<span className={styles.remindTitle}>{data.quota.remindTitle}</span>) : '' }
                  <img alt="" src={item.url} />
                </div>
              ))
            }
            <span>币评小贴士: {data.quota.remindBipingContent}</span>
          </div>
          <div className={styles.coinDes}>
            <div className={styles.titleText}>币种介绍</div>
            <div className={styles.bzCon}>
              <div className={styles.headText}>
                <img className={styles.mipImg} alt="" src={data.symbol.symbolLogo} />
                <span>{data.symbol.symbolCnName}</span>
              </div>
              <div className={styles.textDes}>
                {ReactHtmlParser(data.symbol.symbolIntroduce)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { messageData: state.yidongDetail };
}

export default connect(mapStateToProps)(mobileRouteComponent(YidongDetail));
