import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Modal from 'antd-mobile/lib/modal/index';
import 'antd-mobile/es/modal/style/index.css';
import Footer from '../../../pageComponents/weixin/footer/footer';
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
    console.log('componentDidMount in,innerPageDefs', innerPageDefs);
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
    console.log(`match.url:${match.url}`);
    console.log('app data', app);
    const {
      attentionModal, pagiLoading, routeLoading, netError, touchMoveDisable,
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
          <img src="/images/indexImg/wechat.png" alt="" style={{ width: '5.38rem', height: '5.44rem' }} />
        </div>
      </Modal>);
    } else if (netError) {
      // 阻断提示 网络连接错误
      modal = (<Modal
        visible={netError}
        transparent
        maskClosable={false}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div style={{ overflow: 'hidden', width: '5.38rem', height: '5.44rem' }}>
          <img src="/images/indexImg/netError.png" alt="" style={{ width: '5.38rem', height: '5.44rem' }} />
        </div>
      </Modal>);
    }
    const { innerPageList } = pageConstruction;
    // 加载提示区域
    const loadingTip = (
      <div>
        <div className={routeLoading ? styles.loading : styles.loadingHide}>
          <img src="/images/loading.gif" alt="" style={{ width: '.4rem', height: '.4rem' }} />
        </div>
      </div>
    );
    // 翻页加载提示区域
    const pagiLoadingTip = (
      <div className={pagiLoading ? styles.load : styles.loadingHide}>
        <img src="/images/loading.gif" style={{ width: '.4rem', height: '.4rem' }} />
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
      // 根据标志决定隐藏还是显示
      if (item.isShow) {
        console.log('item show', item);
        // 注意此处div不能加key，否则会重复渲染
        return (<div name={ckey} className={styles.container}>
          <MComponent key={item.pageName} modelName={matchItem.modelName} params={item.params} pageName={item.pageName} />
        </div>);
      }
      const style = {
        display: 'none',
      };
      // 注意此处div不能加key，否则会重复渲染
      return (<div name={ckey} style={style} className={styles.container}>
        <MComponent key={item.pageName} modelName={item.modelName} params={item.params} pageName={item.pageName} />
              </div>);
    });
    let pageContent = null;
    // 根据用户是否登录决定显示内容
    if (app.user.id || true) {
      // 本级路由定义,动态显示下级组件
      pageContent = <div ref={this.setPageRef}>{modal}{loadingTip}{ routeInner }{loadingTip}{pagiLoadingTip}<Footer /></div>;
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
      console.log(`touchMoveDisableFlag is:${touchMoveDisableFlag}`);
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
