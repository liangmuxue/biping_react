import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 订阅详情model
* @author 梁慕学
* @date  18-04-25
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'subDetail',
  endpoint: 'subDetail',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
  },

  effects: {
    // 查询订阅详情
    *subscribeDetail({ payload }, { put, select, call }) {
      console.log('query for subscribeDetail', payload);
      const st = yield select();
      console.log('query for subscribeDetail,st', st.subDetail);
      const endpoint = 'subscribeDetail';
      const { typeId } = payload;
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('subscribeQuery data', data);
      yield put({
        type: 'subscribeDetailSuccess',
        payload: data,
      });
    },
    *active({ params }, { put }) {
      yield put({
        type: 'subscribeDetail',
        payload: params,
      });
    },
  },
  reducers: {
    subscribeDetailSuccess(state, action) {
      console.log('subscribeDetailSuccess in', action.payload);
      const { response } = action.payload;
      return {
        ...state,
        subDetailData: { ...response },
        routeActive: false, // 重置routeActive标志，避免重复查询
      };
    },
  },

});
