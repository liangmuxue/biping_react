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

  handleRemarkTap(e) {
    console.log('handleRemarkTap in,props:', this.props);
    this.props.remarkClick(this.props.typeObj);
  }
  botonClick(e) {
    console.log('subTypeClick:', this.props);
    this.props.subTypeClick(this.props.typeObj);
  }

  render() {
    const { typeObj, flag } = this.props;
    console.log('flag in:', typeObj);
    let remainButton = null;
    if (typeObj.remainDate < 0) {
      // 去注册按钮
      const Register = () => (
        <WingBlank>
          <Button onClick={this.botonClick.bind(this)} type="primary" className={styles.toRegister}>去开通</Button><WhiteSpace />
        </WingBlank>
      );
      remainButton = (<Register />);
    } else {
      const Renew = () => (
        <WingBlank>
          <Button
            onClick={this.botonClick.bind(this)}
            className={styles.Renew}
          >剩{typeObj.remainDate}天&nbsp;| 续费
          </Button>
          <WhiteSpace />
        </WingBlank>
      );
      remainButton = (<Renew />);
    }
    if (typeObj.typeId !== 719) { // 719 AI诊币
      remainButton = null;
    }
    let imgSrc = '';
    switch (typeObj.typeId) {
      case 718: // 暴涨暴跌
        imgSrc = '/images/coinList/coin3.png';
        break;
      case 717: // 大单买卖
        imgSrc = '/images/coinList/coin4.png';
        break;
      case 702: // 交易所公告
        imgSrc = '/images/coinList/coin2.png';
        break;
      case 701: // 币事件
        imgSrc = '/images/coinList/coin1.png';
        break;
      case 719: // AI诊币
        imgSrc = '/images/coinList/coin5.jpg';
        break;
      case 730: // 指标异动
        imgSrc = '/images/coinList/coin6.jpg';
        break;
      default:
        imgSrc = '/images/coinList/coin1.png';
    }
    return (
      <div className={styles.whiteBox}>
        {remainButton}
        <div className={styles.boxCenter}>
          <div className={styles.hadReady}>已经有{typeObj.subCnt}人订阅：</div>
          <img className={flag === '1' ? styles.rightSrc : styles.hide} alt="" src={imgSrc} />
          <h1 className={styles.titles}>{typeObj.typeName}</h1>
          <div className={styles.contents}>{typeObj.tagDesc}</div>
          <Hammer onTap={this.handleRemarkTap.bind(this)}>
            <div className={flag === undefined ? styles.bottomBtn : styles.hide}>{typeObj.typeRemark}<img alt="right_arrow" src="/images/messageListImg/right_arrow.png" className={styles.arrowRight} /></div>
          </Hammer>
        </div>
      </div>
    );
  }
}

export default SubTypeCard;
