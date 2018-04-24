import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 消息详情处理
* @author 赵永帅
* @date  18-04-23
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'myself',
  endpoint: '',
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
        type: 'detailQuery',
      });
    },
  },

  effects: {
    // 查询单个消息
    *detailQuery({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const st = yield select();
      const endpoint = 'userMain';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      console.log('myself data', data);
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },
    // 是否推送消息
    *ifpush({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const st = yield select();
      const endpoint = 'ifpush';
      let ifpush = null;
      ({ ifpush } = payload);
      const filter = { ifpush };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('myself data', data);
      yield put({
        type: 'ifpushSuccess',
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
    ifpushSuccess(state, action) {
      console.log('ifpushSuccess in', action.payload);
      console.log('ifpushSuccess state', state);
      const { response } = action.payload;
      return {
        ...state,
      };
    },
  },

});
