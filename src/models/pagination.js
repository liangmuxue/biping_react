import modelExtend from 'dva-model-extend';
import Immutable from 'seamless-immutable';
import { query } from '../services/common';
import { timeoutCall } from '../utils/asyncControll';

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
      current: 0, // 当前页码
      pageSize: 10, // 默认每页条目
      totalCount: 0,
      totalPage: 0,
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // 显示加载提示
      yield put({ type: 'showLoading' });
      yield put({ type: 'app/showPagiLoading' });
      // 通过filter，endpoint以及state里的pagination,进行通用查询
      const {
        filter = {}, modelDef, list = [], pagination = {},
      } = payload;
      const st = yield select();
      console.log('st is', st);
      console.log(`currentModel is:${modelDef.modelName}`);
      const state = st[modelDef.modelName];
      const { paginationDef } = state;
      // 如果没有初始化，则使用state中的分页定义
      if (!pagination.pageSize) {
        Object.assign(pagination, paginationDef);
      } else {
        // 由于pageSize没有在payload中获取，因此需要自行添加
        // pagination.pageSize = paginationDef.pageSize;
      }
      // 拼接请求分页参数
      filter.pageSize = pagination.pageSize;
      filter.pageNum = pagination.current;
      const { endpoint } = modelDef;
      const data = yield call(query, {
        endpoint, filter, list, pagination,
      }, st);
      // 延时后消掉加载提示
      console.log('loadingHide call');
      yield call(timeoutCall, 1000);
      yield put({ type: 'app/hidePagiLoading' });
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: data.response,
          modelDef,
          filter,
          pageSize: pagination.pageSize,
          list,
        });
      } else {
        throw data;
      }
    },
  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true, loadingShow: true };
    },
    querySuccess(state, {
      payload, modelDef, filter, list, pageSize,
    }) {
      // 分页模式，服务端统一返回data及meta属性
      const { data, pager, flag } = payload;
      console.log(`querySuccess flag:${flag}`);
      let pagination = {};
      // 设置是否还有更多内容的标志
      let hasMore = true;
      // 只有flag为0，才有分页信息
      if (parseInt(flag, 0) === 0) {
        // 根据服务器返回的分页属性，重置本地分页信息
        pagination = {
          current: pager.number,
          pageSize,
          totalCount: pager.totalElements,
          totalPage: pager.totalPages,
        };
        if (pager.number >= pager.totalPages - 1) {
          hasMore = false;
        }
      }
      console.log(`rtn hasMore:${hasMore}`);
      return {
        flag,
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
          hasMore,
        },
      };
    },
  },

});


module.exports = {
  model,
  pageModel,
};
