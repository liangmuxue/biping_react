import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal, getImgString } from '../services/common';
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
      eventCalendar.list.map(item => {
        if (item.id == payload.id) {
          newContent.push(Immutable.merge(item, { recerveStatus: true }));
        } else {
          newContent.push(Immutable.merge(item));
        }
        return item;
      })
      eventCalendar.list = newContent
      yield put({
        type: 'reminderSuccess',
        payload: eventCalendar,
      });
    },
    // img的src转base64位
    *getImgString({ payload }, { put, call }) {
      const { srcs } = payload;
      console.log('getImgString data', srcs);
      if (srcs && srcs.length > 0) {
        console.log('getImgString data0', srcs.length);
        for (let i = 0; i < srcs.length; i++) {
          // bpimg.6bey.com这个域名无法跨域，换成原默认域名
          const realSrc = srcs[i].src.replace('bpimg.6bey.com', 'biping.oss-cn-beijing.aliyuncs.com');
          console.log(`realSrc is:${realSrc}`);
          const data = yield call(getImgString, realSrc);
          console.log('messageDetail data', data);
          srcs[i].src = `data:image;base64,${data}`;
        }
      }
      console.log('after getImgString data', srcs);
      yield put({
        type: 'getImgStringSuccess',
        payload: srcs,
      });
    },
    *shareMsg({ payload }, { put, call }) {
      yield put({
        type: 'shareMsgSuc',
        payload,
      });
    },
    *closeShare({payload}, { put }) {
      yield put({
        type: 'closeShareSuc',
        payload,
      });
    }
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
      Toast.info('添加提醒成功');
      return {
        ...state,
        ...action.payload,
      };
    },
    getImgStringSuccess(state, action) {
      console.log('getImgStringSuccess in', action.payload);
      console.log('getImgStringSuccess state', state);
      return {
        ...state,
        srcs: action.payload,
        curAct: 'shareClick',
      };
    },
    // 分享给好友
    shareMsgSuc(state, action) {
      const { imgUrl } = action.payload;
      return {
        ...state,
        showMsgShare: true,
        curAct: 'shareMsg',
        imgUrl: imgUrl,
      };
    },
    // 关闭分享弹层
    closeShareSuc(state) {
      return {
        ...state,
        showMsgShare: false,
        curAct: 'closeShare',
      };
    },
  },
});
