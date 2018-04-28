import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 消息详情处理
* @author 赵永帅
* @date  18-04-25
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'toOpen',
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
    // 查询订阅包
    *toOpenDetail({ payload }, { put, select, call }) {
      console.log('query for verbCommodList', payload);
      const st = yield select();
      const endpoint = 'verbCommodList';
      const { typeId } = payload;
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('verbCommodList data', data);
      data.response.typeId = typeId;
      yield put({
        type: 'toOpenDetailSuccess',
        payload: data,
      });
    },
    // 调取微信支付接口
    *toOpenPayDetail({ payload }, { put, select, call }) {
      console.log('query for verbCommodList', payload);
      const st = yield select();
      const filter = payload;
      const endpoint = 'subscribeverb';
      const { verbId, commoId } = payload;
      const data = { verbId, commoId };
      const dataReturn = yield call(queryNormal, {
        endpoint, filter, data, method: 'POST',
      }, st);
      console.log('verbCommodList data', data);
      yield put({
        type: 'toOpenPayDetailSuccess',
        payload: dataReturn,
      });
    },
  },

  reducers: {
    toOpenDetailSuccess(state, action) {
      console.log('toOpenDetailSuccess in', action.payload);
      const { response } = action.payload;
      return {
        ...state,
        ...response,
        toOpenData: { ...response },
      };
    },
    toOpenPayDetailSuccess(state, action) {
      console.log('toOpenDetailSuccess in', action.payload);
      const { response } = action.payload;
      return {
        ...state,
        ...response,
        routeActive: false, // 重置routeActive标志，避免重复查询
      };
    },
    active(state, action) {
      console.log('active in open detail');
      const { params } = action;
      // 设置新加载标志
      let routeActive = false;
      const { data } = state.toOpenData;
      // 如果typeId不一致，说明是另一个消息，设置重加载标志
      if (!data || params.typeId !== data.typeId) {
        routeActive = true;
      }
      return { ...state, routeActive, params };
    },
  },

});
