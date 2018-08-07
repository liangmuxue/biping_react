import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'quotaCoin',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  effects: {
    *hotList({ payload, onComplete }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'quota/hotList';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      yield call(onComplete, data);
      yield put({
        type: 'hotListSuccess',
        payload: data,
      });
    },
  },
  reducers: {
    hotListSuccess(state, action) {
      const { response } = action.payload;
      console.log('hotListSuccess=>', response, action);
      return {
        ...state,
        hotDetail: { ...response },
      };
    },
  },
});
