import ReactGA from 'react-ga';

/**
* 流量统计分析
*/
export const siteAnalysis = {
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
