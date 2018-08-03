import React from 'react';
import moment from 'moment';
import { NumberFormat } from '../../../utils/numberFormat.js';
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
    const { content, shareType } = this.props;
    const msgObj = content;
    console.log('msgObj is', msgObj, shareType);
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
      const beginTime = msgObj.createTime - ((timeUp * 60) - 60);
      timeMoment = `${moment(beginTime * 1000).format('HH:mm')} - ${
        moment(msgObj.createTime * 1000).format('HH:mm')}`;
    }
    // 净流入,涨跌幅,价格显示
    const { gainHoldFun, priceShow, gainDifferFun } = NumberFormat;
    // 转换为成交金额
    const vol = msgObj.priceReal * msgObj.amount / 10000;
    const volStr = vol.toFixed(2) + '万';
    // 转换为净流入金额
    const holdVol = msgObj.priceReal / msgObj.price * msgObj.gainHold /10000;
    const holdVolStr = holdVol.toFixed(2) + '万';
    let differTextArea = null;
    if(msgObj.direction){
      differTextArea = "";
    }else{
      if(msgObj.gainDiffer > 0){
        differTextArea =  (<div>
          {timeUp}分钟内上涨：
          <span className={style.toUp}>
            +{(msgObj.gainDiffer ? (msgObj.gainDiffer * 100).toFixed(2) : '-')}%
          </span>
        </div>);
      }
      if(msgObj.gainDiffer < 0){
        differTextArea =  (<div>
          {timeUp}分钟内下跌：
          <span className={style.toDown}>
            {(msgObj.gainDiffer ? (msgObj.gainDiffer * 100).toFixed(2) : '-')}%
          </span>
        </div>);
      }
    }
    const gainHoldTrans = function(gainHold){
      const gainHoldReal =  msgObj.priceReal / msgObj.price * gainHold /10000;
      return '￥ ' + gainHoldReal.toFixed(2) + '万';
    };
    return (
      <div className={`${shareType == 1 ? style.shareCon : ''}`}>
        <div className={`${style.transactionCoin}`} >
          {msgObj.direction ? <div>预警时间：<span>{moment(msgObj.createTime * 1000).format('HH:mm')}</span></div> : <div>时间段：<span>{timeMoment}</span></div>}
          <div>异动类型：<u className={upOrDown === 0 ? style.toUp : style.toDown}>{transType}</u></div>
          <div>交易所：<span>{msgObj.exchangeName}</span></div>
          <div>交易对：
            <span>{msgObj.baseCoinCode !== null ? msgObj.baseCoinCode.toUpperCase() : ''}
            /{msgObj.quoteCoinCode != null ? msgObj.quoteCoinCode.toUpperCase() : ''}
            </span>
          </div>
          {msgObj.direction ? <div>异常大单：<span>{msgObj.direction === 'buy' ? '买入' : '卖出'}{msgObj.amount.toFixed(2)} {msgObj.baseCoinCode }</span></div> : ''}
          <div>当前价格：
            <span>
              {msgObj.price} {msgObj.quoteCoinCode !== null ? msgObj.quoteCoinCode.toUpperCase() : ''}<br />
              <b className={style.convert}>
               (≈ 人民币{msgObj.priceReal ? priceShow(msgObj.priceReal) : '-'}）
              </b>
            </span>
          </div>
          {msgObj.direction ?
            <div>成交额：
              <span>
                ￥{volStr}
              </span>
            </div> :
            <div>{timeUp}分钟内资金净流入：
              <span>￥{holdVolStr}
              </span>
            </div>
          }
          {
            differTextArea
          }
        </div>
        {msgObj.quoteList?
          <div>
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
                {msg.price ?
                <div className={style.tableTitle}>
                  <div className={style.tableTime}> {moment(msg.qTime * 1000).format('HH:mm')}</div>
                  <div className={style.tablePrice}>{msg.price.toString().substr(0, 9)}</div>
                  <div className={style.tableChg}>
                    <span className={msg.gainDiffer >= 0 ? style.toUp : style.toDown}>
                      {gainDifferFun(msg.gainDiffer)}
                    </span>
                  </div>
                  <div className={style.tableIncome}>{gainHoldTrans(msg.gainHold)}</div>
                </div>
                :
                <div className={style.tableTitle}>
                  <div className={style.tableTime}> {moment(msg.qTime * 1000).format('HH:mm')}</div>
                  <div className={style.tablePrice}>-</div>
                  <div className={style.tableChg}>
                    <span>
                      -
                    </span>
                  </div>
                  <div className={style.tableIncome}>-</div>
                </div>
                }
              </div>
            ))}
          </div>
        :''}
      </div>

    );
  }
}

export default MessageContent;
