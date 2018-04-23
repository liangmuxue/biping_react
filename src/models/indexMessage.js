import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryDetail } from '../services/message';

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
    // 查询消息列表
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
    // 查询单个消息
    *detailQuery({ payload }, { put, call }) {
      console.log('query for detailQuery,payload', payload);
      const { data } = yield call(queryDetail, payload.messageId);
      console.log('queryDetail data', data);
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },
  },

  reducers: {
    queryDetailSuccess(payload) {
      console.log('queryDetailSuccess,payload', payload);
      return {
        payload,
      };
    },
  },

});
