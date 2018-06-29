import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { query } from '../services/common';

export const MODEL_DEF = {
  modelName: 'eventCalendar',
  endpoint: 'event/eventList',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {
    endpoint: MODEL_DEF.endpoint,
  },
  subscriptions: {
  },
  effects: {
    // 获取服务器当前时间
    /* *getTime({ payload }, { call }) {
      console.log('gettime=>', payload);
      return null;
    }, */
  },
  reducers: {
  },
});
