import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

/**
* 订阅消息列表
* @author 梁慕学
* @date  18-04-28
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'indexMessage',
  endpoint: 'messageList',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 第一次初始化时进行默认查询
      dispatch({
        type: 'msgQuery',
        payload: {
          modelDef: MODEL_DEF,
          pagination: {
            current: 0, // 当前页码
            pageSize: 10, // 默认每页条目
          },
        },
      });
    },
  },

  effects: {
    // 查询消息列表
    *msgQuery({ payload }, { put }) {
      console.log('query for msgQuery', payload);
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload,
      });
    },
    *active({ backArrow }, { put }) {
      console.log(`active for indexmessage,backArrow:${backArrow}`);
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
        console.log('need hideRouteLoading in active');
        // 隐藏加载提示
        yield put({ type: 'app/hideRouteLoading' });
      }
    },
  },

  reducers: {
    deactiveOk(state) {
      console.log('deactive in indexmessage', state);
      const { flag } = state;
      return {
        ...state,
        flag,
      };
    },
  },

});
