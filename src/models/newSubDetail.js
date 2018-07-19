import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

export const MODEL_DEF = {
  modelName: 'newSubDetail',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {

  },
  subscriptions: {

  },
  effects: {
    *subdetail({ payload }, { put, call, select }) {
      const st = yield select();
      const { typeCode, typeId } = payload;
      let endpoint = 'subscribeDetail';
      if (typeCode === 'updown' || typeCode === 'buysell') {
        endpoint = 'transSubscribeExchange';
      }
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      yield put({
        type: 'subdetailSuccess',
        payload: data,
      });
    },
  },
  reducers: {
    subdetailSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        subDetail: response,
      };
    },
  },
});
