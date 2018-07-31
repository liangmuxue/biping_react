import React from 'react';
import { Route, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import styles from './routes/weixin/app/index.less';
import { urlUtils } from './utils/urlUtil.js';

const { ConnectedRouter } = routerRedux;
const { analysisParam } = urlUtils;
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
    component: () => import('./routes/weixin/message/messageDetail'),
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
  // 币种列表 - 选择交易对
  const CoinList = dynamic({
    app,
    models: () => [
      import('./models/app.js'),
      import('./models/coinList.js'),
    ],
    component: () => import('./routes/weixin/subscribe/children/coinList.jsx'),
  });
  // 币种搜索
  const CoinSearch = dynamic({
    app,
    models: () => [
      import('./models/app.js'),
      import('./models/coinSearch.js'),
    ],
    component: () => import('./routes/weixin/subscribe/children/coinSearch.jsx'),
  });
  // 订阅详情
  const CoinDetail = dynamic({
    app,
    models: () => [
      import('./models/app.js'),
      import('./models/coinDetail.js'),
    ],
    component: () => import('./routes/weixin/subscribe/children/coinDetail.jsx'),
  });
  // 订阅结果
  const SubscribeResult = dynamic({
    app,
    models: () => [
      import('./models/app.js'),
    ],
    component: () => import('./routes/weixin/subscribe/children/subscribeResult.jsx'),
  })
  const Announcement = dynamic({
    app,
    models: () => [
      // import('./models/accountInfo'),
    ],
    component: () => import('./routes/weixin/announcement/announcement'),
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
  // 分享进群
  const EnterGroup = dynamic({
    app,
    models: () => [
       import('./models/enterGroup'),
      // import('./models/pageConstruction'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/enterGroup/enterGroup'),
  });
  // 付费成功页
  const Result = dynamic({
    app,
    models: () => [
      import('./models/result'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/result/result'),
  });

  // 带标签列表页
  const SubTagList = dynamic({
    app,
    models: () => [
       import('./models/subTagList'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/subTag/subTagList'),
  });
  // 我关注的
  const MyLike = dynamic({
    app,
    models: () => [
       import('./models/myLike'),
      import('./models/app'),
    ],
    component: () => import('./routes/weixin/myLike/myLike'),
  });

  // 事件日历
  const EventCalendar = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/eventCalendar'),
    ],
    component: () => import('./routes/weixin/eventCalendar/eventCalendar'),
  });
  // 诊币
  const QuotaCoin = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/quotaCoin'),
    ],
    component: () => import('./routes/weixin/quotaCoin/quotaCoin'),
  });
  // 诊币详情
  const QuotaCoinDetail = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/quotaCoinDetail'),
    ],
    component: () => import('./routes/weixin/quotaCoin/quotaCoinDetail'),
  });
  // 诊币搜索
  const QuotaCoinSearch = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/quotaCoinSearch'),
    ],
    component: () => import('./routes/weixin/quotaCoin/quotaCoinSearch'),
  })
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
    name: 'coinList',
    modelName: 'coinList',
    component: CoinList,
  }, {
    name: 'coinSearch',
    modelName: 'coinSearch',
    component: CoinSearch,
  }, {
    name: 'coinDetail',
    modelName: 'coinDetail',
    component: CoinDetail,
  }, {
    name: 'subscribeResult',
    modelName: 'subscribeResult',
    component: SubscribeResult,
  }, {
    name: 'toOpen',
    modelName: 'toOpen',
    component: ToOpen,
  }, {
    name: 'myself',
    modelName: 'myself',
    component: Myself,
  }, {
    name: 'buyHistory',
    modelName: 'buyHistory',
    component: BuyHistory,
  }, {
    name: 'enterGroup',
    modelName: 'enterGroup',
    component: EnterGroup,
  }, {
    name: 'result',
    modelName: 'result',
    component: Result,
  }, {
    name: 'subTagList',
    modelName: 'subTagList',
    component: SubTagList,
  }, {
    name: 'myLike',
    modelName: 'myLike',
    component: MyLike,
  }, {
    name: 'eventCalendar',
    modelName: 'eventCalendar',
    component: EventCalendar,
  }, {
    name: 'quotaCoin',
    modelName: 'quotaCoin',
    component: QuotaCoin,
  }, {
    name: 'quotaCoinDetail',
    modelName: 'quotaCoinDetail',
    component: QuotaCoinDetail,
  }, {
    name: 'quotaCoinSearch',
    modelName: 'quotaCoinSearch',
    component: QuotaCoinSearch,
  }]);
  const routeInner = [];
  for (let i = 0; i < innerPageDefs.def.length; i += 1) {
    const item = innerPageDefs.def[i];
    // routeInner.push(<Route exact path={`/mainpage/${item.name}`} component={item.component} />);
  }
  // 透传code参数
  const code = analysisParam('code');
  const messageId = analysisParam('messageId');
  let mainpage = '/mainpage';
  let paramFix = '?any=any';
  if (code) {
    paramFix = `${paramFix}&code=${code}`;
  }
  if (messageId) {
    paramFix = `${paramFix}&messageId=${messageId}`;
  }
  if (paramFix.length > 8) {
    mainpage += paramFix;
  }
  // 路由定义，默认进入子路由mainpage
  return (
    <AppContainer>
      <ConnectedRouter history={history}>
        <div className={styles.normal} name="jjj">
          <Route exact path="/" component={MainPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/mainpage" component={MainPage} />
          <Route path="/messageList" component={MessageList} />
          <Route path="/messageDetail" component={MsgDetail} />
          <Route path="/indexMessage" component={IndexMessage} />
          <Route path="/Announcement" component={Announcement} />
          <Route path="/subList" component={SubList} />
          <Route path="/subDetail" component={SubDetail} />
          <Route path="/coinList" component={CoinList} />
          <Route path="/coinSearch" component={CoinSearch} />
          <Route path="/coinDetail" component={CoinDetail} />
          <Route path="/subscribeResult" component={SubscribeResult} />
          <Route path="/myself" component={Myself} />
          <Route path="/buyhistory" component={BuyHistory} />
          <Route path="/toOpen" component={ToOpen} />
          <Route path="/noWechat" component={NoWechat} />
          <Route path="/enterGroup" component={EnterGroup} />
          <Route path="/result" component={Result} />
          <Route path="/subTagList" component={SubTagList} />
          <Route path="/myLike" component={MyLike} />
          <Route path="/eventCalendar" component={EventCalendar} />
          <Route path="/quotaCoin" component={QuotaCoin} />
          <Route path="/quotaCoinDetail" component={QuotaCoinDetail} />
          <Route path="/quotaCoinSearch" component={QuotaCoinSearch} />
          {routeInner}
        </div>
      </ConnectedRouter>
    </AppContainer>
  );
}

export default RouterConfig;
