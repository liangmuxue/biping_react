import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 付费成功部分
* @author 梁慕学
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
    queryDetailSuccess(state, action) {
      console.log('queryDetailSuccess in', action.payload);
      console.log('queryDetailSuccess state', state);
      const { response } = action.payload;
      return {
        ...state,
        ...response,
      };
    },
  },

});
