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
    const msgObj = subTagObj.subTagList.data;
    dispatch({
      type: 'subTagList/subscribe',
      // 类别id（交易所公告等）
      payload: {
        labelId: msgObj.id,
      },
    });
  }
  render() {
    const { subTagObj } = this.props;

    console.log('subTagObj', subTagObj);
    const { data } = subTagObj.subTagList;
    // 关注数量，增加一个关注自动加一
    const { count } = data;
    const {
      attention, logo, name,
    } = data;
    // 已订阅
    let subscribeContent = '';
    if (attention === true) {
      subscribeContent = (
        <Tag onChange={this.subscribe.bind(this)} selected>已订阅</Tag>
      );
    } else {
      subscribeContent = (
        <Tag onChange={this.subscribe.bind(this)}>订<u style={{ padding: '0 .137rem' }} />阅</Tag>
      );
    }
    const docWidth = document.querySelector('body').offsetWidth;
    console.log(`docWidth:${docWidth}`);
    return (
      <div style={{ width: docWidth, marginTop: -30 }}>
        <div className={style.coinMain}>
          <div className={style.bgBox} >
            <div className={style.mask} />
            <img className={style.bgPic} src={logo} alt="-" />
          </div>
          <div>
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
