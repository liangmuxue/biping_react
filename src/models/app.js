import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { query, logout, autoReg, wapReg } from '../services/app';
import * as constants from '../constants/constants';
import footMenus from '../pageComponents/weixin/footer/footerMenuData';
import { config } from '../../config/environment';
import { urlUtils } from '../utils/urlUtil.js';
import { siteAnalysis } from '../utils/siteAnalysis.js';

/**
* 全局数据逻辑
* @author 梁慕学
* @date  18-01-10
*/

const {
  LOCALKEY_SYSUSER, urlParam_sourceType, urlParam_directPage,
  urlParamValue_sourceType, urlParamValue_directPage, urlParam_code,
} = constants.default;
const retryTime = 2;
const { analysisParam } = urlUtils;

// 获取用户登录信息
const getUserLocal = function () {
  let userStr = window.localStorage.getItem(LOCALKEY_SYSUSER);
  let mockUserReal = null;
  const mockUserStr = analysisParam('mockUserStr');
  // 模拟用户
  if (mockUserStr) {
    const userName = analysisParam('userName');
    const passWord = analysisParam('passWord');
    mockUserReal = {
      userName,
      passWord,
    };
  }
  if (mockUserReal) {
    userStr = JSON.stringify(mockUserReal);
  }
  if (userStr) {
    const user = JSON.parse(userStr);
    return user;
  }
  return null;
};

// 获取跳转到的页面详细参数
const getDirectPageParams = function () {
  const state = analysisParam('state');
  if (!state || state === 'STAT') {
    return {};
  }
  // 消息推送或分享的进入
  if (state.indexOf('messageId') >= 0) {
    let messageId = null;
    let fromUser = null;
    let enterMessageCase = 'shareCase';
    if (state.indexOf('fromUser') >= 0) {
      messageId = state.substring(state.indexOf('messageId') + 9, state.indexOf('fromUser'));
      fromUser = state.substring(state.indexOf('fromUser') + 8, state.length);
    } else {
      enterMessageCase = 'pushCase';
      messageId = state.substring(state.indexOf('messageId') + 9, state.length);
    }
    return {
      directPage: 'messageDetail',
      params: {
        enterMessageCase, messageId, fromUser, backPath: 'indexMessage',
      },
    };
  }
  // 币事件日历分享
  if (state.indexOf('directPage') >= 0) {
    const stateStr = state.split('-');
    const directPage = stateStr[0].split('_')[1];
    const fromUser = stateStr[1].split('_')[1];
    const time = stateStr[2].split('_')[1].split('#')[0];
    return { directPage, params: { fromUser, time } };
  }
};

