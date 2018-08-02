import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal, getImgStringBase, shortUrl } from '../services/common';
import { timeoutCall } from '../utils/asyncControll';
import Immutable from 'seamless-immutable';

/**
* 订阅消息详情
* @author 梁慕学
* @date  18-04-28
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'messageDetail',
  endpoint: 'messageDetail',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
    setup({ dispatch }) {

    },
  },

  effects: {
    // 喜欢
    *msgLike({ payload }, { put, call, select }) {
      console.log('query for msgLike,payload', payload);
      const st = yield select();
      const { messageDetail } = st;
      // 当前的消息对象
      const msgObj = messageDetail.msgDetailData.data;
      const endpoint = 'msgLike';
      const filter = payload;
      let status = 0;
      // 根据原来的喜欢状态，进行变更
      if (msgObj.userlike === 0) {
        msgObj.userlike = 1;
        msgObj.likeCnt += 1;
      } else {
        msgObj.userlike = 0;
        status = 1;
        msgObj.likeCnt -= 1;
      }
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          messageId: payload.messageId,
          flag: true,
          status,
        },
      }, st);
      console.log('messageDetail data', data);
      yield put({
        type: 'msgLikeSuccess',
        payload: msgObj,
      });
    },
    // 不喜欢
    *msgUnLike({ payload }, { put, call, select }) {
      console.log('query for msgUnLike,payload', payload);
      const st = yield select();
      const { messageDetail } = st;
      // 当前的消息对象
      const msgObj = messageDetail.msgDetailData.data;
      const endpoint = 'msgLike';
      const filter = payload;
      let status = 2;
      // 根据原来的不喜欢状态，进行变更
      if (msgObj.userunlike === 1) {
        status = 3;
        msgObj.userunlike = 0;
      } else {
        msgObj.userunlike = 1;
      }
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          messageId: payload.messageId,
          flag: true,
          status,
        },
      }, st);
      console.log('messageDetail data', data);
      yield put({
        type: 'msgLikeSuccess',
        payload: msgObj,
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
          const realSrc = srcs[i].src;
          console.log(`realSrc is:${realSrc}`);
          if (realSrc.length === 0) {
            continue;
          }
          if (realSrc.indexOf('data:image') >= 0) {
            continue;
          }
          const data = yield call(getImgStringBase, realSrc);
          console.log('messageDetail data', data);
          srcs[i].src = `${data}`;
        }
      }
      console.log('after getImgString data', srcs);
      yield put({
        type: 'getImgStringSuccess',
        payload: srcs,
      });
    },
    // 查询单个消息
    *detailQuery({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const {
        messageId, backPath, tagId, tagName,
      } = payload;
      // console.log(`imgDataStr:${imgDataStr}`);
      const st = yield select();
      const endpoint = 'messageDetail';
      const filter = { messageId, ifTest: '3' };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('queryDetail data', data);
      data.backPath = backPath;
      data.tagId = tagId;
      data.tagName = tagName;
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },

    *shareMsg({ payload }, { put, call }) {
      // 禁止屏幕滑动
      // yield put({
      //   type: 'app/touchMoveFlagProc',
      //   payload: {
      //     touchMoveDisable: true,
      //   },
      // });
      yield call(timeoutCall, 50);
      yield put({
        type: 'shareMsgSuc',
        payload,
      });
    },
    *closeShare({ payload }, { put, call }) {
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
    *active({ params }, { put, call }) {
      yield put({
        type: 'detailQuery',
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
      console.log('deactive in msgDetail');
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
    // 获取币种信息
    *coinInfo({ payload }, { put, call, select }) {
      const st = yield select();
      const { messageId } = payload;
      const endpoint = 'event/coinInfo';
      const filter = { id: messageId };
      const resData = yield call(queryNormal, {
        endpoint,
        filter,
      }, st);
      console.log(resData);
      yield put({
        type: 'coinInfoSuccess',
        payload: resData,
      });
    },
    //  请求币事件日历的币价信息
    *coinPrice({ payload }, { put, call, select }) {
      const st = yield select();
      const { messageId } = payload;
      const endpoint = 'event/coinPrice';
      const filter = { id: messageId };
      const resData = yield call(queryNormal, {
        endpoint,
        filter,
      }, st);
      yield put({
        type: 'coinPriceSuccess',
        payload: resData,
      });
    },
    *baseDetail({ payload }, { put, call, select }) {
      const st = yield select();
      const { messageId } = payload;
      const endpoint = 'event/baseDetail';
      const filter = { id: messageId };
      const resData = yield call(queryNormal, {
        endpoint,
        filter,
      }, st);
      yield put({
        type: 'baseDetailSuccess',
        payload: resData,
      });
    },
    *forecast({ payload }, { put, call, select }) {
      const st = yield select();
      const { messageDetail } = st;
      const { baseDetail } = messageDetail;
      console.log('baseDetail=>', baseDetail, st);
      const endpoint = 'event/forecast';
      const resData = yield call(queryNormal, {
        endpoint,
        method: 'POST',
        data: {
          status: payload.status,
          id: payload.id,
        },
      }, st);
      const newContent = baseDetail.data;
      if (resData.response.data) {
        newContent.lookStatus = 'true';
        newContent.upIncrease = resData.response.data.upIncrease;
        newContent.downIncrease = resData.response.data.downIncrease;
      }
      baseDetail.data = newContent;
      yield put({
        type: 'forecastSuccess',
        payload: baseDetail.data,
      });
    },
    // 长链接转短链接
    *shortUrl({ payload, onComplete }, { call, put }) {
      const endpoint = '/getLong2short';
      const filter = { url: payload };
      const data = yield call(shortUrl, endpoint, filter);
      yield call(onComplete, data);
      /* yield put({
        type: 'shortUrlSuccess',
        payload: data,
      }); */
    },
    *getQrcode({ payload, onComplete }, { call, select }) {
      const st = yield select();
      const endpoint = 'getQRCode';
      const filter = { url: payload };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      yield call(onComplete, data);
    },
  },

  reducers: {
    emptyData(state, action) {
      console.log('emptyData in');
      const { msgDetailData } = state;
      if(!msgDetailData){
        return {};
      }
      msgDetailData.data = {};
      return {
        msgDetailData,
      };
    },
    queryDetailSuccess(state, action) {
      console.log('queryDetailSuccess in', action.payload);
      console.log('queryDetailSuccess state', state);
      const {
        response, backPath, tagId, tagName, imgDataStr,
      } = action.payload;
      return {
        ...state,
        imgDataStr,
        msgDetailData: { ...response, tagId, tagName },
        routeActive: false, // 重置routeActive标志，避免重复查询
        backPath,
        curAct: 'queryDetail', // 记录当前操作，页面判断使用
      };
    },
    // 分享给好友
    shareMsgSuc(state, action) {
      const params = action.payload;
      return {
        ...state,
        showMsgShare: true,
        curAct: 'shareMsg',
        ...params,
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
    msgLikeSuccess(state, action) {
      console.log('msgLikeSuccess in', action.payload);
      console.log('msgLikeSuccess state', state);
      return {
        ...state,
        ...action.payload,
        curAct: 'msgLike',
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
    preventTagClick(state, action) {
      return {
        ...state,
        ...action.payload,
        curAct: 'preventTagClick',
      };
    },
    coinInfoSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        coinInfo: { ...response },
      };
    },
    coinPriceSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        coinPrice: { ...response },
      };
    },
    forecastSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        curAct: 'forecast',
      };
    },
    baseDetailSuccess(state, action) {
      const { response } = action.payload;
      return {
        ...state,
        baseDetail: { ...response },
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
