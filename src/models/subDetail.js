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
    active(state, action) {
      console.log('active in sub detail');
      const { params } = action;
      // 设置新加载标志
      let routeActive = false;
      const { data } = state.subDetailData;
      // 如果typeId不一致，说明是另一个消息，设置重加载标志
      if (!data || params.typeId !== data.typeId) {
        routeActive = true;
      }
      return { ...state, routeActive, params };
    },
  },

});
