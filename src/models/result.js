import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 付费成功部分
* @author 赵永帅
* @date  18-05-12
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'result',
  endpoint: '',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
  },

  effects: {

  },

  reducers: {

  },

});
