import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';

/**
* 老人动态处理类
* @author 梁慕学
* @date  18-01-10
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'message',
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
      });
    },
  },

  effects: {
    *msgQuery({ payload }, { put }) {
      console.log('query for msgQuery');
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
