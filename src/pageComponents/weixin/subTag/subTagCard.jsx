import 'antd-mobile/es/tag/style/index.css';
import Hammer from 'react-hammerjs';
import React from 'react';
import Tag from 'antd-mobile/lib/tag/index';
import style from './subTag.less';
import { siteAnalysis } from '../../../utils/siteAnalysis.js';


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
    const { dispatch } = subTagObj;
    console.log('currentPath', backPath);
    // 跳转到之前的页面
    dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: backPath, backArrow: true, messageId, currentPage: backPath,
      },
    });
  }
  // 是否关注
  subscribe() {
    const { subTagObj } = this.props;
    const { dispatch } = subTagObj;
    const { isSubscribe, data } = subTagObj.subTagList;
    const { attention } = data;
    let subscribeType = 0;
    if (isSubscribe) {
      subscribeType = isSubscribe;
    } else if (attention === true) {
      subscribeType = 0;
    } else if (attention === false) {
      subscribeType = 1;
    }
    const msgObj = subTagObj.subTagList.data;
    console.log(`subscribe in:${msgObj.id}`);
    dispatch({
      type: 'subTagList/subscribe',
      // 类别id（交易所公告等）
      payload: {
        labelId: msgObj.id,
        subscribeType,
      },
    });
  }
  render() {
    const { subTagObj } = this.props;

    console.log('subTagObj', subTagObj);
    const { data, isSubscribe } = subTagObj.subTagList;
    // 关注数量，增加一个关注自动加一
    let { count } = data;
    const {
      attention, logo, name,
    } = data;
    // 已订阅
    let subscribeType = 0;
    let subscribeContent = '';
    if (isSubscribe && isSubscribe === 0) {
      subscribeType = 0;
    } else if (isSubscribe && isSubscribe === 1) {
      subscribeType = 1;
    } else if (attention === true) {
      subscribeType = 0;
    } else if (attention === false) {
      subscribeType = 1;
    }
    if (isSubscribe && isSubscribe === 0) {
      count += 1;
    } else if (isSubscribe && isSubscribe === 1) {
      count -= 1;
    }
    console.log('subscribeType+++++', subscribeType);
    if (subscribeType === 0) {
      subscribeContent = (
        <Tag onChange={this.subscribe.bind(this)} selected>已订阅</Tag>
      );
    } else {
      subscribeContent = (
        <Tag onChange={this.subscribe.bind(this)}>订阅</Tag>
      );
    }
    return (
      <div >
        <div className={style.coinMain}>
          <div className={style.bgBox} >
            <div className={style.mask} />
            <img className={style.bgPic} src={logo} alt="-" />
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
                {subscribeContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubTagCard;
