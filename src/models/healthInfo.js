import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';

/**
* 老人体检数据处理类
* @author 梁慕学
* @date  18-02-10
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'healthInfo',
  endpoint: '',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
    deActive() {
      console.log('deActive in healthInfo');
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // TODO
    },
  },

  effects: {

  },

  reducers: {

  },

});
