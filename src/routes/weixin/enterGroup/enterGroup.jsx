import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/button/style/index.css';
import Hammer from 'react-hammerjs';
import React from 'react';
import style from './enterGroup.less';


/**
* 分享获取订阅权限页面
* @date        2018-05-03
* @author 赵永帅
*/
// 入群 按钮
const ButtonJoin = () => (
  <WingBlank>
    <Button className={style.joinBtn}>我要入群</Button><WhiteSpace />
  </WingBlank>
);
class Join extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }


  render() {
    return (
      <div className={style.H5box}>
        <div><img src="/assets/images/h5Img/H5.png" className={style.H5bg} /></div>
        <ButtonJoin />
      </div>

    );
  }
}

export default Join;
