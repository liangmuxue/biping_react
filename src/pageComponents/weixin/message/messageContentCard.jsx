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
    // 异动类型
    let transType = '';
    // 上涨或者跌幅（0涨1跌）
    let upOrDown = 0;
    if (msgObj.transType === 'tansType_gain') {
      transType = '涨幅异动';
    } else if (msgObj.transType === 'tansType_lose') {
      transType = '跌幅异动';
      upOrDown = 1;
    } if (msgObj.transType === 'tansType_buyTrans') {
      transType = '大笔买入';
    } if (msgObj.transType === 'tansType_sellTrans') {
      transType = '大笔卖出';
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
      timeMoment = `${moment(beginTime * 1000).format('HH:mm')}—${
        moment(msgObj.createTime * 1000).format('HH:mm')}`;
    }
    return (
      <div>
        <div className={style.transactionCoin} >
          <div>时间段：<span>{timeMoment}</span></div>
          <div>异动类型：<u className={upOrDown === 0 ? style.toUp : style.toDown}>{transType}</u></div>
          <div>交易所：<span>{msgObj.exchangeName}</span></div>
          <div>交易对：<span>{msgObj.quoteCoinCode}/{msgObj.baseCoinCode}</span></div>
          <div>当前价格：
            <span>{msgObj.price} <br /><b className={style.convert}>(≈ 人民币{msgObj.priceReal}）</b>
            </span>
          </div>
          <div>{timeUp}分钟内成交量：
            <span>{msgObj.amount}，其中买入{msgObj.buyAmount}、卖出{msgObj.sellAmount}</span>
          </div>
          <div>{timeUp}分钟内净流入量：<span>{msgObj.gainHold}</span></div>
          <div>{timeUp}分钟内涨幅：<span className={msgObj.transType >= '0' ? style.toUp : style.toDown}>{msgObj.gainDiffer}</span></div>
        </div>

        <div className={style.coinTable} >
          <div className={style.coinTitle} >异动数据（单位：USDT)</div>
          <div className={style.tableTitle}>
            <div className={style.tableTime}>时间</div>
            <div className={style.tablePrice}>单价</div>
            <div className={style.tableChg}>涨跌幅</div>
            <div className={style.tableIncome}>净流入</div>
          </div>
        </div>
        {msgObj.quoteList.map(msg =>
        (
          <div className={style.coinLists} >
            <div className={style.tableTitle}>
              <div className={style.tableTime}> {moment(msg.qTime * 1000).format('HH:mm')}</div>
              <div className={style.tablePrice}>{msg.price}</div>
              <div className={style.tableChg}><span>{msg.gainDiffer}</span></div>
              <div className={style.tableIncome}>{msg.gainHold}</div>
            </div>
          </div>
        ))}
      </div>

    );
  }
}

export default MessageContent;
