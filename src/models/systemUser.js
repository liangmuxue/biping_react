import { doLogin, doLogup } from '../services/systemUser';
import { getCurrentUser, fetchIsAuth } from '../utils/webSessionUtils';

export default {

  namespace: 'systemUser',

  state: {
    username: '',
    isLogin: false,
    modalVisible: false,
    authToken: '',
    pathname: '/',
    logupModalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == '/') {
          // 权限验证通过
          fetchIsAuth((isAuth) => {
            if (isAuth) {
              dispatch({
                type: 'loginSuccess',
                payload: getCurrentUser(),
              });
            }
          });
        }
      });
    },
  },

  effects: {
    *doLogin({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(doLogin, payload);
      if (data && data.success) {
        // 登录成功
        yield put({
          type: 'loginSuccess',
          payload: data.userInfo,
        });
      }
    },
    *doLogup({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(doLogup, payload);
      if (data && data.success) {
        // 注册成功
        yield put({
          type: 'logupSuccess',
          payload: data.userInfo,
        });
      }
    },
  },

  reducers: {
    logout(state, action) {
      const { sessionStorage } = window;
      sessionStorage.setItem('userInfo', JSON.stringify({}));
      return { ...state, user: null, isLogin: false };
    },
    login(state, action) {
      return { ...state, modalVisible: true };
    },
    logup(state, action) {
      return { ...state, logupModalVisible: true };
    },
    loginSuccess(state, action) {
      const userInfo = action.payload;
      const { sessionStorage } = window;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return {
        ...state, ...userInfo, isLogin: true, modalVisible: false,
      };
    },
    logupSuccess(state, action) {
      const userInfo = action.payload;
      const { sessionStorage } = window;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return {
        ...state, ...userInfo, isLogin: true, logupModalVisible: false,
      };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    hideLogupModal(state) {
      return { ...state, logupModalVisible: false };
    },
  },

};
