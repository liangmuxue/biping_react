
import { connect } from 'dva';
import React from 'react';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import 'antd-mobile/es/toast/style/index.css';
import Toast from 'antd-mobile/lib/toast/index';
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
    const { params } = this.props;
    console.log('111111111111111111111', params);
    if (params) {
      const { ifEnterGroup } = params;
      console.log('2222222', ifEnterGroup);
      if (ifEnterGroup === 1) {
        console.log('33333333', ifEnterGroup);
        Toast.info('您已经加入过我们的群了', 2);
      } else {
        dispatch({
          type: 'enterGroup/shareWechat',
          payload: {

          },
        });
      }
    }
  }

  closeShare() {
    const { dispatch } = this.props;
    console.log('closeShare in');
    dispatch({
      type: 'enterGroup/closeShare',
    });
  }

  componentWillMount() {
    console.log('componentWillMount in Join:', this.props);
    // 由于不请求，所以不走didupdate，所以统一从这里消除加载提示
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'enterGroup',
    });
  }

  render() {
    const { showShare } = this.props;
    console.log('enterGroup44444', this.props);
    // 分享消息的图片链接
    const wechatImg = '/images/h5Img/enterGroup.png';
    const modal = (<Modal
      visible={showShare}
      transparent
      maskClosable={false}
      closable
      wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      onClose={this.closeShare.bind(this)}
    >
      <div style={{ overflow: 'hidden' }}>
        <img src={wechatImg} alt="" style={{ width: '6rem' }} />
      </div>
                   </Modal>);

    return (
      <div className={style.H5box}>
        <div><img src="https://biping.oss-cn-beijing.aliyuncs.com/Static/images/wechat/middle.png" className={style.H5bg} /></div>
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
