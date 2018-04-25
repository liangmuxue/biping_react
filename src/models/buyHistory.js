import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

/**
* 消息详情处理
* @author 赵永帅
* @date  18-04-23
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'buyHistory',
  endpoint: 'payRecord',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 第一次初始化时进行默认查询
      dispatch({
        type: 'buyHistory',
      });
    },
  },

  effects: {
    // 查询订单列表
    *buyHistory({ payload }, { put }) {
      console.log('query for buyHistory');
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          modelDef: MODEL_DEF,
        },
      });
    },
  },

  reducers: {
  },

});
