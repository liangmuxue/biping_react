import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';

/**
* 订阅消息筛选列表
* @author 梁慕学
* @date  18-04-28
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'messageList',
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
      const { tagId, tagName, backPath } = payload;
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          filter: { tagId, tagName },
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
          backPath,
        },
      });
    },
    *active({ params }, { put }) {
      console.log('effects active in messageList ', params);
      const { tagId, tagName } = params;
      yield put({
        type: 'query',
        payload: {
          filter: { tagId, tagName },
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 6, // 默认每页条目
          },
        },
      });
    },
  },

  reducers: {
  },

});
