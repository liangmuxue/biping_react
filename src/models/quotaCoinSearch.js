import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

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
    *createCount({ payload }, { call, select }) {
      const { symbolId } = payload;
      const filter = { symbolId };
      const st = yield select();
      const endpoint = 'quota/createCount';
      yield call(queryNormal, {
        endpoint, filter,
      }, st);
    },
    *searchHot({ payload }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'quota/searchHot';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      yield put({
        type: 'searchHotSuccess',
        payload: data,
      });
    },
    *searchHistory({ payload }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'quota/searchHistory';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      yield put({
        type: 'searchHistorySuccess',
        payload: data,
      });
    },
    *searchHistoryRemove({ payload }, { put, call, select }) {
      const st = yield select();
      const filter = {};
      const endpoint = 'quota/searchHistoryRemove';
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {},
      }, st);
      yield put({
        type: 'searchHistoryRemoveSuccess',
        payload: data,
      });
    },
    *searchHistoryAdd( {payload}, { put, call, select} ) {
      const filter = {};
      const st = yield select();
      const endpoint = 'quota/searchHistoryAdd';
      yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: payload,
      }, st);
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
    searchHistorySuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        historyList: { ...response },
      };
    },
    searchHistoryRemoveSuccess(state, action) {
      return {
        ...state,
        historyList: {
          data: {
            list: [],
          },
        },
      };
    },
  },
});
