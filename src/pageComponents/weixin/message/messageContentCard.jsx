import React from 'react';
import moment from 'moment';
import style from './messageContent.less';

/**
 * 订阅消息卡片
 * @date        2018-04-20
 * @author 梁慕学
 */

class MessageContent extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageContent', props);
    this.state = {
    };
  }

  render() {
    const { content } = this.props;
    const msgObj = content;
    console.log('msgObj is', msgObj);
    // 异动类型
    let transType = '';
    // 上涨或者跌幅（0涨1跌）
    let upOrDown = 0;
    if (msgObj.transType === 'tansType_gain') {
      transType = '上涨';
    } else if (msgObj.transType === 'tansType_lose') {
      transType = '下跌';
      upOrDown = 1;
    } if (msgObj.transType === 'tansType_buyTrans') {
      transType = '买入量异常';
    } if (msgObj.transType === 'tansType_sellTrans') {
      transType = '卖出量异常';
      upOrDown = 1;
    }
    // 时间段
    let timeUp = msgObj.timeType;
    if (timeUp) {
      timeUp = msgObj.timeType.replace('min', '');
    }
    // 时间间隔
    let timeMoment = '';
    if (msgObj.createTime) {
      const beginTime = msgObj.createTime - timeUp * 60;
      timeMoment = `${moment(beginTime * 1000).format('HH:mm')} - ${
        moment(msgObj.createTime * 1000).format('HH:mm')}`;
    }

    return (
      <div>
        <div className={style.transactionCoin} >
          <div>时间段：<span>{timeMoment}</span></div>
          <div>异动类型：<u className={upOrDown === 0 ? style.toUp : style.toDown}>{transType}</u></div>
          <div>交易所：<span>{msgObj.exchangeName}</span></div>
          <div>交易对：<span>{msgObj.baseCoinCode}/{msgObj.quoteCoinCode}</span></div>
          {msgObj.direction ? <div>异常大单：<span>{msgObj.direction === 'buy' ? '买入' : '卖出'}{msgObj.amount.toFixed(2)} {msgObj.baseCoinCode }</span></div> : ''}
          <div>当前价格：
            <span>
              {msgObj.price}
              {msgObj.quoteCoinCode}<br />
              <b className={style.convert}>
               (≈ 人民币{msgObj.priceReal ? (msgObj.priceReal).toFixed(2) : '-'}）
              </b>
            </span>
          </div>
          {msgObj.direction ? <div>1分钟内成交量：
            <span>
              {Math.floor(msgObj.quoteList[0].buyAmount + msgObj.quoteList[0].sellAmount)}，
              其中买入{Math.floor(msgObj.quoteList[0].buyAmount)}、
              卖出{Math.floor(msgObj.quoteList[0].sellAmount)}
            </span>
          </div> : <div>{timeUp}分钟内成交量：<span>
                                {Math.floor(msgObj.buyAmount + msgObj.sellAmount)}，
                其中买入{Math.floor(msgObj.buyAmount)}、
                卖出{Math.floor(msgObj.sellAmount)}
                                                           </span>
                                       </div>}
          {msgObj.direction ? <div>1分钟内净流入量：<span>{msgObj.quoteList[0].gainHold ? msgObj.quoteList[0].gainHold.toFixed(10) : '-'}</span></div> : <div>{timeUp}分钟内净流入量：<span>{msgObj.gainHold ? msgObj.gainHold.toFixed(10) : '-'}</span></div>}

          {msgObj.direction ? <div>1分钟内涨幅：{msgObj.quoteList[0].gainDiffer > 0 ?
            <span className={style.toUp}>
            +{(msgObj.quoteList[0].gainDiffer ? (msgObj.quoteList[0].gainDiffer * 100).toFixed(2) : '-')}%
            </span> :
            <span className={style.toDown}>
              {(msgObj.quoteList.gainDiffer ? (msgObj.quoteList.gainDiffer * 100).toFixed(2) : '-')}%
            </span>}
                              </div> : <div>{timeUp}分钟内涨幅：{msgObj.gainDiffer > 0 ?
            <span className={style.toUp}>
            +{(msgObj.gainDiffer ? (msgObj.gainDiffer * 100).toFixed(2) : '-')}%
                                </span> :
                                <span className={style.toDown}>
              {(msgObj.gainDiffer ? (msgObj.gainDiffer * 100).toFixed(2) : '-')}%
            </span>}
          </div>}

        </div>
        <div className={msgObj.direction ? style.hide : style.coinTable} >
          <div className={style.coinTitle} >异动数据（单位：{(msgObj.quoteCoinCode) ? (msgObj.quoteCoinCode).toUpperCase() : ''})</div>
          <div className={style.tableTitle}>
            <div className={style.tableTime}>时间</div>
            <div className={style.tablePrice}>单价</div>
            <div className={style.tableChg}>涨跌幅</div>
            <div className={style.tableIncome}>净流入</div>
          </div>
        </div>

        {msgObj.quoteList.map(msg =>
        (
          <div className={msgObj.direction ? style.hide : style.coinLists} >
            <div className={style.tableTitle}>
              <div className={style.tableTime}> {moment(msg.qTime * 1000).format('HH:mm')}</div>
              <div className={style.tablePrice}>{msg.price.toString().substr(0, 9)}</div>
              <div className={style.tableChg}><span className={msg.gainDiffer >= '0' ? style.toUp : style.toDown}><span>{msg.gainDiffer > 0 ? '+' : ' '}</span>{msg.gainDiffer ? `${(msg.gainDiffer * 100).toString().substr(0, 4)}%` : '-' }</span></div>
              <div className={style.tableIncome}>{msg.gainHold ? msg.gainHold.toString().substr(0, 8) : msg.gainHold}</div>
            </div>
          </div>
        ))}
      </div>

    );
  }
}

export default MessageContent;
