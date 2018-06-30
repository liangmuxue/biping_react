import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal, query } from '../services/common';

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
      // console.log('gettime=>', payload);
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
    *getListData({ payload }, { put, call, select}) {
      const st = yield select();
      const endpoint = 'event/eventList';
      const data = yield call(query, {
        endpoint,
        pagination: {
          current: 0, // 当前页码
          pageSize: 10, // 默认每页条目
        },
      }, st);
      console.log('getListData**=>', data);
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
  },
});
