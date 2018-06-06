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
    console.log('ddddddddaaaaa', this.props);
    const { openObj } = this.props;
    let ifEnterGroup = 0;
    if (openObj) {
      ifEnterGroup = openObj.ifEnterGroup;
    }
    console.log('openObj', openObj);
    return (
      <div>
        <div className={style.mineBox}>
          <div><img src={openObj.headUrl} className={style.minePic} /></div>
          <div className={style.mineName}>{openObj.name}</div>
        </div>

        <div className={ifEnterGroup === 0 ? style.introduce : style.hide}>
          <img src="/images/toOpen/open_bg.png" className={style.openbg} />
          <WingBlank className={style.transfrom}>
            <Button type="primary" className={style.toGret} onClick={this.buttonClick.bind(this)}>免费开通</Button><WhiteSpace />
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default OpenCard;
