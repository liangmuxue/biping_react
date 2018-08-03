import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'quotaCoinSearch',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  effects: {
    *searchList({ payload }, { put }) {
      yield put({
        type: 'query',
        payload: {
          filter: payload.filter,
          modelDef: {
            modelName: 'quotaCoinSearch',
            endpoint: 'quota/searchList',
          },
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
        ps: 'top',
      });
    },
  },
  reducers: {
  },
});
