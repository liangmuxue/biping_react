import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';
import { siteAnalysis } from '../utils/siteAnalysis.js';

/**
* 订阅消息详情
* @author 梁慕学
* @date  18-04-28
*/
// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'enterGroup',
  endpoint: ' ',
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
    *shareWechat({ payload }, { put, select, call }) {
      const st = yield select();
      // 禁止屏幕滑动
      yield put({
        type: 'app/touchMoveFlagProc',
        payload: {
          touchMoveDisable: true,
        },
      });
      // 埋点
      yield put({
        type: 'app/analysis',
        payload: {
          page: siteAnalysis.pageConst.ENTERGROUP,
          action: siteAnalysis.actConst.GROUPWECHAT,
        },
      });
      // 返回
      yield put({
        type: 'shareWechatSuccess',
      });
    },
  },

  reducers: {
    queryDetailSuccess(state, action) {
      console.log('queryDetailSuccess in', action.payload);
      console.log('queryDetailSuccess state', state);
      const { response, backPath } = action.payload;
      return {
        ...state,
        msgDetailData: { ...response },
        routeActive: false, // 重置routeActive标志，避免重复查询
        backPath,
      };
    },
    // 分享给好友
    shareWechatSuccess(state, action) {
      console.log(22222, action.payload);
      return {
        ...state,
        showShare: true,
      };
    },
    // 关闭分享弹层
    closeShare(state) {
      return {
        ...state,
        showShare: false,
      };
    },
  },


});
