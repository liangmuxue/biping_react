import modelExtend from 'dva-model-extend';
import Immutable from 'seamless-immutable';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';
import { Toast } from 'antd-mobile';
import 'antd-mobile/es/icon/style/index.css';

export const MODEL_DEF = {
  modelName: 'coinList',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {

  },
  subscriptions: {

  },
  effects: {
    *queryList({ payload }, { put, select, call }) {
      const { exchangeId, verbId, tabName } = payload;
      console.log('queryList=>', exchangeId, tabName);
      let endpoint = 'symbolVerb/recommendList';
      if (verbId === 730) {
        endpoint = 'quotaVerb/recommendList';
      }
      const filter = { exchangeId, verbId };
      const st = yield select();
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      if (data) {
        console.log('queryList=>', data);
        const { response } = data;
        if (response.data.subscribeCount > 0 && (tabName === '自选' || !tabName)) {
          yield put({
            type: 'userListData',
            payload: {
              filter: { exchangeId, verbId },
            },
          });
        } else {
          const coinName = tabName || response.data.sobmolList[0].coinName;
          yield put({
            type: 'listdata',
            payload: {
              filter: { exchangeId, verbId, coinName },
            },
          });
        }
      }
      yield put({
        type: 'queryListSuccess',
        payload: data,
      });
    },
    *userListData({ payload }, { put }) {
      const { filter } = payload;
      let endpointUrl = 'symbolVerb/userList';
      if (filter.verbId === 730) {
        endpointUrl = 'quotaVerb/userList';
      }
      yield put({
        type: 'query',
        payload: {
          filter: payload.filter,
          modelDef: {
            modelName: 'coinList',
            endpoint: endpointUrl,
          },
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
        ps: 'center',
      });
      yield put({
        type: 'resetList',
      });
    },
    *listdata({ payload }, { put }) {
      const { filter } = payload;
      let endpointUrl = 'symbolVerb/tradeList';
      if (filter.verbId === 730) {
        endpointUrl = 'quotaVerb/tradeList';
      }
      yield put({
        type: 'query',
        payload: {
          filter: payload.filter,
          modelDef: {
            modelName: 'coinList',
            endpoint: endpointUrl,
          },
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
        ps: 'center',
      });
      yield put({
        type: 'resetList',
      });
    },
    // 取消订阅
    *subscribeRemove({ payload, noUser, params }, { put, call, select }) {
      const filter = {};
      const st = yield select();
      const { coinList } = st;
      const { verbId } = params;
      let endpoint = 'symbolVerb/subscribeRemove';
      if (verbId === 730) {
        endpoint = 'quotaVerb/subscribeRemove';
      }
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: payload,
      }, st);
      const newContent = [];
      coinList.list.map(item => {
        if (item.symbolVerbId !== payload.symbolVerbId) {
          newContent.push(Immutable.merge(item));
        } else {
          if (noUser) {
            let subscribeFlag = item.subscribeFlag;
            if (subscribeFlag === 0) {
              subscribeFlag = 1;
            } else {
              subscribeFlag = 0;
            }
            newContent.push(Immutable.merge(item, {subscribeFlag}));
          }
        }
        return item;
      })
      coinList.list = newContent;
      yield put({
        type: 'subscribeRemoveSuccess',
        payload: coinList,
      });
    },
    // 开启微信推送
    *pushAdd({ payload }, { put, call, select }) {
      const filter = {};
      const st = yield select();
      const { coinList } = st;
      const endpoint = 'symbolVerb/pushAdd';
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: payload,
      }, st);
      const newContent = [];
      let pushFlag = null;
      coinList.list.map(item => {
        if (item.symbolVerbId == payload.symbolVerbId) {
          pushFlag = item.pushFlag;
          if (pushFlag == 1) {
            pushFlag = 0;
          } else {
            pushFlag = 1;
          }
          newContent.push(Immutable.merge(item, { pushFlag }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      })
      coinList.list = newContent;
      yield put({
        type: 'pushAddSuccess',
        payload: coinList,
      });
    },
    // 关闭微信推送
    *pushRemove({ payload }, { put, call, select }) {
      const filter = {};
      const st = yield select();
      const { coinList } = st;
      const endpoint = 'symbolVerb/pushRemove';
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: payload,
      }, st);
      const newContent = [];
      let pushFlag = null;
      coinList.list.map(item => {
        if (item.symbolVerbId == payload.symbolVerbId) {
          pushFlag = item.pushFlag;
          if (pushFlag == 1) {
            pushFlag = 0;
          } else {
            pushFlag = 1;
          }
          newContent.push(Immutable.merge(item, { pushFlag }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      })
      coinList.list = newContent;
      yield put({
        type: 'pushRemoveSuccess',
        payload: coinList,
      });
    },
    // 取消订阅按钮
    *showCancel({ payload }, { put, select }) {
      const st = yield select();
      const { coinList } = st;
      const newContent = [];
      let showCancekBtn = null;
      coinList.list.map(item => {
        if (item.symbolVerbId == payload.symbolVerbId) {
          showCancekBtn = item.showCancekBtn;
          showCancekBtn = !showCancekBtn;
          newContent.push(Immutable.merge(item, { showCancekBtn }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      })
      coinList.list = newContent;
      yield put({
        type: 'showCancelSuccess',
        payload: coinList,
      });
    },
  },
  reducers: {
    queryListSuccess(state, action) {
      console.log('queryListSuccess=>', action);
      const { response } = action.payload;
      const { data } = response;
      return {
        ...state,
        coinListHeadData: { ...data },
      };
    },
    subscribeRemoveSuccess(state, action) {
      Toast.info('取消成功', 2);
      return {
        ...state,
      };
    },
    pushAddSuccess(state, action) {
      Toast.info('添加提醒', 2);
      return {
        ...state,
      };
    },
    pushRemoveSuccess(state, action) {
      Toast.info('取消提醒', 2);
      return {
        ...state,
      };
    },
    showCancelSuccess(state, action) {
      return {
        ...state,
      };
    },
    resetList(state) {
      state.list = [];
      return {
        ...state,
      };
    },
  },
});
