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
  LOCALKEY_SYSUSER, urlParam_sourceType, urlParam_directPage, urlParamValue_sourceType, urlParamValue_directPage,
} = constants.default;
const retryTime = 2;

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
      const { analysisParam } = urlUtils;
      let sourceType = analysisParam(urlParam_sourceType);
      // 来源，包括微信和wap
      if (!sourceType) {
        sourceType = urlParamValue_sourceType.fromWx;
      }
      let directPage = analysisParam(urlParam_directPage);
      // 进入后的跳转页面，默认为消息列表页
      if (!directPage) {
        directPage = urlParamValue_directPage.indexMessage;
      }
      const reconnectFlag = window.localStorage.getItem('reconnectFlag');
      if (parseInt(reconnectFlag) > retryTime) {
        window.localStorage.setItem('reconnectFlag', 0);
        dispatch({
          type: 'netErrorShow',
        });
        return;
      }
      // 流量分析系统初始化
      siteAnalysis.init();
      // 清理手机缓存
      // localStorage.clear();
      // 开发环境忽略
      const { wxBrowserCheck } = config.env;
      // 判断是否在微信浏览器打开
      let match = false;
      if (window.WeixinJSBridge !== 'undefined') {
        match = true;
      }
      console.log(`match issss:${match}`);
      let userStr = window.localStorage.getItem(LOCALKEY_SYSUSER);
      let uid = null;
      if (userStr) {
        const user = JSON.parse(userStr);
        ({ uid } = user);
      }
      if (wxBrowserCheck && !match) {
        dispatch({ type: 'noWechat' });
        dispatch({
          type: 'analysis',
          payload: {
            page: siteAnalysis.pageConst.MAINPAGE,
            action: siteAnalysis.actConst.NOWECHAT,
            opt: { type: 'exc', uid },
          },
        });
        return;
      }
      // 进入主页面前，先进行身份识别
      const hrefUrl = window.location.href;
      console.log(`hrefUrl iss:${hrefUrl}`);
      const mockUserStr = analysisParam('mockUserStr');
      let mockUserReal = null;
      // 模拟用户
      if (mockUserStr) {
        const userName = analysisParam('userName');
        const passWord = analysisParam('passWord');
        mockUserReal = {
          userName,
          passWord,
        };
      }
      console.log('mockUserReal is', mockUserReal);
      // 开发环境模拟用户
      if (mockUserReal) {
        userStr = JSON.stringify(mockUserReal);
      }
      const directToFunc = function (state) {
        const stateStr = state.split('-');
        const directPage = stateStr[0].split('_')[1];
        const fromUser = stateStr[1].split('_')[1];
        const time = stateStr[2].split('_')[1].split('#')[0];
        // 保存额外信息
        dispatch({
          type: 'extraData',
          payload: { extraData: { directPage, time } },
        });
        // 埋点
        dispatch({
          type: 'analysis',
          payload: {
            page: siteAnalysis.pageConst.EVENTCALENDAR,
            action: siteAnalysis.actConst.PUSHMSGTODETAIL,
            opt: { fromUser },
          },
        });
        return { fromUser, directPage, time };
      };
      // 如果本地没有登录数据，则通过code进入登录页
      if (userStr == null) {
        console.log('nouserStr');
        // 如果是wap页面，则进行自动注册
        if (sourceType === urlParamValue_sourceType.fromWap) {
          dispatch({ type: 'wapReg', payload: { sourceType, directPage } });
          return null;
        }
        // 如果存在code
        if (hrefUrl && hrefUrl.indexOf('code') !== -1) {
          const code = analysisParam('code');
          const state = analysisParam('state');
          let messageId = null;
          let fromUser = null;
          // 进入消息详情的场景(推送，分享)
          let enterMessageCase = null;
          let payData = {};
          if (state && state !== 'STAT') {
            if (state.indexOf('messageId') !== -1 && state.indexOf('fromUser') !== -1) {
              messageId = state.substring(state.indexOf('messageId') + 9, state.indexOf('fromUser'));
              fromUser = state.substring(state.indexOf('fromUser') + 8, state.length);
              enterMessageCase = 'shareCase';
              payData = {
                code, messageId, fromUser, enterMessageCase,
              };
              console.log('messageId', messageId, 'fromUser', fromUser);
            } else if (state.indexOf('messageId') !== -1 && state.indexOf('fromUser') === -1) {
              messageId = state.substring(state.indexOf('messageId') + 9, state.length);
              enterMessageCase = 'pushCase';
              payData = { code, messageId, enterMessageCase };
            } else if (state.indexOf('directPage') !== -1) {
              payData = directToFunc(state);
              payData.code = code;
            }
            // 非关注用户扫码进消息详情埋点
            dispatch({
              type: 'analysis',
              payload: {
                page: siteAnalysis.pageConst.MESSAGEDETAIL,
                action: siteAnalysis.actConst.NOUSERSMTMESSAGEDETAIL,
                opt: { fromUser, enterMessageCase, messageId },
              },
            });
          }
          payData.sourceType = sourceType;
          if (!payData.code) {
            payData.code = code;
          }
          dispatch({ type: 'autoReg', payload: payData });
          dispatch({
            type: 'analysis',
            payload: {
              page: siteAnalysis.pageConst.MAINPAGE,
              action: siteAnalysis.actConst.BROWSE,
              opt: { firstEnter: '1' },
            },
          });
        } else if (hrefUrl && hrefUrl.indexOf('messageId') !== -1) {
          const messageId = analysisParam('messageId');
          const fromUser = analysisParam('fromUser');
          if (messageId === 'list') {
            dispatch({
              type: 'pageConstruction/switchToInnerPage',
              payload: { pageName: 'indexMessage', noHistory: true },
            });
            dispatch({ type: 'openMessage', payload: { attentionModal: true } });
            return;
          }
          // const messageId = hrefUrl.substring(hrefUrl.indexOf('messageId') + 10, hrefUrl.length);
          console.log('游客身份访问消息详情！！', messageId);
          const backPath = '/messageList';
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageDetail', params: { messageId, backPath } },
          });
          dispatch({ type: 'openMessage', payload: { attentionModal: true } });
          // 非关注用户扫码进消息详情埋点
          dispatch({
            type: 'analysis',
            payload: {
              page: siteAnalysis.pageConst.MESSAGEDETAIL,
              action: siteAnalysis.actConst.NOUSERSMTMESSAGEDETAIL,
              opt: { fromUser, messageId },
            },
          });
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
            // 非关注用户扫码进中间页
            dispatch({
              type: 'analysis',
              payload: {
                page: siteAnalysis.pageConst.ENTERGROUP,
                action: siteAnalysis.actConst.NOUSERTOMIDDLE,
              },
            });
          }
        } else if (hrefUrl && hrefUrl.indexOf('directPage') !== -1) {
          const directPage = analysisParam('directPage');
          // 币事件日历进入中间页
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'enterGroup', params: { footerHide: true, ifEnterGroup: 0 } },
          });
          // 埋点扫码进入中间页
          siteAnalysis.pushEvent(0, '币事件日历进入中间页', 'enter');
          // 非关注用户扫码进中间页
          dispatch({
            type: 'analysis',
            payload: {
              page: siteAnalysis.pageConst.ENTERGROUP,
              action: siteAnalysis.actConst.NOUSERTOMIDDLE,
            },
          });
        } else {
          const backPath = '/messageList';
          dispatch({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageList', params: { backPath } },
          });
          dispatch({ type: 'toTourPage' });
        }
      } else if (userStr != null) {
        console.log('userStr');
        const { analysisParam } = urlUtils;
        const code = analysisParam('code');
        const state = analysisParam('state');
        const userData = JSON.parse(userStr);
        console.log('state', state);
        if (code) {
          userData.code = code;
        }
        let messageId = null;
        // 从哪个用户分享过来
        let fromUser = null;
        // 进入消息详情的场景(推送，分享)
        let enterMessageCase = null;
        if (state && state !== 'STAT') {
          if (state.indexOf('messageId') !== -1 && state.indexOf('fromUser') !== -1) {
            messageId = state.substring(state.indexOf('messageId') + 9, state.indexOf('fromUser'));
            fromUser = state.substring(state.indexOf('fromUser') + 8, state.length);
            enterMessageCase = 'shareCase';
            console.log('messageId', messageId, 'fromUser', fromUser);
          } else if (state.indexOf('messageId') !== -1 && state.indexOf('fromUser') === -1) {
            messageId = state.substring(state.indexOf('messageId') + 9, state.length);
            enterMessageCase = 'pushCase';
          } else if (state.indexOf('directPage') !== -1) {
            const payData = directToFunc(state);
            userData.fromUser = payData.fromUser;
            userData.directPage = payData.directPage;
            userData.time = payData.time;
          }
        } else {
          messageId = analysisParam('messageId');
          fromUser = analysisParam('fromUser');
        }
        if (enterMessageCase) {
          userData.enterMessageCase = enterMessageCase;
        }
        if (messageId) {
          userData.messageId = messageId;
        }
        // 从哪个用户分享的海报进来
        if (fromUser && !userData.fromUser) {
          userData.fromUser = fromUser;
        }
        const sharePaper = analysisParam('sharePaper');
        if (sharePaper) {
          userData.sharePaper = sharePaper;
        }
        userData.sourceType = sourceType;
        if (!userData.directPage) {
          userData.directPage = directPage;
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
        // 群裂变开通权限用户
        if (isFirstEnter && isFirstEnter === 'yes') {
          yield put({
            type: 'analysis',
            payload: {
              page: siteAnalysis.pageConst.INDEXMESSAGE,
              action: siteAnalysis.actConst.GROUPTOUSER,
            },
          });
        }
        // 海报分享查看页面
        if (sharePaper) {
          yield put({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'enterGroup', params: { footerHide: true, ifEnterGroup } },
          });
          // 关注用户扫码进中间页
          yield put({
            type: 'analysis',
            payload: {
              page: siteAnalysis.pageConst.ENTERGROUP,
              action: siteAnalysis.actConst.USERTOMIDDLE,
            },
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
        siteAnalysis.setUser(systemUser);
        if (sourceType === urlParamValue_sourceType.fromWap) {
          // 如果是wap访问，则直接跳转到对应页面
          yield put({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: directPage, noHistory: true, params: { footerHide: true } },
          });
          return;
        }
        // 发送打开主页的埋点
        yield put({
          type: 'analysis',
          payload: {
            page: siteAnalysis.pageConst.MAINPAGE,
            action: siteAnalysis.actConst.BROWSE,
          },
        });
        // 关注状态
        console.log('app query subscribe', subscribe);
        if (subscribe === 0) {
          yield put({ type: 'tourLogin', payload: { attentionModal: true } });
        }
        if (messageId && messageId === 'list') {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: footMenus[0], isFirst: true },
          });
          return;
        }
        if (messageId) {
          yield put({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'messageDetail', params: { messageId, backPath: 'indexMessage' } },
          });
          if (subscribe === 0) {
            // 非关注用户扫码进消息详情埋点
            yield put({
              type: 'analysis',
              payload: {
                page: siteAnalysis.pageConst.MESSAGEDETAIL,
                action: siteAnalysis.actConst.NOUSERSMTMESSAGEDETAIL,
                opt: { fromUser, enterMessageCase, messageId },
              },
            });
          } else if (subscribe === 1) {
            // 关注用户扫码进消息详情埋点
            let actionReal = siteAnalysis.actConst.USERSMTMESSAGEDETAIL;
            if (!fromUser) {
              actionReal = siteAnalysis.actConst.PUSHMSGTODETAIL;
            }
            yield put({
              type: 'analysis',
              payload: {
                page: siteAnalysis.pageConst.MESSAGEDETAIL,
                action: actionReal,
                opt: { fromUser, enterMessageCase, messageId },
              },
            });
          }
          return;
        }
        // 如果是直接进入，则跳转到对应页面
        if (directPage) {
          console.log(`go directPage:${directPage}`);
          const matchFooterMenu = footMenus.filter((element) => {
            return element.code === directPage;
          })[0];
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: matchFooterMenu, isFirst: true },
          });
          return;
        }
        // 登录验证通过后,模拟菜单点击第一项，进入主页面
        const menu = footMenus[0];
        if (ifVerb === 0) {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: menu, isFirst: true, noHistory: true },
          });
        } else {
          yield put({
            type: 'pageConstruction/footMenuChoice',
            payload: { selectedMenu: footMenus[2], isFirst: true, noHistory: true },
          });
        }
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
          // const curHref = window.location.href;
          // window.location.href = curHref;
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
        // 等成功后，存储到本地
        yield put({
          type: 'regSuccess',
          payload: {
            sourceType,
            directPage,
            systemUser,
          },
        });
        // 跳转到目标页面
        yield put({
          type: 'pageConstruction/switchToInnerPage',
          payload: { pageName: directPage, noHistory: true, params: { footerHide: true } },
        });
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
            systemUser,
          },
        });
        // 登录成功后，打开首页消息列表页
        yield put({ type: 'query', payload: systemUser });
        // code重复使用，用户信息获取失败
      } else if (success && response.flag === 1003) {
        console.log('failautoReg');
        yield put({ type: 'tourLogin', payload: { attentionModal: true } });
      } else if (!success) {
        console.log('fail999999999');
        const netError = true;
        yield put({ type: 'netError', payload: { netError } });
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
    extraData(state, { payload }) {
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
    loginFail(state, action) {
      return {
        ...state, isLoginFail: true, modalVisible: false,
      };
    },
    // 未关注公众号
    tourLogin(state, action) {
      console.log('tourLogin88888', action.payload);
      const { attentionModal } = action.payload;
      const systemUser = { token: 'tourLogin' };
      return {
        ...state, isTour: true, modalVisible: false, attentionModal, systemUser,
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
