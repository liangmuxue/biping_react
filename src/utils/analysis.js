import ReactGA from 'react-ga';

/**
* 流量统计分析
*/
export const analysis = {
  init() {
    ReactGA.initialize('UA-117280811-2');
  },

  pushEvent(category, action, optLabel, optValue) {
    ReactGA.event({
      category,
      action,
    });
  },
};
