import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

/**
* 订阅消息列表
* @author 梁慕学
* @date  18-04-28
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'indexMessage',
  endpoint: 'messageList',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
    deActive() {
      console.log('deActive in indexMessage');
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 第一次初始化时进行默认查询
      dispatch({
        type: 'msgQuery',
        payload: {
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
      });
    },
  },

  effects: {
    // 查询消息列表
    *msgQuery({ payload }, { put }) {
      console.log('query for msgQuery', payload);
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload,
      });
    },
    *active({ params }, { put }) {
      console.log('active for indexmessage');
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
      });
    },
  },

  reducers: {
  },

});
