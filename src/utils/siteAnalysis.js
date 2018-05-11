import ReactGA from 'react-ga';

export const anaDataDefine = {
  pageConst: {
    MAINPAGE: {
      code: 'main',
      zh: '首页面',
    },
  },
  actConst: {
    NOWECHAT: {
      code: 'nowechat',
      zh: '未在微信端打开',
    },
  },
};

/**
* 流量统计分析
*/
export const siteAnalysis = {
  anaDataDefine: {
    pageConst: {
      MAINPAGE: {
        code: 'main',
        zh: '首页面',
      },
    },
    actConst: {
      NOWECHAT: {
        code: 'nowechat',
        zh: '未在微信端打开',
      },
    },
  },

  init() {
    ReactGA.initialize('UA-117280811-2');
  },

  pushEvent(page, action, opt) {
    console.log(`action is:${action}`);
    ReactGA.event({
      category: page,
      action,
      opt,
    });
  },
};
