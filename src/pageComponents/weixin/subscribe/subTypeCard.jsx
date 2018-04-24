import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/button/style/index.css';
import Hammer from 'react-hammerjs';
import React from 'react';
import styles from './subTypeCard.less';


/**
* 订阅消息卡片
* @date        2018-04-20
* @author 梁慕学
*/

class SubTypeCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }

  handleTap(e) {
    console.log('handleTap in,props:', this.props);
    this.props.cardClick(this.props.typeObj);
  }

  render() {
    const { typeObj } = this.props;
    let remainButton = null;
    // 去注册按钮
    const Register = () => (
      <WingBlank>
        <Button type="primary" className={styles.toRegister}>去开通</Button><WhiteSpace />
      </WingBlank>
    );
    const Renew = () => (
      <WingBlank>
        <Button className={styles.Renew}>剩81天&nbsp;| 续费</Button><WhiteSpace />
      </WingBlank>
    );
    if (typeObj.remainDate >= 0) {
      remainButton = (<Register />);
    } else {
      remainButton = (<Renew />);
    }
    return (

      <div className={styles.whiteBox}>
        {remainButton}
        <div className={styles.boxCenter}>
          <div className={styles.hadReady}>已经有{typeObj.subCnt}人订阅：</div>
          <h1 className={styles.titles}>{typeObj.typeName}</h1>
          <div className={styles.contents}>{typeObj.typeDesc}</div>
          <Hammer onTap={this.handleTap.bind(this)}>
            <div className={styles.bottomBtn}>{typeObj.typeRemark}<img src="/images/messageListImg/right_arrow.png" className={styles.arrowRight} /></div>
          </Hammer>
        </div>
      </div>
    );
  }
}

export default SubTypeCard;
