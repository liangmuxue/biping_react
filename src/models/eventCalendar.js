import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';
import Immutable from 'seamless-immutable';
import { Toast } from 'antd-mobile';

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
      const eventTime = eventCalendar.eventTime;
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
      // TODO: loading重复bug，临时解决 - 以后跟数据统一走
      yield put({ type: 'app/hideRouteLoading' });
      Toast.loading('正在加载...');
      const data = yield put({
        type: 'query',
        payload,
      });
    },
    *reminder({ payload }, { call, put, select }) {
      const st = yield select();
      const { eventCalendar } = st;
      console.log('reminder=>', eventCalendar);
      // const { dataSource, list } = eventCalendar;
      const endpoint = 'event/reminder';
      const filter = {};
      const resData = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          id: payload.id,
        },
      }, st);
      const { response } = resData;
      if (!response.data) {
        Toast.info(response.msg);
        return null;
      }
      const newContent = [];
      let recerveStatus = null;
      eventCalendar.list.map((item) => {
        if (item.id == payload.id) {
          recerveStatus = item.recerveStatus;
          if (!recerveStatus || recerveStatus == 'false') {
            recerveStatus = 'true';
          } else {
            recerveStatus = 'false';
          }
          newContent.push(Immutable.merge(item, { recerveStatus }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      });
      eventCalendar.list = newContent;
      yield put({
        type: 'reminderSuccess',
        payload: { eventCalendar, recerveStatus },
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
      const { recerveStatus } = action.payload;
      if (!recerveStatus || recerveStatus == 'false') {
        Toast.info('取消提醒成功');
      } else {
        Toast.info('添加提醒成功');
      }
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
