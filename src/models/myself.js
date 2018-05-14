import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';
import { siteAnalysis } from '../utils/siteAnalysis.js';

/**
* 消息详情处理
* @author 赵永帅
* @date  18-04-23
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'myself',
  endpoint: '',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
  },

  effects: {
    // 查询单个消息
    *detailQuery({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const st = yield select();
      const endpoint = 'userMain';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      console.log('myself data', data);
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },
    // 是否推送消息
    *ifpush({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const st = yield select();
      const endpoint = 'ifpush';
      let ifpush = null;
      ({ ifpush } = payload);
      if (!ifpush) {
        // 取消推送埋点
        yield put({
          type: 'app/analysis',
          payload: {
            page: siteAnalysis.pageConst.MYSELF,
            action: siteAnalysis.actConst.CANCLEPUSH,
          },
        });
      }
      const filter = { ifpush };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('myself data', data);
      yield put({
        type: 'ifpushSuccess',
        payload: data,
      });
    },
  },

  reducers: {
    queryDetailSuccess(state, action) {
      console.log('queryDetailSuccess in', action.payload);
      console.log('queryDetailSuccess state', state);
      const { response } = action.payload;
      return {
        ...state,
        ...response,
      };
    },
    ifpushSuccess(state, action) {
      console.log('ifpushSuccess in', action.payload);
      console.log('ifpushSuccess state', state);
      const { response } = action.payload;
      return {
        ...state,
      };
    },
  },

});
