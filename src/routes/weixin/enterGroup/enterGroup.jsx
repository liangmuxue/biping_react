import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import Hammer from 'react-hammerjs';
import React from 'react';
import style from './enterGroup.less';


/**
* 分享获取订阅权限页面
* @date        2018-05-03
* @author 赵永帅
*/

class Join extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  enterGroup(e) {
    window.location.href = 'https://weixin.qq.com/g/AQQfr9hj9a1d8if_';
  }

  render() {
    return (
      <div className={style.H5box}>
        <div><img src="/assets/images/h5Img/H5.png" className={style.H5bg} /></div>
        <WingBlank>
          <Button className={style.joinBtn} onClick={this.enterGroup.bind(this)}>我要入群</Button><WhiteSpace />
        </WingBlank>
      </div>

    );
  }
}

export default Join;
