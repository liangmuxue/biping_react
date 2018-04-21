import React from 'react';
import { Switch, Route, Link, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import styles from './routes/weixin/app/index.less';

const { ConnectedRouter } = routerRedux;
export const innerPageDefs = { def: [] };

/*
 * 整体路由定义
 * 创建人：梁慕学
 */
function RouterConfig({ history, app }) {
  // mainpage全局路由，进行全局页面控制
  const LoginPage = dynamic({
    app,
    models: () => [
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/login/login'),
  });
  // mainpage全局路由，进行全局页面控制
  const MainPage = dynamic({
    app,
    models: () => [
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/app/application'),
  });
  const CustomerDynamic = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/customerDynamic'),
    ],
    component: () => import('./routes/weixin/customerDynamic/customerDynamic'),
  });
  const AccountInfo = dynamic({
    app,
    models: () => [
      import('./models/accountInfo'),
    ],
    component: () => import('./routes/weixin/accountInfo/accountInfo'),
  });
  const MesageInfo = dynamic({
    app,
    models: () => [
      // import('./models/accountInfo'),
    ],
    component: () => import('./routes/weixin/messageList/messageList'),
  });
  const IndexMessage = dynamic({
    app,
    models: () => [
      // import('./models/accountInfo'),
    ],
    component: () => import('./routes/weixin/indexMessage/indexMessage'),
  });
  const IndexControl = dynamic({
    app,
    models: () => [
      // import('./models/accountInfo'),
    ],
    component: () => import('./routes/weixin/indexControl/indexControl'),
  });
  const Announcement = dynamic({
    app,
    models: () => [
      // import('./models/accountInfo'),
    ],
    component: () => import('./routes/weixin/announcement/announcement'),
  });
  const bEvents = dynamic({
    app,
    models: () => [
      import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/bEvents/bEvents'),
  });
  const Currency = dynamic({
    app,
    models: () => [
      import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/Currency/Currency'),
  });

  const Myself = dynamic({
    app,
    models: () => [
      import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/myself/myself'),
  });
  const buyHistory = dynamic({
    app,
    models: () => [
      import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/buyHistory/buyHistory'),
  });
  const details = dynamic({
    app,
    models: () => [
      import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/details/details'),
  });

  const HealthInfo = dynamic({
    app,
    models: () => [
      import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/healthInfo/healthInfo'),
  });
  // 定义内部页面，并导出，用于后续动态页面渲染使用
  innerPageDefs.def = innerPageDefs.def.concat([{
    name: 'customerDynamic',
    component: CustomerDynamic,
  }, {
    name: 'accountInfo',
    component: AccountInfo,
  }, {
    name: 'healthInfo',
    component: HealthInfo,
  }]);
  const routeInner = [];
  for (let i = 0; i < innerPageDefs.def.length; i += 1) {
    const item = innerPageDefs.def[i];
    // routeInner.push(<Route exact path={`/mainpage/${item.name}`} component={item.component} />);
  }
  // 路由定义，默认进入子路由mainpage
  return (
    <AppContainer>
      <ConnectedRouter history={history}>
        <div className={styles.normal} name="jjj">
          <Route exact path="/" render={() => (<Redirect to="/mainpage" />)} />
          <Route path="/login" component={LoginPage} />
          <Route path="/mainpage" component={MainPage} />
          <Route path="/messageList" component={MesageInfo} />
          <Route path="/indexMessage" component={IndexMessage} />
          <Route path="/indexControl" component={IndexControl} />
          <Route path="/Announcement" component={Announcement} />
          <Route path="/bEvents" component={bEvents} />
          <Route path="/Currency" component={Currency} />
          <Route path="/myself" component={Myself} />
          <Route path="/buyhistory" component={buyHistory} />
          <Route path="/details" component={details} />

          {routeInner}
        </div>
      </ConnectedRouter>
    </AppContainer>
  );
}

export default RouterConfig;