const App = {
  namespace: 'app',

  state: {
    user: {}, // 对应用户信息
    isLoginFail: false, // 登录页面登录失败标志
    isTour: false, // 游客登录标识
    permissions: {
      visit: [],
    },
    directPage: null, // 直接跳转的页面
    directPageParams: {}, // 跳转页面的内部参数
  },


  subscriptions: {
    setup({ dispatch, history }) {
      const { analysisParam } = urlUtils;
      let sourceType = analysisParam(urlParam_sourceType);
      // 来源，包括微信和wap
      if (!sourceType) {
        sourceType = urlParamValue_sourceType.fromWx;
      }
      const code = analysisParam(urlParam_code);
      // 本地用户信息
      const userLocal = getUserLocal();
      // 页面跳转信息
      const directPageData = {};
      if (sourceType === urlParamValue_sourceType.fromWap) {
        // wap站会直接跳转到币事件日历的链接
        const directPage = analysisParam(urlParam_directPage);
        directPageData.directPage = directPage;
      } else {
        const directPageParams = getDirectPageParams();
        Object.assign(directPageData, directPageParams);
      }
      if (!directPageData.directPage) {
        directPageData.directPage = 'indexMessage';
      }
      // 记录跳转信息
      dispatch({ type: 'directPageData', payload: { directPageData } });
      if (userLocal) {
        // 有用户信息，直接登录
        dispatch({ type: 'query', payload: userLocal });
      } else {
        // 没有用户信息，则进行注册
        if (sourceType === urlParamValue_sourceType.fromWap) {
          // wap方式注册
          dispatch({ type: 'wapReg', payload: {} });
        } else {
          // 微信方式注册
          dispatch({ type: 'autoReg', payload: { code } });
        }
      }
    },
  },

  effects: {
    // 每次进入首页时的登录验证
    * query({
      payload,
    }, { call, put }) {
      // 使用同步模式，避免子页面在没有登录的状态下自行加载
      const {
        messageId, sharePaper, fromUser, sourceType, directPage, enterMessageCase,
      } = payload;
      // 判断进入消息详情的场景
      console.log(`enterMessageCase${enterMessageCase}`);
      const ret = yield call(query, payload);
      console.log('ret in app query', ret);
      const { success, response } = ret;
      if (success && response.data && response.flag === 0) {
        const {
          token, name, headUrl, uid, subscribe, isFirstEnter, exchange, event,
        } = response.data;
        const { ifVerb } = response.data;// 是否订阅内容
        const { ifEnterGroup } = response.data;// 是否已经入群
        const systemUser = {
          sourceType, directPage, token, name, headUrl, ifEnterGroup, uid, subscribe, exchange, event,
        };
        // 成功后把用户数据存储到全局
        yield put({
          type: 'sysUserSet',
          payload: {
            systemUser,
          },
        });
        siteAnalysis.setUser(systemUser);
        // 登录成功数据处理
        yield put({ type: 'autoLoginSuc', payload: {} });
      } else if (success && response.flag === 1001) {
        const codenow = response.msg;
        console.log('reconnect autoReg', codenow);
        // 用户信息查询失败，重新进入注册流程
        yield put({ type: 'autoReg', payload: { code: codenow } });
      } else if (success && response.flag === 0 && !response.data) {
        // 用户密码登录失败,重置缓存
        const { mockUser } = config.env;
        if (!mockUser) {
          window.localStorage.clear();
          console.log(`need reset for:${window.location.href}`);
        }
      } else if (!success) {
        console.log('fail999999999');
        const netError = true;
        yield put({ type: 'netError', payload: { netError } });
      }
    },
    // wap方式，获取用户名密码自动注册
    *wapReg({ payload }, { call, put, select }) {
      const ret = yield call(wapReg, payload);
      console.log('ret in app wapReg', ret);
      const { success, response } = ret;
      const { directPage, sourceType } = payload;
      if (success && response.data && response.flag === 0) {
        const systemUser = response.data;
        Object.assign(systemUser, payload);
        console.log('wap reg suc', systemUser);
        // 成功后把用户数据存储到全局
        yield put({
          type: 'sysUserSet',
          payload: {
            systemUser,
          },
        });
        // 进入自动处理
        yield put({ type: 'autoLoginSuc', payload: {} });
      }
    },
    // 通过code获取用户名密码自动注册
    *autoReg({ payload }, { call, put, select }) {
      console.log('goto autoReg', payload);
      const { code } = payload;
      // 没有code，说明未关注
      if (!code) {
        yield put({
          type: 'toTourPage',
          payload: {},
        });
      }
      const ret = yield call(autoReg, payload);
      console.log('ret in app autoReg', ret);
      const { success, response } = ret;
      if (success && response.data && response.flag === 0) {
        const systemUser = response.data;
        console.log('usermessage1111222', systemUser);
        yield put({
          type: 'sysUserSet',
          payload: {
            systemUser,
          },
        });
        // 进入自动处理
        yield put({ type: 'autoLoginSuc', payload: {} });
        // code重复使用，用户信息获取失败
      } else if (success && response.flag === 1003) {
        console.log('failautoReg');
        yield put({ type: 'tourLogin', payload: { attentionModal: true } });
      } else if (!success) {
        console.log('fail net');
        alert('net error');
        const netError = true;
        return null;
        // yield put({ type: 'netError', payload: { netError } });
      }
    },
    // 自动登录成功后返回
    * autoLoginSuc({ payload }, { call, put, select }) {
      const { directPageData } = yield select(({ app }) => app);
      yield put({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: directPageData.directPage,
          noHistory: true,
          params: directPageData.params,
        },
      });
    },
    // 消息详情查看
    *openMessage({ payload }, { call, put, select }) {
      // 游客身份
      yield put({ type: 'tourLogin', payload });
    },
    *noWechat({ payload }, { call, put, select }) {
      console.log('未在微信浏览器打开');
      yield put(routerRedux.push({
        pathname: '/noWechat',
      }));
    },
    // 跳转到游客页面
    * toTourPage({ payload }, { call, put, select }) {
      yield put({ type: 'tourLogin', payload: { attentionModal: true } });
    },
    // ga调用
    *analysis({ payload }, { call, put, select }) {
      const { page, action, opt = {} } = payload;
      console.log('analysis page', page);
      const st = yield select();
      const { app } = st;
      console.log('app in ana', app);
      const { systemUser } = app;
      // 埋点判断是否开通订阅的用户
      let hasSubcribe = 0;
      if (systemUser) {
        opt.uid = systemUser.uid;
        if (systemUser.exchange === 1 || systemUser.event === 1) {
          hasSubcribe = 1;
        }
      }
      opt.hasSubcribe = hasSubcribe;
      siteAnalysis.pushEvent(page, action, opt);
      yield 0;
    },
  },
  reducers: {
    // 记录页面跳转信息
    directPageData(state, { payload }) {
      return {
        ...state,
        ...payload,
        attentionModal: false,
      };
    },
    sysUserSet(state, { payload }) {
      // 清除重连标志
      window.localStorage.setItem('reconnectFlag', 0);
      console.log('sysUserSet in', payload);
      return {
        ...state,
        ...payload,
        attentionModal: false,
      };
    },
    regSuccess(state, action) {
      const { systemUser } = action.payload;
      const userInfo = {
        userName: systemUser.userName,
        passWord: systemUser.passWord,
        uid: systemUser.uid,
      };
      window.localStorage.setItem(LOCALKEY_SYSUSER, JSON.stringify(userInfo));
      return {
        ...state, ...systemUser, isLogin: true, modalVisible: false,
      };
    },
    // 未关注公众号
    tourLogin(state, action) {
      console.log('tourLogin88888', action.payload);
      const systemUser = { token: 'tourLogin' };
      return {
        ...state, isTour: true, modalVisible: false, attentionModal: true, systemUser,
      };
    },
    // 网络连接错误
    netError(state, action) {
      console.log('netError in', action.payload);
      const { netError } = action.payload;
      const systemUser = { token: 'netError' };

      return {
        ...state, isTour: true, modalVisible: false, netError, systemUser,
      };
    },
    netErrorShow(state, action) {
      return {
        ...state, modalVisible: false, netError: true,
      };
    },
    // 关闭关注提示窗口
    closeAttenModal(state, action) {
      console.log('closeAttenModal in');
      return {
        ...state, isTour: false, attentionModal: false,
      };
    },
    // 页面加载提示
    showRouteLoading(state) {
      console.log('showRouteLoading in');
      return {
        ...state, routeLoading: true,
      };
    },
    hideRouteLoading(state) {
      return {
        ...state, routeLoading: false,
      };
    },
    showPagiLoading(state) {
      console.log('showPagiLoading in');
      return {
        ...state, pagiLoading: true,
      };
    },
    hidePagiLoading(state) {
      console.log('hidePagiLoading in');
      return {
        ...state, pagiLoading: false,
      };
    },
    // touchMove标志处理
    touchMoveFlagProc(state, action) {
      const { touchMoveDisable } = action.payload;
      return {
        ...state, touchMoveDisable,
      };
    },
  },

};

export default App;
