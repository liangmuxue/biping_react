
import { connect } from 'dva';
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Checkbox from 'antd-mobile/lib/checkbox/index';
import React from 'react';
import 'antd-mobile/es/modal/style/index.css';
import 'antd-mobile/es/toast/style/index.css';
import 'antd-mobile/es/checkbox/style/index.css';
import mobileRouteComponent from '../../../routes/common/mobileRouteComponent';
import BaseComponent from '../../../routes/weixin/baseComponent';
import style from './CheckTime.less';

/**
* * @date        2018-05-03
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
    document.getElementById('showShare').style.display = 'block';
  }

  closeShare(event) {
    // event.prventDefault();
    document.getElementById('showShare').style.display = 'none';
  }


  render() {
    const { CheckboxItem } = Checkbox;
    const modal = (<Modal
      transparent
      maskClosable
      closable={false}
      onClose={this.closeShare.bind(this)}
    />);

    return (
      <div >
        <Button onClick={this.shareClick.bind(this)} className={style.timeBtn}><sapn>时间段</sapn><span className={style.timeVal}>5分钟,15分钟</span><img src="/images/msgImages/arrow1.png" /></Button>
        <div style={{ display: 'none' }} className={style.showShare} id="showShare" >
          <List renderHeader={() => <div>时间段<span onClick={this.closeShare.bind(this)} id="closeShare" style={{ color: '#0068DD', textAligin: 'right' }}>完成</span></div>} className="popup-list">
            {['3分钟', '5分钟', '10分钟', '15分钟'].map((i, index) => (
              <CheckboxItem className={style.timelv} key={index}>{i}</CheckboxItem>
           ))}
          </List>
          <div>
            <Button type="primary" onClick={this.closeShare.bind(this)} id="closeShare" style={{ hackeight: '20px' }}>确认</Button>
          </div>
        </div>
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
