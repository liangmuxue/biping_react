import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

export const MODEL_DEF = {
  modelName: 'eventCalendar',
  endpoint: 'event/eventList',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {
    endpoint: MODEL_DEF.endpoint,
  },
  subscriptions: {
  },
  effects: {
    // 获取服务器当前时间
    *getTime({ payload }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'event/eventTime';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      yield put({
        type: 'getTimeSuccess',
        payload: data,
      });
    },
    // 日历确认时间
    *confirmTime({ payload }, { put, select }) {
      const { time } = payload;
      const st = yield select();
      const { eventCalendar } = st;
      var eventTime = eventCalendar.eventTime;
      eventTime.data.time = time;
      yield put({
        type: 'confirmTimeSuccess',
        payload: eventTime,
      });
    },
    // 获取type类型
    *getTypeList({ payload }, { put, call, select }) {
      const st = yield select();
      const endpoint = 'event/typeList';
      const data = yield call(queryNormal, {
        endpoint,
      }, st);
      yield put({
        type: 'getTypeListSuccess',
        payload: data,
      });
    },
    // 分页请求数据
    *getListData({ payload }, { put }) {
      yield put({
        type: 'query',
        payload,
      });
    },
    *reminder({ payload }, { call, put, select }) {
      const st = yield select();
      const { eventCalendar } = st;
      // console.log('reminder=>', eventCalendar);
      // const { dataSource, list } = eventCalendar;
      const endpoint = 'event/reminder';
      const filter = {};
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          id: payload.id,
        },
      }, st);
      /* for (var i in list) {
        if (list[i].id == payload.id) {
          console.log('=============');
          list[i].recerveStatus = 'true';
        }
      } */
      yield put({
        type: 'reminderSuccess',
        payload: data,
      });
    },
  },
  reducers: {
    getTimeSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        eventTime: { ...response },
      };
    },
    confirmTimeSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    getTypeListSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        typeList: { ...response },
      };
    },
    reminderSuccess(state, action) {
      console.log('reminderSuccess=>>>', action.payload);
      // TODO:视图更新
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
