import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import styles from './indexMessage.less';
/**
* 老人账号信息页面
* @author 梁慕学
* @Date  2017-12-25
*/
function genDynamics({ dispatch, messages }) {
  // const { customerName } = accountInfo;

  return (
    <div>

      <div className={styles.mesList}>
        <a href="#">
          <WhiteSpace size="lg" />
          <Card full>
            <Card.Header title={<div className={styles.cardtitle}> NEO 日本东京举办NEO见面会</div>} />
            <Card.Body>
              <div className={styles.cardContent}>在东京与我见面，Hikima Miki，Chris Chen，Mishima Yusaku和Kiyohide Hi在东京与我见面，Hikima Miki，Chris Chen，Mishima Yusaku和Kiyohide Higuchi…</div>
            </Card.Body>
            <Card.Footer
              content={
                <div className={styles.cardFooter}>
                  <span className={styles.event}>#币事件</span> <span className={styles.readNum}>1000阅读</span> <span className={styles.times}>刚刚</span>
                </div>
              }
              extra={<div ><img src="/assets/messageListImg/close_btn.png"className={styles.closeBtn} /></div>}
            />
          </Card>
        </a>
      </div>


      <div className={styles.mesList}>
        <a href="#">
          <WhiteSpace size="lg" />
          <Card full>
            <Card.Header title={<div className={styles.cardtitle}> 火币PRO EOS/USDT 1分钟内涨幅：20%</div>} />
            <Card.Body>
              <div className={styles.cardContent}>火币PRO EOS/USDT 1分钟内涨幅：20%，当前价格9.0517≈￥57.00，成交量318371，请注意</div>
            </Card.Body>
            <Card.Footer
              content={
                <div className={styles.cardFooter}>
                  <span className={styles.event}>#异动币提醒</span> <span className={styles.readNum}>1.5万阅读</span> <span className={styles.times}>1分钟前</span>
                </div>
                }
              extra={<div ><img src="/assets/messageListImg/close_btn.png"className={styles.closeBtn} /></div>}
            />
          </Card>
        </a>
      </div>

      <div className={styles.mesList}>
        <a href="#">
          <WhiteSpace size="lg" />
          <Card full>
            <Card.Header title={<div className={styles.cardtitle}> 火币自主数字资产交易所（Huobi HAD…</div>} />
            <Card.Body>
              <div className={styles.cardContent}>尊敬的用户：火币自主数字资产交易所（Huobi HADAX）将于新加坡时间4月11日14:30开尊敬的用户：火币自主数字资产交易所（Huobi HADAX）将于新加坡时间4月11日14:30开放18…</div>
            </Card.Body>
            <Card.Footer
              content={
                <div className={styles.cardFooter}>
                  <span className={styles.event}>#交易所公告</span> <span className={styles.readNum}>1000阅读</span> <span className={styles.times}>1小时  前</span>
                </div>
                  }
              extra={<div ><img src="/assets/messageListImg/close_btn.png"className={styles.closeBtn} /></div>}
            />
          </Card>
        </a>
      </div>

      <div className={styles.mesList}>
        <a href="#">
          <WhiteSpace size="lg" />
          <Card full>
            <Card.Header title={<div className={styles.cardtitle}> 火币自主数字资产交易所（Huobi HAD…</div>} />
            <Card.Body>
              <div className={styles.cardContent}>尊敬的用户：火币自主数字资产交易所（Huobi HADAX）将于新加坡时间4月11日14:30开尊敬的用户：火币自主数字资产交易所（Huobi HADAX）将于新加坡时间4月11日14:30开放18…</div>
            </Card.Body>
            <Card.Footer
              content={
                <div className={styles.cardFooter}>
                  <span className={styles.event}>#交易所公告</span> <span className={styles.readNum}>1000阅读</span> <span className={styles.times}>1小时  前</span>
                </div>
                    }
              extra={<div ><img src="/assets/messageListImg/close_btn.png"className={styles.closeBtn} /></div>}
            />
          </Card>
        </a>
      </div>

              // 二维码弹框

      <div className={styles.alertBox} />
      <div>  <img src="/assets/indexImg/wechat.png" className={styles.alertWechat} /></div>
    </div>


  );
}

class MessageList extends Component {
  constructor(props) {
    console.log('props in MessageList', props);
    super(props);
  }
  render() {
    console.log('MessageList render');
    return genDynamics(this.props);
  }
}

function mapStateToProps({ state }) {
  return { state };
}

export default connect(mapStateToProps)(mobileRouteComponent(MessageList));
// export default mobileRouteComponent(AccountInfo);
