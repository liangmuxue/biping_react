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
  },

  effects: {
    // 查询订单列表
    *buyHistory({ payload }, { put }) {
      console.log('query for msgQuery');
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 6, // 默认每页条目
          },
        },
      });
    },
    // 返回时加载
    *active({ payload }, { put }) {
      console.log('query for msgQuery', payload);
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 6, // 默认每页条目
          },
        },
      });
    },
  },

  reducers: {
  },

});
