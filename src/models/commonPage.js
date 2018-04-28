import modelExtend from 'dva-model-extend';
import Immutable from 'seamless-immutable';
import { query } from '../services/common';

/**
* 用于单页的通用处理model
* @author 梁慕学
* @date  18-04-24
*/

const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

const pageModel = modelExtend(model, {
  state: {
    // endpoint: '', // 子类设置
    filter: {}, // 子类设置
    list: Immutable([]), // 用于承载返回的数据列表
  },
  effects: {

  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    active(state, action) {
      console.log(`common active in:${action.pageName}`);
      return { ...state };
    },
    deactive(state, action) {
      console.log(`common deactive in:${action.pageName}`);
      return { ...state };
    },
  },

});


module.exports = {
  model,
  pageModel,
};
