import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 订阅列表对应model
* @author 梁慕学
* @date  18-04-10
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'subscribe',
  endpoint: 'subscribeList',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
    onActive({ dispatch }) {
      console.log('onActive in subscribe');
      // 进入时查询订阅信息
      dispatch({
        type: 'subscribeQuery',
      });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'subscribeQuery',
      });
    },
  },

  effects: {
    // 查询订阅信息
    *subscribeQuery({ payload }, { put, select, call }) {
      console.log('query for subscribeQuery', payload);
      const st = yield select();
      const endpoint = 'subscribeList';
      const filter = { };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('subscribeQuery data', data);
      yield put({
        type: 'subscribeQuerySuccess',
        payload: data,
      });
    },
    *active({ }, { put }) {
      yield put({
        type: 'subscribeQuery',
        payload: {},
      });
    },
  },
  reducers: {
    subscribeQuerySuccess(state, action) {
      console.log('subscribeQuerySuccess in', action.payload);
      const { response } = action.payload;
      return {
        ...state,
        subListData: { ...response },
        busiFlag: 'subscribeQuerySuccess',
      };
    },
  },

});
