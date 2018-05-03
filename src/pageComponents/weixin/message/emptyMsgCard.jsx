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
class EmptyMsgCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  buttonClick() {
    console.log('8888888888888888');
    this.props.emptyClick(this);
  }

  render() {
    return (
      <div className={styles.empty}>
        <div><img src="/assets/images/indexImg/nomsg.png" className={styles.buycar} /></div>
        <div className={styles.notread}>没有订阅</div>
        <WingBlank>
          <Button type="primary" onClick={this.buttonClick.bind(this)}>赶紧去订阅</Button><WhiteSpace />
        </WingBlank>
      </div>

    );
  }
}

export default EmptyMsgCard;
