import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryDetail } from '../services/message';

/**
* 消息详情处理
* @author 梁慕学
* @date  18-04-23
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'messageDetail',
  endpoint: 'messageDetail',
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
        type: 'detailQuery',
      });
    },
  },

  effects: {
    // 查询单个消息
    *detailQuery({ payload }, { put, call }) {
      console.log('query for detailQuery,payload', payload);
      let messageId = null;
      if (!payload) {
        messageId = 111;
      } else {
        messageId = payload.messageId;
      }
      const data = yield call(queryDetail, messageId);
      console.log('queryDetail data', data);
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },
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
