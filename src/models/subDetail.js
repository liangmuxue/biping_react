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
      const { typeId, backPath, typeCode } = payload;
      let endpoint = 'subscribeDetail';
      if (typeCode && typeCode === 'currencies') {
        // 异动币跳转方法
        endpoint = 'transSubscribeDetail';
      }
      if (typeCode === 'updown' || typeCode === 'buysell') {
        endpoint = 'transSubscribeExchange';
      }
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

    // 订阅所有类别异动币
    *subscribeAllTrans({ payload }, { put, select, call }) {
      const st = yield select();
      const endpoint = 'subscribeTransBatch';
      const filter = {};
      const { subDetail } = st;
      const subObj = subDetail.subDetailData.data;
      // 所有小类别id
      let typeIds = '';
      subObj.exchangeArea.map((item) => {
        typeIds = `${item.transVerbId},${typeIds}`;
        return item;
      });

      // 发起订阅请求
      yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          typeIds,
          type: 'exchangeArea',
        },
      }, st);
      // 修改页面状态，把所有数据变为已订阅

      const newContent = [];
      subObj.exchangeArea.map((item) => {
        newContent.push(Immutable.merge(item, { hasSubscribe: 1 }));
        return item;
      });
      subObj.exchangeArea = newContent;
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
      console.log('subDetail.subDetailData.data', subObj);
      const { subItem } = payload;
      let isSub = 0;
      if (subItem.isSub) {
        isSub = subItem.isSub;
      } else if (subItem.hasSubscribe) {
        isSub = subItem.hasSubscribe;
      }
      // 反向选择
      if (isSub === 1) {
        isSub = 0;
      } else {
        isSub = 1;
      }
      // 要遍历的数组
      let checkContent = [];
      // 判断是不是异动币，调用接口不一样
      let endpoint = 'subscribe';
      let typeId = '';
      const newContent = [];
      if (subObj.typeCode && subObj.typeCode === 'currencies') {
        endpoint = 'subscribeTrans';
        checkContent = subObj.exchangeArea;
        typeId = subItem.transVerbId;
        checkContent.map((item) => {
          if (item.transVerbId === typeId) {
            newContent.push(Immutable.merge(item, { hasSubscribe: isSub }));
          } else {
            newContent.push(Immutable.merge(item));
          }
          return item;
        });
      } else {
        checkContent = subObj.content;
        typeId = subItem.typeId;
        checkContent.map((item) => {
          if (item.typeId === typeId) {
            newContent.push(Immutable.merge(item, { isSub }));
          } else {
            newContent.push(Immutable.merge(item));
          }
          return item;
        });
      }
      if (subObj.typeCode && subObj.typeCode === 'currencies') {
        endpoint = 'subscribeTrans';
        subObj.exchangeArea = newContent;
      } else {
        subObj.content = newContent;
      }

      console.log('subDetail.subDetailData.data', subDetail.subDetailData.data);

      const filter = {};
      // 发起订阅请求
      yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          typeId,
          isSub,
        },
      }, st);
      yield put({
        type: 'subscribeSuccess',
        payload: subObj,
      });
    },
    *gainOrLose({ payload }, { put, select, call }) {
      const st = yield select();
      const { subItem } = payload;
      const { itemType } = subItem;
      console.log('subDetail.subDetailData.data', itemType);
      let { hasSubscribe } = subItem;
      // 反向选择
      if (hasSubscribe === 1) {
        hasSubscribe = 0;
      } else {
        hasSubscribe = 1;
      }

      const { subDetail } = st;
      const subObj = subDetail.subDetailData.data;
      const typeId = subItem.transVerbId;
      const filter = {};
      // 发起订阅请求
      yield call(queryNormal, {
        endpoint: 'subscribeTrans',
        filter,
        method: 'POST',
        data: {
          typeId,
          isSub: hasSubscribe,
        },
      }, st);

      // 修改页面状态，把选择数据变为已订阅
      const newContent = [];
      const eachContent = subObj[itemType];
      console.log('eachContent', eachContent);
      eachContent.map((item) => {
        if (item.transVerbId === typeId) {
          newContent.push(Immutable.merge(item, { hasSubscribe }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      });
      subObj[itemType] = newContent;
      yield put({
        type: 'subscribeSuccess',
        payload: subObj,
      });
    },
    // 时间选择提交
    *checkTimeSubmit({ payload }, { put, select, call }) {
      const st = yield select();
      const { subItem } = payload;
      console.log('checkTimeSubmit', subItem);
      // 所有选择时间段id
      let typeIds = '';
      subItem.map((item) => {
        if (item.hasSubscribe === 1) {
          typeIds = `${item.transVerbId},${typeIds}`;
        }
        return item;
      });
      const { subDetail } = st;
      const subObj = subDetail.subDetailData.data;
      const filter = {};
      // 放开屏幕滑动
      yield put({
        type: 'app/touchMoveFlagProc',
        payload: {
          touchMoveDisable: false,
        },
      });

      // 发起订阅请求
      yield call(queryNormal, {
        endpoint: 'subscribeTransBatch',
        filter,
        method: 'POST',
        data: {
          typeIds,
          isSub: 1,
          type: 'timeTypeArea',
        },
      }, st);

      // 修改页面状态，把选择数据变为已订阅
      const newContent = [];
      subObj.timeTypeArea.map((item) => {
        // 如果id在选中的状态
        if (typeIds.indexOf(item.transVerbId) !== -1) {
          newContent.push(Immutable.merge(item, { hasSubscribe: 1 }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      });
      subObj.timeTypeArea = newContent;
      yield put({
        type: 'subscribeSuccess',
        payload: subObj,
      });
    },
    *active({ params }, { put, call }) {
      console.log('subDetailParams', params);
      let preventFlag = '';
      if (params && params.typeId) {
        // 初始化时进行查询
        yield put({
          type: 'subscribeDetail',
          payload: params,
        });
        preventFlag = false;
      } else {
        // 清空本地数据
        yield put({
          type: 'emptyData',
        });
        preventFlag = true;
      }

      // 防止重复点击，延时2秒后重置标志
      yield call(timeoutCall, 2000);
      console.log('preventFlag open', preventFlag);
      yield put({
        type: 'preventTagClick',
        payload: { preventFlag },
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
    *closeShare({ payload }, { put }) {
      // 放开屏幕滑动
      yield put({
        type: 'app/touchMoveFlagProc',
        payload: {
          touchMoveDisable: false,
        },
      });
      yield put({
        type: 'closeShareSuc',
        payload,
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
        chooseHide: false,
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
