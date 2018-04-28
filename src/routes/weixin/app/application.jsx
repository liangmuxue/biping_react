import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Footer from '../../../pageComponents/weixin/footer/footer';
import Tour from '../../../pageComponents/weixin/loginError/tour.jsx';
import { innerPageDefs } from '../../../wxRouter';
import styles from './index.less';

class HomePage extends Component {
  componentDidMount() {
    console.log('componentDidMount in,innerPageDefs', innerPageDefs);
  }
  render() {
    const {
      match, dispatch, app, pageConstruction,
    } = this.props;
    console.log(`match.url:${match.url}`);
    console.log('app data', app);
    const { isTour } = app;
    if (isTour) {
      return (
        <Tour />
      );
    }
    const { innerPageList } = pageConstruction;
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
          <MComponent key={item.pageName} params={item.params} />
        </div>);
      }
      const style = {
        display: 'none',
      };
      // 注意此处div不能加key，否则会重复渲染
      return (<div name={ckey} style={style} className={styles.container}>
        <MComponent key={item.pageName} params={item.params} />
              </div>);
    });
    let pageContent = null;
    // 根据用户是否登录决定显示内容
    if (app.user.id || true) {
      // 本级路由定义,动态显示下级组件
      pageContent = <div>{ routeInner }<Footer /></div>;
    } else {
      pageContent = <div>没有权限查看</div>;
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
