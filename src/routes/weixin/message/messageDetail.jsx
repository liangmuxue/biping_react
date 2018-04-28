import React, { Component } from 'react';
import { connect } from 'dva';
import Hammer from 'react-hammerjs';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank, List } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from './messageDetail.less';
import styles from '../bEvents/bEvents.less';
import HeaderBar from '../../../components/headerBar';

/**
* 老人账号信息页面
* @author 梁慕学
* @Date  2017-12-25
*/

const Buttongo = () => (
  <WingBlank>
    <Button type="primary" className={style.toButton}>去开通</Button><WhiteSpace />
  </WingBlank>
);

function genMessage({ dispatch, data }) {
  const msgObj = data;
  console.log('msgObj is', msgObj);
}

class MsgDetail extends Component {
  constructor(props) {
    console.log('props in MsgDetail', props);
    super(props);
  }
  likeClick() {
    const { dispatch, msgDetailData } = this.props;
    const msgObj = msgDetailData.data;
    console.log(`likeClick in:${msgObj.mid}`);
    dispatch({
      type: 'messageDetail/msgLike',
      // 不需要传是否喜欢，model中根据原数据判断
      payload: {
        messageId: msgObj.mid,
      },
    });
  }

  render() {
    console.log('MsgDetail render', this.props);
    const { msgDetailData } = this.props;
    // 如果没有数据，需要首先进行查询
    if (!msgDetailData) {
      this.props.dispatch({
        type: 'messageDetail/detailQuery',
        payload: { messageId: this.props.params.messageId },
      });
      return null;
    }
    const msgObj = msgDetailData.data;
    console.log('msgObj44444', msgObj);
    const likeArea = (<Hammer onTap={this.likeClick.bind(this)}>
      <div>
        <img
          src={msgObj.userlike === 1 ? '/images/details/zan.png' : '/images/details/notzan.png'}
          className={style.goodImg}
          alt=""
        />
        <span className={style.numbers}>喜欢</span>
        <div>  <span className={style.numbers}>{msgObj.likeCnt}</span></div>
      </div>
    </Hammer>);
    return (
      <div>
        <HeaderBar headerText="详情" backRouteLink="indexMessage" {...this.props} />
        <div className={style.bannerBox}>
          <div><img src="/images/details/banner.png" className={style.bannerPic} /></div>
          <div className={style.btnBox}><Buttongo /></div>
        </div>

        <div className={style.notice}>
          <div className={style.noticeTitle}>
            <div className={style.times}>{msgObj.time}</div>
            <div className={style.detail}>{msgObj.verbname}</div>
          </div>

          <div className={style.caption}>{msgObj.title}</div>
          <div className={style.article}>{msgObj.content}
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
              <div className={style.like}>
                {likeArea}
              </div>
              <div className={style.unlike}>
                <img src="/images/details/2.png" className={style.goodImg} alt="" />
                <span className={style.numbers}>不喜欢</span>
              </div>
            </div>
          </div>

          <div className={style.similarBox}>
            <div className={style.similarCenter}>
              <div className={style.similarTitle}>类似消息</div>
              <ul className={style.similarListUl}>
                {msgObj.relateMsg.map(msg =>
                  (
                    <li className={style.similarListLi}>
                      <a href="#" className={style.similarList}>{msg.title}</a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps in,state', state);
  // 直接返回本model
  return state.messageDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(MsgDetail));
// export default mobileRouteComponent(AccountInfo);
