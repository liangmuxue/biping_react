import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { timeoutCall } from '../utils/asyncControll';
import { queryNormal } from '../services/common';

/**
* 订阅消息筛选列表
* @author 梁慕学
* @date  18-04-28
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'subTagList',
  endpoint: 'linklist',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    // 查询消息列表
    *msgQuery({ payload }, { put, call, select }) {
      console.log('query for msgQuery', payload);
      const {
        labelId, backPath, mid, fromLabel,
      } = payload;
      // 请求list
      let messageId = mid;
      // 如果从标签点击过来，不能传messageId
      if (fromLabel) {
        messageId = null;
      }
      yield put({
        type: 'query',
        payload: {
          filter: { messageId, labelId },
          modelDef: MODEL_DEF,
          pagination: {
            pageNum: 0, // 当前页码
            pageSize: 10, // 默认每页条目
            messageId,
          },
          backPath,
        },
      });
      // 请求列表头部
      console.log('query for msgQuery,payload', payload);
      const st = yield select();
      const endpoint = 'attentionInfo';
      const data = yield call(queryNormal, {
        endpoint,
        filter: {
          messageId, labelId, pageSize: 10, pageNum: 0,
        },
      }, st);
      console.log('msgQuery data', data);
      yield put({
        type: 'queryDetailSuccess',
        payload: data,
      });
    },

    *subscribe({ payload }, { put, call, select }) {
      console.log('query for msgUnLike,payload', payload);
      const st = yield select();
      const { subTagList } = st;
      // 当前的关注对象
      console.log('============', subTagList);
      const subTagObj = subTagList.data;
      const endpoint = 'attention';
      const filter = payload;
      // 已经关注则取消关注
      if (subTagObj.attention === true) {
        subTagObj.attention = false;
        subTagObj.count -= 1;
      } else if (subTagObj.attention === false) {
        subTagObj.attention = true;
        subTagObj.count += 1;
      }
      const data = yield call(queryNormal, {
        endpoint,
        filter,
        method: 'POST',
        data: {
          labelId: payload.labelId,
        },
      }, st);
      console.log('subscribeId', data);
      yield put({
        type: 'subscribeSuccess',
        payload: subTagObj,
      });
    },

    *active({ params, backArrow }, { call, put }) {
      console.log('effects active in messageList ', params);
      console.log(`effects active in messageList backArrow:${backArrow}`);
      yield put({
        type: 'msgQuery',
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
  },

  reducers: {
    preventTagClick(state, action) {
      return {
        ...state,
        ...action.payload,
        curAct: 'preventTagClick',
      };
    },
    queryDetailSuccess(state, action) {
      console.log('queryDetailSuccess in', action.payload);
      console.log('queryDetailSuccess state', state);
      const { response } = action.payload;
      return {
        ...state,
        ...response,
      };
    },
    subscribeSuccess(state, action) {
      console.log('subscribeSuccess in', action.payload);
      console.log('subscribeSuccess state', state);
      return {
        ...state,
        ...action.payload,
      };
    },
  },

});
