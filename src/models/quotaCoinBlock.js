import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'quotaCoinBlock',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  effects: {
    *getPoster({ payload }, { call, put, select}) {
      const st = yield select();
      const endpoint = 'userPoster/getPoster';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      
      yield put({
        type: 'getPosterSuccess',
        payload: data,
      })
    },
  },
  reducers: {
    getPosterSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        userInfo: { ...response },
      };
    },
  },
});
