import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

export const MODEL_DEF = {
  modelName: 'coinDetail',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {

  },
  subscriptions: {

  },
  effects: {
    *detail({ payload }, { put, call, select }) {
      const st = yield select();
      const { exchangeId, verbId, symbolId } = payload;
      const filter = { exchangeId, verbId, symbolId };
      const endpoint = 'symbolVerb/detail';
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      yield put({
        type: 'detailSuccess',
        payload: data,
      });
    },
    *subscribeAdd({ payload, params }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'symbolVerb/subscribeAdd';
      const filter = {};
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: payload,
      }, st);
      yield put({
        type: 'subscribeAddSuccess',
        payload: data,
      });
      yield put({
        type: 'pageConstruction/switchToInnerPage',
        payload: params,
      });
    },
  },
  reducers: {
    detailSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        detailData: { ...response },
      };
    },
    subscribeAddSuccess(state, action) {
      return {
        ...state,
      };
    },
  },
});
