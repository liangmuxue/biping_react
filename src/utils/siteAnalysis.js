import ReactGA from 'react-ga';

/**
* 流量统计分析
*/
export const siteAnalysis = {
  pageConst: {
    MAINPAGE: {
      code: 'main',
      zh: '首页面',
    },
    MSGDETAIL: {
      code: 'messageDetail',
      zh: '消息详情',
    },
  },
  actConst: {
    NOWECHAT: {
      code: 'nowechat',
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
    MSGLISTTAG: {
      code: 'msgListTag',
      zh: '点击消息类别标签',
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
