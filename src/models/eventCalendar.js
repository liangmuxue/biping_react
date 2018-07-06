import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal, getImgString, shortUrl } from '../services/common';
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
    // 请求当前日期，并根据日期请求币事件列表数据
    *getListDataWithTime({ payload }, { put }) {
      const endpoint = 'event/eventTime';
      const res = yield call(queryNormal, {
        endpoint,
      }, st);
      const time = res.time;
      payload.time = time;
      yield put({
        type: 'getListData',
        payload,
      });
    },
    // 请求币事件列表数据
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
    // img的src转base64位
    *getImgString({ payload }, { put, call }) {
      const { srcs } = payload;
      console.log('getImgString data', srcs);
      if (srcs && srcs.length > 0) {
        console.log('getImgString data0', srcs.length);
        for (let i = 0; i < srcs.length; i++) {
          // bpimg.6bey.com这个域名无法跨域，换成原默认域名
          let realSrc = srcs[i].src;
          // let realSrc = srcs[i].src.replace('bpimg.6bey.com', 'biping.oss-cn-beijing.aliyuncs.com');
          realSrc = realSrc.replace('https://biping.oss-cn-beijing.aliyuncs.com', 'http://biping.oss-cn-beijing.aliyuncs.com');
          console.log(`realSrc is:${realSrc}`);
          const data = yield call(getImgString, realSrc);
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
    *closeShare({ payload }, { put }) {
      yield put({
        type: 'closeShareSuc',
        payload,
      });
    },
    // 长链接转短链接
    *shortUrl({ payload }, { call, put }) {
      const endpoint = '/getLong2short';
      const filter = { url: payload };
      const data = yield call(shortUrl, endpoint, filter);
      yield put({
        type: 'shortUrlSuccess',
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
        imgUrl,
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
    shortUrlSuccess(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        shortUrl: { ...data },
      };
    },
  },
});
