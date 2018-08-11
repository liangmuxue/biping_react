import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'quotaCoinDetail',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  effects: {
    *getDetail({ payload }, { put, call, select }) {
      // const { exchangeId, symbolId } = payload;
      const { symbolId } = payload;
      const st = yield select();
      const endpoint = 'quota/detail';
      // const filter = { exchangeId, symbolId };
      const filter = { symbolId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      yield put({
        type: 'getDetailSuccess',
        payload: data,
      });
    },
  },
  reducers: {
    getDetailSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        quotaCoinDetail: { ...response },
      };
    },
  },
});
