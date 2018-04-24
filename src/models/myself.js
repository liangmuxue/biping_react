import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryDetail } from '../services/myselfservice';

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

export default modelExtend({
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
    deActive() {
      console.log('deActive in indexMessage');
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 第一次初始化时进行默认查询
      dispatch({
        type: 'detailQuery',
      });
    },
  },

  effects: {
    // 查询单个消息
    *detailQuery({ payload }, { put, call }) {
      console.log('query for detailQuery,payload', payload);
      const data = yield call(queryDetail);
      console.log('queryDetail data', data);
      yield put({
        type: 'queryDetailSuccess',
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
  },

});
