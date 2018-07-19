import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

export const MODEL_DEF = {
  modelName: 'coinSearch',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {

  },
  subscriptions: {

  },
  effects: {
    *searchHot({ payload }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'symbolVerb/searchHot';
      const { exchangeId } = payload;
      const filter = { exchangeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      yield put({
        type: 'searchHotSuccess',
        payload: data,
      });
    },
    *searchList({ payload }, { put }) {
      const data = yield put({
        type: 'query',
        payload: {
          filter: payload.filter,
          modelDef: {
            modelName: 'coinSearch',
            endpoint: 'symbolVerb/searchList',
          },
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
      });
    },
  },
  reducers: {
    searchHotSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        hotList: { ...response },
      };
    },
  },
});
