import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import { query, logout, autoReg } from '../services/app';
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
      // 清理手机缓存
      // localStorage.clear();
      // 开发环境忽略
      const { wxBrowserCheck, mockUser } = config.env;
      // 判断是否在微信浏览器打开
      let match = false;
      if (window.WeixinJSBridge !== 'undefined') {
        match = true;
      }
      console.log(`match is1221212:${match}`);
      if (wxBrowserCheck && !match) {
        dispatch({ type: 'noWechat' });
        dispatch({
          type: 'analysis',
          payload: {
            page: '消息列表页',
            action: '未在微信端打开',
            opt: { type: 'exc' },
          },
        });
        return;
      }
      // 进入主页面前，先进行身份识别
      const hrefUrl = window.location.href;
      console.log('7777777777', hrefUrl);
      const { analysisParam } = urlUtils;
      let userStr = window.localStorage.getItem(LOCALKEY_SYSUSER);
      const mockUserStr = analysisParam('mockUserStr');
      let mockUserReal = null;
      if (mockUserStr) {
        mockUserReal = {
          userName: 'e7c38411-f8f2-4283-a274-5b04c59444d7',
          passWord: 'b2cbacf0-2635-4d42-ad4f-85b63f30f8dc',
        };
      }
      // 开发环境模拟用户
      if (mockUserReal) {
        userStr = JSON.stringify(mockUserReal);
      } else if (mockUser) {
        userStr = JSON.stringify(mockUser);
      }

      // 如果本地没有登录数据，则通过code进入登录页
      if (userStr == null) {
        // 如果存在code
        if (hrefUrl && hrefUrl.indexOf('code') !== -1) {
          const code = analysisParam('code');
          dispatch({ type: 'autoReg', payload: { code } });
        } else if (hrefUrl && hrefUrl.indexOf('messageId') !== -1) {
          const messageId = analysisParam('messageId');
          // const messageId = hrefUrl.substring(hrefUrl.indexOf('messageId') + 10, hrefUrl.length);
          console.log('游客身份访问消息详情！！', messageId);
          const backPath = '/messageList';
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageDetail', params: { messageId, backPath } },
          });
          dispatch({ type: 'openMessage', payload: { attentionModal: true } });
        } else if (hrefUrl && hrefUrl.indexOf('sharePaper') !== -1) {
          const sharePaper = analysisParam('sharePaper');
          // 海报分享查看页面
          if (sharePaper) {
            // 埋点扫码进入中间页
            siteAnalysis.pushEvent(0, '海报进入中间页', 'enter');
            dispatch({
              type: 'pageConstruction/switchToInnerPage',
              payload: { pageName: 'enterGroup', params: { footerHide: true, ifEnterGroup: 0 } },
            });
          }
        } else {
          const backPath = '/messageList';
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageList', params: { backPath } },
          });
          dispatch({ type: 'toTourPage' });
        }
      } else if (userStr != null) {
        const { analysisParam } = urlUtils;
        const code = analysisParam('code');
        const userData = JSON.parse(userStr);
        if (code) {
          userData.code = code;
        }
        const messageId = analysisParam('messageId');
        if (messageId) {
          userData.messageId = messageId;
        }
        const sharePaper = analysisParam('sharePaper');
        if (sharePaper) {
          userData.sharePaper = sharePaper;
        }
        console.log('userData*****^^', userData);
        dispatch({ type: 'query', payload: userData });
      }
    },
  },

  effects: {
    // 每次进入首页时的登录验证
    * query({
      payload,
    }, { call, put }) {
      // 使用同步模式，避免子页面在没有登录的状态下自行加载
      console.log('go query', query);
      const { messageId } = payload;
      const { sharePaper } = payload;
      const ret = yield call(query, payload);
      console.log('ret in app query', ret);
      const { success, response } = ret;
      if (success && response.data && response.flag === 0) {
        const {
          token, name, headUrl, uid, subscribe,
        } = response.data;
        const { ifVerb } = response.data;// 是否订阅内容
        const { ifEnterGroup } = response.data;// 是否已经入群
        const systemUser = {
          token, name, headUrl, ifEnterGroup, uid, subscribe,
        };
        // 海报分享查看页面
        if (sharePaper) {
          yield put({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'enterGroup', params: { footerHide: true, ifEnterGroup } },
          });
          return;
        }
        // 成功后把用户数据存储到全局
        yield put({
          type: 'sysUserSet',
          payload: {
            systemUser,
          },
        });
        // 关注状态
        console.log('app query subscribe', subscribe);
        let attentionModal = false;
        if (subscribe === 0) {
          attentionModal = true;
        }
        if (messageId) {
          yield put({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageDetail', params: { messageId, backPath: 'indexMessage' }, attentionModal },
          });
          return;
        }

        // 登录验证通过后,模拟菜单点击第一项，进入主页面
        const menu = footMenus[0];
        if (ifVerb === 0) {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: menu, isFirst: true },
          });
        } else {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: footMenus[1], isFirst: true },
          });
        }
      } else if (success && response.flag === 1001) {
        const codenow = response.msg;
        console.log('reconnect autoReg', codenow);
        // 用户信息查询失败，重新进入注册流程
        yield put({ type: 'autoReg', payload: { code: codenow } });
      } else {
        console.log('fail999999999');
        yield put({ type: 'tourLogin', payload: { attentionModal: true } });
      }
    },

    // 通过code获取用户名密码自动注册
    *autoReg({ payload }, { call, put, select }) {
      console.log('go autoReg', autoReg);
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
            systemUser,
          },
        });
        yield put({ type: 'query', payload: systemUser });
        // code重复使用，用户信息获取失败
      } else if (success && response.flag === 1003) {
        console.log('failautoReg');
        yield put({ type: 'tourLogin', payload: { attentionModal: true } });
      } else {
        console.log('faillogin');
        yield put({ type: 'tourLogin', payload: { attentionModal: true } });
      }
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
      yield put({ type: 'tourLogin', payload: { attentionModal: true } });
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
    *analysis({ payload }, { call, put, select }) {
      const { page, action, opt } = payload;
      // const { systemUser } = yield select(({ app }) => app);
      // opt.uid = systemUser.id;
      const pageReal = `wx_${page}`;
      siteAnalysis.pushEvent(pageReal, action, opt);
      yield 0;
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
    loginFail(state, action) {
      return {
        ...state, isLoginFail: true, modalVisible: false,
      };
    },
    tourLogin(state, action) {
      console.log('tourLogin88888', action.payload);
      const { attentionModal } = action.payload;
      const systemUser = { token: 'tourLogin' };
      return {
        ...state, isTour: true, modalVisible: false, attentionModal, systemUser,
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
  },

};

export default App;
