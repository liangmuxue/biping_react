import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { timeoutCall } from '../utils/asyncControll';

/**
* 订阅消息筛选列表
* @author 梁慕学
* @date  18-04-28
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'subTagList',
  endpoint: 'messageList',
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
    *msgQuery({ payload }, { put }) {
      console.log('query for msgQuery', payload);
      const {
        tagId, tagName, backPath, mid,
      } = payload;
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          filter: { tagId, tagName },
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
            messageId: mid || null,
          },
          backPath,
        },
      });
    },
    *active({ params, backArrow }, { call, put }) {
      console.log('effects active in messageList ', params);
      console.log(`effects active in messageList backArrow:${backArrow}`);
      // const { tagId, tagName } = params;
      yield put({
        type: 'app/hideRouteLoading',
      });
      yield put({ type: 'paramsSetOk', payload: { params } });
      // 如果从其他链接过来，则重新查询，如果从返回箭头过来，则不查
      if (!backArrow) {
        yield put({
          type: 'query',
          payload: {
            modelDef: MODEL_DEF,
            pagination: {
              current: 0, // 当前页码
              pageSize: 10, // 默认每页条目
            },
          },
        });
      } else {
        console.log('need hideRouteLoading in actives');
        // 隐藏加载提示
        yield put({ type: 'app/hideRouteLoading' });
      }
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
  },

});
