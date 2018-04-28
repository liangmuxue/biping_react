import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/button/style/index.css';
import Hammer from 'react-hammerjs';
import React from 'react';
import styles from './emptyMsg.less';


/**
* 订阅消息卡片
* @date        2018-04-20
* @author 梁慕学
*/
// 去订阅 按钮
const Buttongo = () => (
  <WingBlank>
    <Button type="primary">赶紧去订阅</Button><WhiteSpace />
  </WingBlank>
);
class EmptyMsgCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }


  render() {
    return (
      <div className={styles.empty}>
        <div><img src="/assets/images/indexImg/nomsg.png" className={styles.buycar} /></div>
        <div className={styles.notread}>暂无消息</div>
        <Buttongo />
      </div>

    );
  }
}

export default EmptyMsgCard;
