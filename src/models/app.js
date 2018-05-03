import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { query, logout, autoReg } from '../services/app';
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
    isTour: false, // 游客登录标识
    permissions: {
      visit: [],
    },
  },


  subscriptions: {
    setup({ dispatch, history }) {
      // 判断是否在微信浏览器打开
      const ua = navigator.userAgent.toLowerCase();
      // if (ua.match(/MicroMessenger/i) != 'micromessenger') {
      //  dispatch({ type: 'noWechat' });
      //  return;
      // }
      // 进入主页面前，先进行身份识别
      const hrefUrl = window.location.href;
      console.log('7777777777', hrefUrl);
      const userStr = window.localStorage.getItem(LOCALKEY_SYSUSER);
      // const userMoni = { userName: 'j.4i1Y', passWord: '7fcaaa44-5e34-4c61-976d-031e73eeda1c' };
      // const userStr = JSON.stringify(userMoni);
      let code = null;
      // 如果本地没有登录数据，则通过code进入登录页
      if (userStr == null) {
        // 如果存在code
        if (hrefUrl && hrefUrl.indexOf('code') !== -1) {
          code = hrefUrl.substring(hrefUrl.indexOf('code') + 5, hrefUrl.length);
          dispatch({ type: 'autoReg', payload: { code } });
          return;
        } else if (hrefUrl && hrefUrl.indexOf('messageId') !== -1) {
          const messageId = hrefUrl.substring(hrefUrl.indexOf('messageId') + 10, hrefUrl.length);
          console.log('游客身份访问消息详情！！', messageId);
          const backPath = '/messageList';
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageDetail', params: { messageId, backPath } },
          });
          dispatch({ type: 'openMessage' });
          return;
        } else {
          const backPath = '/messageList';
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageList', params: { backPath } },
          });
          dispatch({ type: 'toTourPage' });
          return;
        }
      }
      const userData = JSON.parse(userStr);
      dispatch({ type: 'query', payload: { userData, code } });
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
      if (success && response.data && response.flag === 0) {
        const { token, name, headUrl } = response.data;
        const { ifVerb } = response.data;// 是否订阅内容
        const systemUser = { token, name, headUrl };
        // 成功后把用户数据存储到全局
        yield put({
          type: 'sysUserSet',
          payload: {
            code: payload.code,
            systemUser,
          },
        });
        console.log('app query suc');
        // 登录验证通过后,模拟菜单点击第一项，进入主页面
        const menu = footMenus[0];
        if (ifVerb === 0) {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: menu },
          });
        } else {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: footMenus[1] },
          });
        }
      } else {
        // yield put({ type: 'toLoginPage' });
      }
    },

    // 通过code获取用户名密码自动注册
    *autoReg({ payload }, { call, put, select }) {
      console.log('go autoReg', payload);
      const ret = yield call(autoReg, payload);
      console.log('ret in app autoReg', ret);
      const { success, response } = ret;
      if (success && response.data && response.flag === 0) {
        const systemUser = response.data;
        console.log('usermessage1111222', systemUser);
        // 等成功后，存储到本地
        yield put({
          type: 'regSuccess',
          payload: {
            code: payload.code,
            systemUser,
          },
        });
        yield put({ type: 'query', payload: systemUser });
      } else {
        yield put({ type: 'loginFail' });
      }
    },
    // 消息详情查看
    *openMessage({ payload }, { call, put, select }) {
      // 成功后把数据存储到全局
      yield put({ type: 'tourLogin' });
    },
    *noWechat({ payload }, { call, put, select }) {
      console.log('未在微信浏览器打开');
      yield put(routerRedux.push({
        pathname: '/noWechat',
      }));
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
        console.log('usermessage1111222', systemUser);
        // 等成功后，存储到本地
        yield put({
          type: 'regSuccess',
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
    // 跳转到游客页面
    * toTourPage({ payload }, { call, put, select }) {
      console.log('游客身份登录', payload);
      yield put({ type: 'tourLogin' });
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
      console.log('sysUserSet in', payload);
      return {
        ...state,
        ...payload,
        attentionModal: false,
      };
    },
    regSuccess(state, action) {
      const { systemUser, code } = action.payload;
      const userInfo = {
        userName: systemUser.userName,
        passWord: systemUser.passWord,
      };
      window.localStorage.setItem(LOCALKEY_SYSUSER, JSON.stringify(userInfo));
      return {
        ...state, ...systemUser, code, isLogin: true, modalVisible: false,
      };
    },
    loginFail(state, action) {
      return {
        ...state, isLoginFail: true, modalVisible: false,
      };
    },
    tourLogin(state, action) {
      const systemUser = { token: 'tourLogin' };
      return {
        ...state, isTour: true, modalVisible: false, attentionModal: true, systemUser,
      };
    },
    // 关闭关注提示窗口
    closeAttenModal(state, action) {
      console.log('closeAttenModal in');
      return {
        ...state, isTour: false, attentionModal: false,
      };
    },
  },

};

export default App;
