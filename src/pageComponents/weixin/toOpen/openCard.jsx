import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/button/style/index.css';
import React from 'react';
import style from './toOpen.less';

/**
* 订阅包卡片
* @date        2018-04-25
* @author 赵永帅
*/

class OpenCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  buttonClick(e) {
    console.log('handleRemarkTap in,props:', this.props);
    this.props.openClick(this.props.typeObj);
  }
  render() {
    const { openObj } = this.props;
    console.log('openObj', openObj);
    return (
      <div>
        <div className={style.mineBox}>
          <div><img src={openObj.headUrl} className={style.minePic} /></div>
          <div className={style.mineName}>{openObj.name}</div>
        </div>

        <div className={style.introduce}>
          <img src="/images/toOpen/open_bg.png" className={style.openbg} />
          <div className={style.introduceTitle}>套餐介绍</div>
          <div className={style.slogan}>拉好友、<span className={style.colorFont}>免费</span>开通</div>
          <WingBlank className={style.transfrom}>
            <Button type="primary" className={style.toGret} onClick={this.buttonClick.bind(this)}>去获取</Button><WhiteSpace />
          </WingBlank>
          <div className={style.matterBox}>每邀请1位好友关注「币评区块链」公众号、免费获得「币事件」服务<span className={style.redData}>30</span>天</div>
        </div>
      </div>
    );
  }
}

export default OpenCard;
