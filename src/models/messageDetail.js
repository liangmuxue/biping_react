import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal, getImgString } from '../services/common';
import { timeoutCall } from '../utils/asyncControll';
import { config } from '../../config/environment';

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
    // 查询单个消息
    *detailQuery({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const {
        messageId, backPath, tagId, tagName,
      } = payload;
      const imgShareUrl = `${config.env.imgShareUrl}/qrcode/${messageId}.png`;
      let imgDataStr = yield call(getImgString, imgShareUrl);
      console.log(`imgDataStr:${imgDataStr}`);
      imgDataStr = `data:image/png;base64,${imgDataStr}`;
      const st = yield select();
      const endpoint = 'messageDetail';
      const filter = { messageId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('queryDetail data', data);
      data.backPath = backPath;
      data.tagId = tagId;
      data.tagName = tagName;
      data.imgDataStr = imgDataStr;
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },

    *shareMsg({ params }, { put, call }) {
      yield call(timeoutCall, 50);
      yield put({
        type: 'shareMsgSuc',
        payload: params,
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
  },

  reducers: {
    emptyData(state, action) {
      console.log('emptyData in');
      const { msgDetailData } = state;
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
      };
    },
    // 分享给好友
    shareMsg(state, action) {
      const params = action.payload;
      const { imgUrl } = params;
      return {
        ...state,
        showMsgShare: true,
        imgUrl,
      };
    },
    // 关闭分享弹层
    closeShare(state) {
      return {
        ...state,
        showMsgShare: false,
      };
    },
    msgLikeSuccess(state, action) {
      console.log('msgLikeSuccess in', action.payload);
      console.log('msgLikeSuccess state', state);
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
