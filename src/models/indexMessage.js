import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
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
    // 喜欢
    *msgLike({ payload }, { put, call, select }) {
      console.log('query for msgLike,payload', payload);
      const st = yield select();
      const { indexMessage } = st;
      // 当前的消息对象
      const msgObj = indexMessage.data;
      const endpoint = 'msgLike';
      const filter = payload;
      let status = 0;
      // 根据原来的喜欢状态，进行变更
      if (msgObj.userlike === 0) {
        msgObj.userlike = 1;
        msgObj.likeCnt += 1;
      } else {
        msgObj.userlike = 0;
        status = 1;
        msgObj.likeCnt -= 1;
      }
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          messageId: payload.messageId,
          flag: true,
          status,
        },
      }, st);
      console.log('messageDetail data', data);
      yield put({
        type: 'msgLikeSuccess',
        payload: msgObj,
      });
    },
    // 查询消息列表
    *msgQuery({ payload }, { put }) {
      console.log('query for msgQuery', put);
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
      const { messageId } = payload;
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
    msgLikeSuccess(state, action) {
      console.log('msgLikeSuccess in', action.payload);
      console.log('msgLikeSuccess state', state);
      return {
        ...state,
        ...action.payload,
      };
    },
  },

});
