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
      let filter = {};
      if (typeId) {
        filter = { typeId };
      }
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
    // 时间段选择
    *chooseTime({ payload }, { put, call }) {
      // 禁止屏幕滑动
      yield put({
        type: 'app/touchMoveFlagProc',
        payload: {
          touchMoveDisable: true,
        },
      });
      yield call(timeoutCall, 50);
      yield put({
        type: 'chooseSucc',
        payload,
      });
    },

    // 订阅所有类别
    *subscribeAll({ payload }, { put, select, call }) {
      const st = yield select();
      const { typeId } = payload;
      const endpoint = 'subscribeinfos';
      const filter = {};
      const { subDetail } = st;
      // 发起订阅请求
      yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          typeId,
          open: 1,
        },
      }, st);
      // 修改页面状态，把所有数据变为已订阅
      const subObj = subDetail.subDetailData.data;
      const newContent = [];
      subObj.content.map((item) => {
        newContent.push(Immutable.merge(item, { isSub: 1 }));
        return item;
      });
      subObj.content = newContent;
      yield put({
        type: 'subscribeSuccess',
        payload: subObj,
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
      const { typeId } = params;
      if (typeId) {
        // 初始化时进行查询
        yield put({
          type: 'subscribeDetail',
          payload: params,
        });
      }
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
      // 清空本地数据
      yield put({
        type: 'emptyData',
      });
    },
  },
  reducers: {
    emptyData(state, action) {
      console.log('emptyData in');
      const { subDetailData } = state;
      subDetailData.data = {};
      return {
        subDetailData,
      };
    },
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
    // 弹出时间选择
    chooseSucc(state, action) {
      const params = action.payload;
      return {
        ...state,
        chooseHide: true,
        ...params,
      };
    },
    // 关闭时间选择框
    closeShareSuc(state) {
      console.log('closeShareSuc', state);
      return {
        ...state,
        chooseHide: false,
      };
    },
  },
});
