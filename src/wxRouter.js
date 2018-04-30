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
  // 消息列表
  const IndexMessage = dynamic({
    app,
    models: () => [
      import('./models/indexMessage'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/message/indexMessage.jsx'),
  });
  // 某大类消息列表
  const MessageList = dynamic({
    app,
    models: () => [
      import('./models/messageList'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/message/messageList'),
  });
  // 消息详情
  const MsgDetail = dynamic({
    app,
    models: () => [
      import('./models/messageDetail'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/message/messageDetail.jsx'),
  });
  // 订阅列表
  const SubList = dynamic({
    app,
    models: () => [
      import('./models/subscribe'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/subscribe/subList'),
  });
  // 订阅详情
  const SubDetail = dynamic({
    app,
    models: () => [
      import('./models/subDetail'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/subscribe/subDetail'),
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
      // import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/bEvents/bEvents'),
  });

  // 我的，个人中心
  const Myself = dynamic({
    app,
    models: () => [
      import('./models/myself'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/myself/myself'),
  });
  const result = dynamic({
    app,
    models: () => [
      // import('./models/healthInfo'),
    ],
    component: () => import('./routes/weixin/result/result'),
  });
  // 订阅包管理
  const ToOpen = dynamic({
    app,
    models: () => [
      import('./models/toOpen'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/toOpen/toOpen'),
  });
  // 购买记录
  const BuyHistory = dynamic({
    app,
    models: () => [
      import('./models/buyHistory'),
      import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/buyHistory/buyHistory'),
  });
  // 微信外登录提醒
  const NoWechat = dynamic({
    app,
    models: () => [
      // import('./models/buyHistory'),
      // import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/errorCheck/noWechat'),
  });
  // 定义内部页面，并导出，用于后续动态页面渲染使用
  innerPageDefs.def = innerPageDefs.def.concat([{
    name: 'indexMessage',
    modelName: 'indexMessage',
    component: IndexMessage,
  }, {
    name: 'messageDetail',
    modelName: 'messageDetail',
    component: MsgDetail,
  }, {
    name: 'messageList',
    modelName: 'messageList',
    component: MessageList,
  }, {
    name: 'subList',
    modelName: 'subscribe',
    component: SubList,
  }, {
    name: 'subDetail',
    modelName: 'subDetail',
    component: SubDetail,
  }, {
    name: 'toOpen',
    modelName: 'toOpen',
    component: ToOpen,
  }, {
    name: 'myself',
    component: Myself,
  }, {
    name: 'buyHistory',
    component: BuyHistory,
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
          <Route path="/messageList" component={MessageList} />
          <Route path="/messageDetail" component={MsgDetail} />
          <Route path="/indexMessage" component={IndexMessage} />
          <Route path="/Announcement" component={Announcement} />
          <Route path="/bEvents" component={bEvents} />
          <Route path="/subList" component={SubList} />
          <Route path="/subDetail" component={SubDetail} />
          <Route path="/myself" component={Myself} />
          <Route path="/buyhistory" component={BuyHistory} />
          <Route path="/result" component={result} />
          <Route path="/toOpen" component={ToOpen} />
          <Route path="/noWechat" component={NoWechat} />


          {routeInner}
        </div>
      </ConnectedRouter>
    </AppContainer>
  );
}

export default RouterConfig;
