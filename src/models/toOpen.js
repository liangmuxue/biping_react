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
      console.log('query for toOpenDetail', payload);
      const st = yield select();
      const endpoint = 'verbCommodList';
      const { typeId, typeName } = payload;
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('verbCommodList data', data);
      data.response.typeId = typeId;
      data.response.typeName = typeName;
      data.backPath = payload.backPath;
      yield put({
        type: 'toOpenDetailSuccess',
        payload: data,
      });
    },
    // 调取微信支付接口
    *toOpenPayDetail({ payload }, { put, select, call }) {
      console.log('query for toOpenPayDetail', payload);
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

    *active({ params }, { put }) {
      yield put({
        type: 'toOpenDetail',
        payload: params,
      });
    },
  },

  reducers: {
    toOpenDetailSuccess(state, action) {
      console.log('toOpenDetailSuccess in', action.payload);
      const { response, backPath } = action.payload;
      return {
        ...state,
        toOpenData: { ...response },
        backPath,
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
    // 切换支付类别
    payTypeChange(state, action) {
      console.log('payTypeChange val', action.payload);
      const val = action.payload;
      state.toOpenData.data.forEach((item) => {
        if (item.commid === val.commid) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      return {
        ...state,
      };
    },
  },

});
