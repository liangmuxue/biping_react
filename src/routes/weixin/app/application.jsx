import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import { withRouter } from 'react-router-dom';
import dva, { connect } from 'dva';
import { Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import Footer from '../../../pageComponents/weixin/footer/footer';
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
        // 注意此处div不能加key，否则会重复渲染
        return <div name={ckey} className={styles.container}><MComponent key={item.pageName} /></div>;
      }
      const style = {
        display: 'none',
      };
      // 注意此处div不能加key，否则会重复渲染
      return <div name={ckey} style={style} className={styles.container}><MComponent key={item.pageName} /></div>;
    });

    // 本级路由定义,动态显示下级组件
    return (
      <div>
        { routeInner }
        <Footer />
      </div>
    );
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
