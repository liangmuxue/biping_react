import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { query, logout } from '../services/app';
import * as constants from '../constants/constants';
import footMenus from '../pageComponents/weixin/footer/footerMenuData';

/**
* 全局数据逻辑
* @author 梁慕学
* @date  18-01-10
*/

const { LOCALKEY_SYSUSER } = constants.default;

const App = {
  namespace: 'app',

  state: {
    user: {},
    isLoginFail: false, // 登录页面登录失败标志
    permissions: {
      visit: [],
    },
  },


  subscriptions: {
    setup({ dispatch, history }) {
      // 进入主页面前，先进行身份识别
      const userStr = window.localStorage.getItem(LOCALKEY_SYSUSER);
      return;
      // 如果本地没有登录数据，则进入登录页
    //   if (!userStr) {
    //     dispatch({ type: 'toLoginPage' });
    //     return;
    //   }
    //   const userData = JSON.parse(userStr);
    //   dispatch({ type: 'query', payload: userData });
    },
  },

  effects: {
    // 每次进入首页时的登录验证
    * query({
      payload,
    }, { call, put }) {
      // 使用同步模式，避免子页面在没有登录的状态下自行加载
      console.log('go query', query);
      const ret = yield call(query, payload);
      console.log('ret in app query', ret);
      const { success, response } = ret;
      if (success && response.data && response.data.length > 0) {
        const systemUser = response.data[0];
        // 成功后把用户数据存储到全局
        yield put({
          type: 'sysUserSet',
          payload: {
            systemUser,
          },
        });
        console.log('app query suc');
        // 登录验证通过后,模拟菜单点击第一项，进入主页面
        const menu = footMenus[0];
        yield put({
          type: 'pageConstruction/footMenuChoice',
          payload: { selectedMenu: menu },
        });
      } else {
        // 如果自动登录失败，则进入登录页面
        yield put({ type: 'toLoginPage' });
      }
    },
    // 登录页面登录请求
    * login({
      payload,
    }, { call, put, select }) {
      console.log('login process');
      const ret = yield call(query, payload);
      const { success, response } = ret;
      if (success && response.data && response.data.length > 0) {
        const systemUser = response.data[0];
        // 等成功后，存储到本地
        yield put({
          type: 'loginSuccess',
          payload: {
            systemUser,
          },
        });
        // 成功后把用户数据存储到全局
        yield put({
          type: 'sysUserSet',
          payload: {
            systemUser,
          },
        });
        // 登录后进入主页面
        yield put(routerRedux.push({
          pathname: '/mainpage',
        }));
      } else {
        yield put({ type: 'loginFail' });
      }
    },
    // 跳转到登录页
    * toLoginPage({
      payload,
    }, { call, put, select }) {
      yield put(routerRedux.push({
        pathname: '/login',
      }));
    },
    // 登出操作
    * logout({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload));
      if (data.success) {
        yield put({ type: 'query' });
      } else {
        throw (data);
      }
    },
  },
  reducers: {
    sysUserSet(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    loginSuccess(state, action) {
      const { systemUser } = action.payload;
      const userInfo = {
        loginName: systemUser.loginName,
        password: systemUser.password,
      };
      window.localStorage.setItem(LOCALKEY_SYSUSER, JSON.stringify(userInfo));
      return {
        ...state, ...systemUser, isLogin: true, modalVisible: false,
      };
    },
    loginFail(state, action) {
      return {
        ...state, isLoginFail: true, modalVisible: false,
      };
    },
  },

};

export default App;
