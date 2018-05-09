import modelExtend from 'dva-model-extend';
import Immutable from 'seamless-immutable';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';
import { timeoutCall } from '../utils/asyncControll';

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
      const { typeId, backPath } = payload;
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      data.backPath = backPath;
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
      let { isSub } = subItem;
      // 反向选择
      if (isSub === 1) {
        isSub = 0;
      } else {
        isSub = 1;
      }
      const newContent = [];
      subObj.content.map((item) => {
        if (item.typeId === subItem.typeId) {
          newContent.push(Immutable.merge(item, { isSub }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      });
      subObj.content = newContent;
      const endpoint = 'subscribe';
      const filter = {};
      // 发起订阅请求
      yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          typeId: subItem.typeId,
          isSub,
        },
      }, st);
      yield put({
        type: 'subscribeSuccess',
        payload: subObj,
      });
    },
    *active({ params }, { put, call }) {
      yield put({
        type: 'subscribeDetail',
        payload: params,
      });
      // 防止重复点击，延时2秒后重置标志
      yield call(timeoutCall, 2000);
      console.log('preventFlag open');
      yield put({
        type: 'preventTagClick',
        payload: { preventFlag: false },
      });
    },
    *deactive({ params }, { put }) {
      console.log('deactive in subdetaiol');
      // 防止重复点击，设置标志
      yield put({
        type: 'preventTagClick',
        payload: { preventFlag: true },
      });
    },
  },
  reducers: {
    subscribeDetailSuccess(state, action) {
      console.log('subscribeDetailSuccess in', action.payload);
      const { response, backPath } = action.payload;
      response.backPath = backPath;
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
    preventTagClick(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
