import modelExtend from 'dva-model-extend';
import Immutable from 'seamless-immutable';
import { query } from '../services/common';

/**
* 用于分页的通用处理model
* @author 梁慕学
* @date  18-01-11
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
    paginationDef: {
      current: 1, // 当前页码
      pageSize: 20, // 默认每页条目
      totalCount: 0,
      totalPage: 0,
    },
    // 被激活时的处理，子类继承
    onActive() {
      console.log(`onActive in base:${this.namespace}`);
    },
    // 取消激活时的处理，子类继承
    deActive() {
      console.log(`deActive in:${this.namespace}`);
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // 显示加载提示
      yield put({ type: 'showLoading' });
      // 通过filter，endpoint以及state里的pagination,进行通用查询
      const {
        filter, modelDef, list = [], pagination = {},
      } = payload;
      const st = yield select();
      console.log('st is', st);
      console.log(`currentModel is:${modelDef.modelName}`);
      const state = st[modelDef.modelName];
      const { paginationDef } = state;
      // 如果没有初始化，则使用state中的分页定义
      if (!pagination.current) {
        Object.assign(pagination, paginationDef);
      } else {
        // 由于pageSize没有在payload中获取，因此需要自行添加
        pagination.pageSize = paginationDef.pageSize;
      }
      const { endpoint } = modelDef;
      const data = yield call(query, {
        endpoint, filter, list, pagination,
      }, st);
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: data.response,
          modelDef,
          filter,
          list,
        });
      } else {
        throw data;
      }
    },
  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true };
    },
    querySuccess(state, {
      payload, modelDef, filter, list,
    }) {
      // 分页模式，服务端统一返回data及meta属性
      const { data, meta } = payload;
      // 根据服务器返回的分页属性，重置本地分页信息
      const pagination = {
        current: meta.currPage,
        totalCount: meta.totalCount,
        totalPage: meta.totalPage,
      };

      return {
        ...state,
        // 透传当前的filter和基本定义
        filter,
        modelDef,
        // 隐藏加载信息
        loading: false,
        // 返回的data数据
        dataSource: data,
        // 累加所有新的数据，形成全部的数据列表
        list: list.concat(data),
        // 透传分页数据
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },

});


module.exports = {
  model,
  pageModel,
};
