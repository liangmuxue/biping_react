import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 老人账户数据处理类
* @author 梁慕学
* @date  18-02-10
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
      console.log('query for subscribeQuery');
      const st = yield select();
      const endpoint = 'subscribeQuery';
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
  },

  reducers: {
    subscribeQuerySuccess(state, action) {
      console.log('subscribeQuerySuccess in', action.payload);
      const { response } = action.payload;
      return {
        ...state,
        ...response,
      };
    },
  },

});
