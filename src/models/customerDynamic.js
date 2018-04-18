import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';

/**
* 老人动态处理类
* @author 梁慕学
* @date  18-01-10
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'customerDynamic',
  endpoint: 'customerdynamic',
};

export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
    deActive() {
      console.log('deActive in customerdynamic');
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 第一次初始化时进行默认查询
      dispatch({
        type: 'dyquery',
      });
    },
  },

  effects: {
    *dyquery({ payload, history }, {
      call, put, select, takeLatest,
    }) {
      console.log('query for call');
      // 从全局对象获取当前用户，并查询
      const sysUser = yield select(({ app }) => app.systemUser);
      console.log('sysUser in cd', sysUser);
      if (!sysUser) {
        console.warn('no sysuser!');
        return false;
      }
      const filter = { '[customer][id]': sysUser.customerId };
      // 在这里拼好filter，然后调用通用的query方法
      yield put({
        type: 'query',
        payload: {
          filter,
          modelDef: MODEL_DEF,
        },
      });
      // 使用观察者模式，直到登录后返回系统用户数据才进行查询--取消
      // yield takeLatest('app/sysUserSet', queryFor);
    },
  },

  reducers: {

  },

});
