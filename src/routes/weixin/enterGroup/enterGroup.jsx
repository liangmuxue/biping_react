
import { connect } from 'dva';
import React from 'react';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import style from './enterGroup.less';
import BaseComponent from '../baseComponent';


/**
* 分享获取订阅权限页面
* @date        2018-05-03
* @author 赵永帅
*/

class Join extends BaseComponent {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  shareClick(event) {
    // event.prventDefault();
    const { dispatch } = this.props;
    console.log('111111111111111111111', this.props);
    dispatch({
      type: 'enterGroup/shareWechat',
      payload: {

      },
    });
  }

  closeShare() {
    const { dispatch } = this.props;
    console.log('closeShare in');
    dispatch({
      type: 'enterGroup/closeShare',
    });
  }

  render() {
    const { showShare } = this.props;
    console.log('msgObj44444', this.props);
    // 分享消息的图片链接
    const wechatImg = '/images/h5Img/enterGroup.png';
    const modal = (<Modal
      visible={showShare}
      transparent
      maskClosable={false}
      closable
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      onClose={this.closeShare.bind(this)}
      footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.closeShare.bind(this); } }]}
    >
      <div style={{ overflow: 'hidden' }}>
        <img src={wechatImg} alt="" style={{ width: '6rem' }} />
      </div>
    </Modal>);

    return (
      <div className={style.H5box}>
        <div><img src="/images/h5Img/H5.png" className={style.H5bg} /></div>
        <WingBlank>
          <Button className={style.joinBtn} onClick={this.shareClick.bind(this)} /><WhiteSpace />
        </WingBlank>
        {modal}
      </div>
    );
  }
}
function enterGroupstate(state) {
  console.log('enterGroupstate', state);
  // 直接返回本model
  // const { messageDetail, app } = state;
  return state;
}

function enterGroupstate(state) {
  console.log('enterGroupstate', state);
  // 直接返回本model
  // const { messageDetail, app } = state;
  return state.enterGroup;
}

export default connect(enterGroupstate)(mobileRouteComponent(Join));
