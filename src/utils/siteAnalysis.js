import ReactGA from 'react-ga';

/**
* 流量统计分析
*/
export const siteAnalysis = {
  pageConst: {
    MAINPAGE: {
      code: 'mainpage',
      zh: '首页面',
    },
    MESSAGELIST: {
      code: 'messageList',
      zh: '某大类消息列表',
    },
    MESSAGEDETAIL: {
      code: 'messageDetail',
      zh: '消息详情',
    },
    INDEXMESSAGE: {
      code: 'indexMessage',
      zh: '消息列表',
    },
    SUBLIST: {
      code: 'subList',
      zh: '订阅列表',
    },
    SUBDETAIL: {
      code: 'subDetail',
      zh: '订阅详情',
    },
    MYSELF: {
      code: 'myself',
      zh: '个人中心',
    },
    BUYHISTORY: {
      code: 'buyHistory',
      zh: '购买记录',
    },
    TOOPEN: {
      code: 'toOpen',
      zh: '开通订阅',
    },
    ENTERGROUP: {
      code: 'enterGroup',
      zh: '入群中间页',
    },
    RESULT: {
      code: 'result',
      zh: '购买成功',
    },
  },
  actConst: {
    NOWECHAT: {
      code: 'noWechat',
      zh: '未在微信端打开',
    },
    NOOPEN: {
      code: 'msgNoOpen',
      zh: '未订阅大类别',
    },
    BROWSE: {
      code: 'browse',
      zh: '正常打开',
    },
    BACK: {
      code: 'back',
      zh: '返回页面',
    },
    USERSMTMESSAGEDETAIL: {
      code: 'usersmtmessagedetail',
      zh: '用户扫码进入消息详情',
    },
    NOUSERSMTMESSAGEDETAIL: {
      code: 'nousersmtmessagedetail',
      zh: '非用户扫码进入消息详情',
    },
    GROUPTOUSER: {
      code: 'grouptouser',
      zh: '群用户转化',
    },
  },

  init() {
    ReactGA.initialize('UA-117280811-2');
  },

  pushEvent(pageDef, actionDef, opt) {
    ReactGA.event({
      category: pageDef.code,
      action: actionDef.code,
      opt,
    });
  },
};
