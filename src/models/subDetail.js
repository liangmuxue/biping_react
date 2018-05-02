import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 订阅详情model
* @author 梁慕学
* @date  18-04-25
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'subDetail',
  endpoint: 'subDetail',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
  },

  effects: {
    // 查询订阅详情
    *subscribeDetail({ payload }, { put, select, call }) {
      console.log('query for subscribeDetail', payload);
      const st = yield select();
      console.log('query for subscribeDetail,st', st.subDetail);
      const endpoint = 'subscribeDetail';
      const { typeId } = payload;
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('subscribeQuery data', data);
      yield put({
        type: 'subscribeDetailSuccess',
        payload: data,
      });
    },
    // 订阅小类别
    *subscribeItem({ payload }, { put, select, call }) {
      const st = yield select();
      const { subDetail } = st;
      // 当前的订阅对象
      const subObj = subDetail.subDetailData.data;
      const { subItem } = payload;
      subObj.content.map((item) => {
        if (item.typeId === subItem.typeId) {
          item.isSub = 1;
        }
        return item;
      });
      const endpoint = 'subscribe';
      const filter = {};
      // 发起订阅请求
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          typeId: subItem.typeId,
          isSub: subItem.isSub,
        },
      }, st);
      yield put({
        type: 'subscribeSuccess',
        payload: subObj,
      });
    },
    *active({ params }, { put }) {
      yield put({
        type: 'subscribeDetail',
        payload: params,
      });
    },
  },
  reducers: {
    subscribeDetailSuccess(state, action) {
      console.log('subscribeDetailSuccess in', action.payload);
      const { response } = action.payload;
      return {
        ...state,
        subDetailData: { ...response },
      };
    },
    subscribeSuccess(state, action) {
      console.log('subscribeSuccess in', action.payload);
      console.log('subscribeSuccess state', state);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
