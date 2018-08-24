import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'yidongDetail',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  effects: {
    *message({ payload }, { put, call, select }) {
      const st = yield select();
      const { quotaId, symbolId } = payload;
      const endpoint = 'quota/message';
      const filter = { quotaId, symbolId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      yield put({
        type: 'messageSuccess',
        payload: data,
      });
    },
  },
  reducers: {
    messageSuccess(state, action) {
      const { response } = action.payload;
      console.log('messageSuccess=>', response);
      return {
        ...state,
        detailData: { ...response },
      };
    },
  },
});
