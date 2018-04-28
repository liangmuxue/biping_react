import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

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
    deActive() {
      console.log('deActive in indexMessage');
    },
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
    // 查询单个消息
    *detailQuery({ payload }, { put, call, select }) {
      console.log('query for detailQuery,payload', payload);
      const { messageId } = payload;
      const st = yield select();
      const endpoint = 'messageDetail';
      const filter = { messageId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('queryDetail data', data);
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },
  },

  reducers: {
    queryDetailSuccess(state, action) {
      console.log('queryDetailSuccess in', action.payload);
      console.log('queryDetailSuccess state', state);
      const { response } = action.payload;
      return {
        ...state,
        msgDetailData: { ...response },
        routeActive: false, // 重置routeActive标志，避免重复查询
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
    active(state, action) {
      console.log('active in msg detail');
      const { params } = action;
      // 设置新加载标志
      let routeActive = false;
      const { data } = state.msgDetailData;
      // 如果typeId不一致，说明是另一个消息，设置重加载标志
      if (!data || params.messageId !== data.typeId) {
        routeActive = true;
      }
      return { ...state, routeActive, params };
    },
  },

});
