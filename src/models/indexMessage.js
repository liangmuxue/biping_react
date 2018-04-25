import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryDetail } from '../services/message';
import { queryNormal } from '../services/common';

/**
* 老人动态处理类
* @author 梁慕学
* @date  18-01-10
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
      });
    },
  },

  effects: {
    // 是否推送消息
    *msgLike({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const st = yield select();
      const endpoint = 'msgLike';
      let msgLike = null;
      ({ msgLike } = payload);
      const filter = { msgLike };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('messageDetail data', data);
      yield put({
        type: 'msgLikeSuccess',
        payload: data,
      });
    },
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
    *detailQuery({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      let messageId = null;
      if (!payload) {
        messageId = 111;
      } else {
        ({ messageId } = payload);
      }
      const st = yield select();
      const endpoint = 'messageDetail';
      const filter = { messageId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
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
