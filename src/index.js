// import 'babel-polyfill';

import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import message from 'antd/lib/message';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./wxRouter').default);

// 5. Start
app.start('#root');

// 去除href跳转链接
// function delateHerf() {
//   const aHerf = document.getElementByTagName('a');
//   aHerf.removeAttribute('href');
// }
// window.onload = delateHerf();
