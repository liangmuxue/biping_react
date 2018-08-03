import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Modal from 'antd-mobile/lib/modal/index';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator/index';
import Button from 'antd-mobile/lib/button/index';
// import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/modal/style/index.css';
// import 'antd-mobile/es/wing-blank/style/index.css';
import 'antd-mobile/es/activity-indicator/style/index.css';
import Footer from '../../../pageComponents/weixin/footer/footer';
import { config } from '../../../../config/environment';
import { innerPageDefs } from '../../../wxRouter';
import styles from './index.less';

class HomePage extends Component {
  constructor(props) {
    console.log('props in HomePage', props);
    super(props);

    this.pageDef = null;
    this.setPageRef = (element) => {
      this.pageDef = element;
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    // 监听地址返回事件，控制内部跳转
    window.addEventListener(
      'popstate',
      (event) => {
        console.log('back button click', event.state);
        const dom = this.pageDef.querySelector("div[type='headerBack']");
        console.log('ref dom:', dom);
        dispatch({
          type: 'pageConstruction/switchToInnerPage',
          payload: { backButton: true },
        });
      },
      false,
    );
  }
  setAttr(key, value) {
    if (this.pageDef) {
      this.pageDef.setAttribute(key, value);
    }
  }
  getAttr(key) {
    if (this.pageDef) {
      return this.pageDef.getAttribute(key);
    }
    return null;
  }
  closeAttenModal() {
    this.props.dispatch({
      type: 'app/closeAttenModal',
      payload: { },
    });
  }
  render() {
    const {
      match, app, pageConstruction,
    } = this.props;
    const { qrImgName } = config.env;
    const wechatQrImgSrc = `/images/indexImg/${qrImgName}`;
    console.log(`match.url:${match.url}`);
    console.log('app data', app);
    if (!app) {
      return null;
    }
    const {
      attentionModal, pagiLoading, routeLoading, netError, touchMoveDisable, pagiPosition,
    } = app;
    console.log(`attentionModal is:${attentionModal}`);
    let modal = null;
    if (attentionModal) {
      // 阻断提示 未关注
      modal = (<Modal
        visible={attentionModal}
        transparent
        maskClosable={false}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div style={{ overflow: 'hidden', width: '5.38rem', height: '5.44rem' }}>
          <img src={wechatQrImgSrc} alt="" style={{ width: '5.38rem', height: '5.44rem' }} />
        </div>
      </Modal>);
    } else if (netError) {
      // 阻断提示 网络连接错误
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <div style={{ width: '2.55rem', height: '1.58rem', margin: '2.88rem auto 0' }}>
            <img src="/images/indexImg/netError.png" alt="" style={{ width: '2.55rem', height: '1.58rem' }} />
          </div>
          <div className={styles.tipError}> 网络不给力~ </div>
          <div className={styles.refresh}>
            <Button>点击重试</Button>
          </div>
        </div>
      );
    }
    const { innerPageList } = pageConstruction;
    // 加载提示区域
    const loadingTip = (
      <div>

        <div className={routeLoading ? styles.loading : styles.loadingHide}>

          <div className="loading-container" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div className="loading-example" style={{ display: 'flex', flexDirection: 'column', color: '#ccc' }}>
              <div className="align">
                <ActivityIndicator size="large" />
                <span style={{ marginTop: 8, color: '#ccc' }}>正在加载</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
    // 翻页加载提示区域
    const pagiLoadingTip = (
      <div className={pagiLoading ? (pagiPosition === 'center' ? styles.loadCenter : (pagiPosition === 'top' ? styles.loadTop : styles.load)) : styles.loadingHide}>
        <div className="loading-example">
          <div className="align">
            <ActivityIndicator size="large" />
            <span style={{ marginTop: 8, color: '#ccc' }}>正在加载</span>
          </div>
        </div>
      </div>
    );
    // 当前已有页面，与内部页面定义进行匹配及显示
    const routeInner = innerPageList.map((item) => {
      const matchItem = innerPageDefs.def.filter((element) => {
        return element.name === item.pageName;
      })[0];
      // 动态组件显示
      const MComponent = matchItem.component;
      const ckey = `container_${item.pageName}`;
      let key = `${item.pageName}`;
      // 同一页面跳转的时候，会需要动态key值
      if (item.extraKey) {
        key = `${key}_${item.extraKey}`;
      }
      console.log(`key is:${key}`);
      return (<div name={ckey} className={styles.container}>
        <MComponent key={key} modelName={item.modelName} params={item.params} pageName={item.pageName} />
              </div>);
    });
    let pageContent = null;
    // 根据用户是否登录决定显示内容
    if (app.user.id || true) {
      // 本级路由定义,动态显示下级组件
      pageContent = (<div id="rootContainer" ref={this.setPageRef}>{modal}{loadingTip}{ routeInner }
        {loadingTip}{pagiLoadingTip}
        <Footer />
                     </div>);
    } else {
      pageContent = <div>没有权限查看</div>;
    }
    // 弹层时禁止屏幕滑动
    if (attentionModal) {
      console.log('need disable scroll');
      document.body.addEventListener('touchmove', (event) => {
        event.preventDefault();
        event.stopPropagation();
      }, false);
    }
    document.body.addEventListener('touchmove', (event) => {
      const touchMoveDisableFlag = this.getAttr('touchMoveDisableFlag');
      // console.log(`touchMoveDisableFlag is:${touchMoveDisableFlag}`);
      if (touchMoveDisableFlag && touchMoveDisableFlag === 'yes') {
        event.preventDefault();
        event.stopPropagation();
      }
    }, false);
    if (touchMoveDisable) {
      this.setAttr('touchMoveDisableFlag', 'yes');
    } else {
      this.setAttr('touchMoveDisableFlag', 'no');
    }
    return pageContent;
  }
}

HomePage.propTypes = {
  app: PropTypes.object,
  pageConstruction: PropTypes.object,
};

function mapStateToProps({ app, pageConstruction }) {
  return { app, pageConstruction };
}

export default connect(mapStateToProps)(HomePage);
