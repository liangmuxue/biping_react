import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank,List } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from './details.less';
import styles from '../bEvents/bEvents.less';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

 const Buttongo = () => (
   <WingBlank>
      <Button type="primary" className={style.toButton}>去开通</Button><WhiteSpace />
  </WingBlank>
)

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
    <div>
      <div className={styles.toptitle}>
      详情
      <a href="#" ><img src="/images/messageListImg/left_arrow.png" className={styles.leftArrow}/></a>
      </div>

      <div className={style.bannerBox}>
            <div><img src="/images/details/banner.png" className={style.bannerPic}/></div>
              <div className={style.btnBox}><Buttongo /></div>
      </div>

      <div className={style.notice}>
        <div className={style.noticeTitle}>
            <div className={style.times}>2018-04-11</div>
            <div className={style.detail}>交易所公告</div>
        </div>

        <div className={style.caption}>火币全球专业站将于4月11日18:00上线ZRX/ETH交易</div>
        <div className={style.article}>尊敬的用户：<br/><br/>火币全球专业站定于新加坡时间4月11日18:00在创新区开放ZRX/ETH交易。<br/><br/>
          祝您交易愉快！<br/><br/>火币全球专业站<br/>2018年4月11日
          </div>
          <div><a href="#" className={style.toFriend}>分享给好友</a></div>
      </div>

      <div className={style.up}>
          <div className={style.upCenter}>
              <div className={style.upTitle}>所属标签</div>
              <ul className={style.labels}>
                <li className={style.labelsList}>ZRX</li>
                <li className={style.labelsList}>交易所：火币PRO</li>
              </ul>

              <div className={style.likesBox}>
                  <div className={style.like}><img src="details/zan.png" className={style.goodImg}/><span className={style.numbers}>445</span></div>
                  <div className={style.unlike}><img src="details/2.png" className={style.goodImg}/><span className={style.numbers}>不喜欢</span></div>
              </div>
           </div>

           <div className={style.similarBox}>
               <div className={style.similarCenter}>
                    <div className={style.similarTitle}>类似消息</div>
                    <ul className={style.similarListUl}>
                          <li className={style.similarListLi}><a href="#" className={style.similarList}>BTC，开展有奖竞赛。</a></li>
                          <li className={style.similarListLi}><a href="#" className={style.similarList}>CAPP，进行空投。</a></li>
                          <li className={style.similarListLi}><a href="#" className={style.similarList}>BLUE，更新白皮书和路线图。</a></li>
                          <li className={style.similarListLi}><a href="#" className={style.similarList}>TIPS，发布Linux钱包。</a></li>
                          <li className={style.similarListLi}><a href="#" className={style.similarList}>ARV，测试网络V2将于12日发布。</a></li>
                    </ul>
               </div>
           </div>
      </div>
    </div>


  );
}

class AccountInfo extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  render() {
    console.log('AccountInfo render');
    return genDynamics(this.props);
  }
}

function mapStateToProps({ state }) {
  return { state };
}

export default connect(mapStateToProps)(mobileRouteComponent(AccountInfo));
// export default mobileRouteComponent(AccountInfo);
