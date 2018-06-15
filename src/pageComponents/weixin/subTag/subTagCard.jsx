import 'antd-mobile/es/button/style/index.css';
import Hammer from 'react-hammerjs';
import React from 'react';
import Button from 'antd-mobile/lib/button/index';
import HeaderBar from '../../../components/headerBar';
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
    const msgObj = subTagObj.subTagList.data;
    console.log(`subscribe in:${msgObj.id}`);
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
    const { data, isSubscribe } = subTagObj.subTagList;
    // 关注数量，增加一个关注自动加一
    let { count } = data;
    const {
      attention, logo, name,
    } = data;
    let subscribeType = true;
    if (isSubscribe) {
      subscribeType = isSubscribe;
      count += 1;
    } else {
      subscribeType = attention;
    }

    return (
      <div>
        <HeaderBar headerText="BTC比特币" backRouteLink={this.props.backPath} {...this.props} style={{ zIndex: '1' }} />
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
                <Button type="primary" className={subscribeType === false ? style.subscribe : style.hide} onClick={this.subscribe.bind(this)}>订阅</Button>
                <Button type="primary" className={subscribeType === true ? style.subscribed : style.hide} disabled>已订阅</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubTagCard;
