import Button from 'antd-mobile/lib/button/index';
import 'antd-mobile/es/button/style/index.css';
import Hammer from 'react-hammerjs';
import React from 'react';
import style from './subTag.less';


/**
* 订阅包卡片
* @date        2018-04-25
* @author 赵永帅
*/

class SubTagCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  backTo(e) {
    e.preventDefault();
    const { subTagObj } = this.props;
    const { params } = subTagObj.subTagList;
    console.log('params888888888', params);
    const backPath = 'indexMessage';
    let messageId = '';
    if (params) {
      // backPath = params.backPath;
      messageId = params.messageId;
    }
    const { dispatch } = subTagObj.subTagList;
    console.log('currentPath', backPath);
    // 跳转到之前的页面
    dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: backPath, backArrow: true, messageId, currentPage: backPath,
      },
    });
  }
  render() {
    const { subTagObj } = this.props;

    console.log('subTagObj', subTagObj);
    const { data } = subTagObj.subTagList;
    const {
      attention, count, logo, name,
    } = data;
    return (
      <div>
        <div className={style.coinMain}>
          <div className={style.bgBox} >
            <div className={style.mask} />
            <img className={style.bgPic} src="/images/coinList/coinBg.png" alt="-" />
          </div>
          <div>
            <Hammer onTap={this.backTo.bind(this)}>
              <img className={style.coinArrow}src="/images/coinList/coinArrow.png" alt="-" />
            </Hammer>
            <img className={style.coinLogo} src={logo} alt="-" />
            <span className={style.readNum}>{count}人关注</span>
            <div style={{ background: '#fff' }}>
              <div className={style.coinName}>{name}</div>
              <div className={style.btnBox}>
                <Button type="primary" className={style.subscribe}>订阅</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubTagCard;
