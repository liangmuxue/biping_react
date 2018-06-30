import { Route, routerRedux } from 'dva/router';
import footMenus from '../pageComponents/weixin/footer/footerMenuData';
import { innerPageDefs } from '../wxRouter';
import { siteAnalysis } from '../utils/siteAnalysis.js';

/**
* 总体页面状态及跳转逻辑
* @author 梁慕学
* @date  17-12-25
*/

let his = null;
const pcEntity = {
  namespace: 'pageConstruction',

  state: {
    selectedMenu: footMenus[0],
    innerPageList: [], // 当前页面
    hisPageList: [], // 历史页面链
  },

  subscriptions: {
    setup({ history }) {
      his = history;
      console.log('his set', his);
    },
  },

  effects: {
    // 底部菜单切换
    *footMenuChoice({ payload,history }, { call, put ,select}) {  // eslint-disable-line
      console.log('payload', payload, 'history', history);
      const { code } = payload.selectedMenu;
      const { isFirst, noHistory } = payload;
      const { selectedMenu } = yield select(({ pageConstruction }) => pageConstruction);
      console.log('selectedMenu is', selectedMenu);
      // 屏蔽重复点击菜单,第一次进入时不拦截
      if (selectedMenu.code === code && !isFirst) {
        return;
      }
      // 发送菜单切换项
      yield put({
        type: 'footMenuChoiced',
        payload,
      });
      // 进行内部页面跳转
      yield put({
        type: 'switchToInnerPage',
        payload: {
          pageName: code,
          direct: true,
          noHistory,
        },
      });
    },
    *switchToInnerPage({ payload }, { select, put }) {
      // 页面名称，相关的参数
      const {
        pageName, params, direct, backArrow, currentPage, noHistory, backButton,
      } = payload;
      console.log(`need switchToInnerPage:${pageName},noHistory:${noHistory}`);
      // push到history，屏蔽回退跳转
      const matchFooterMenu = footMenus.filter((element) => {
        return element.code === pageName;
      });
      // 如果是返回按钮，则从原来的列表中取得上次页面
      if (backButton) {

      }
      if (!backArrow && !noHistory) {
        console.log(`pushState in:${pageName}`);
        window.history.pushState({ pageName, params, currentPage }, '');
        // 放入历史页面
        this.hisPageList.push(pageName);
      }
      // 如果是访问一级菜单，则清除回退记录
      if (matchFooterMenu && matchFooterMenu.length > 0 && !noHistory) {
        const backlen = history.length;
        console.log(`backlen is:${backlen}`);
        const backStep = parseInt(backlen) * -1;
        console.log(`backStep is:${backStep}`);
        if (backStep < 0) {
          history.go(backStep);
        }
      }
      // 统计pv埋点
      yield put({
        type: 'app/analysis',
        payload: {
          page: siteAnalysis.pageConst.PVCOUNT,
          action: siteAnalysis.actConst.BROWSE,
        },
      });

      console.log('payloadswitch', payload);
      // 页面名称转大写
      let upPageName = null;
      if (pageName) {
        upPageName = pageName.toUpperCase();
      }
      console.log('currentPage', currentPage);
      let fromPath = null;
      if (params) {
        fromPath = params.backPath;
        console.log('switchToInnerPageupPageName', fromPath);
      }
      if (fromPath === null) {
        fromPath = pageName;
      }
      let opt = null;
      // 埋点：正常浏览，点击进入
      if (!backArrow) {
        opt = { fromPath };
        // 埋点记录消息id
        if (pageName === 'messageDetail') {
          opt.messageId = params.messageId;
        }
        // 判断是交易所公告还是币事件详情(701 币事件,702交易所公告)
        if (pageName && pageName === 'subDetail') {
          opt.typeId = params.typeId;
        }
        // 判断是交易所公告还是币事件详情(701 币事件,702交易所公告)
        if (pageName && pageName === 'toOpen') {
          opt.typeId = params.typeId;
        }
        yield put({
          type: 'app/analysis',
          payload: {
            page: siteAnalysis.pageConst[upPageName],
            action: siteAnalysis.actConst.BROWSE,
            opt,
          },
        });
      }
      // 上导航返回
      if (backArrow) {
        fromPath = currentPage;
        opt = { fromPath };
        yield put({
          type: 'app/analysis',
          payload: {
            page: siteAnalysis.pageConst[upPageName],
            action: siteAnalysis.actConst.BACK,
            opt,
          },
        });
      }
      console.log('switchToInnerPage55555', pageName);
      const { innerPageList } = yield select(({ pageConstruction }) => pageConstruction);
      // 显示页面加载
      yield put({
        type: 'app/showRouteLoading',
      });
      const matchItem = innerPageDefs.def.filter((element) => {
        return element.name === pageName;
      })[0];
      console.log('matched item', matchItem);
      // 进行内部页面排列处理
      const matchPage = {
        pageName,
        params,
        isShow: true,
      };
      // 设置动态key
      matchPage.extraKey = Math.random();
      // 放入页面列表
      innerPageList.length = 0;
      innerPageList.push(matchPage);
      // 直接跳转时，需要判断当前页面属于哪个底部菜单
      if (!direct) {
        console.log('pageConstruction66666666', pageName);
        if (pageName === 'subList') {
          const selectedMenu = footMenus[1];
          yield put({
            type: 'footMenuChoiced',
            payload: { selectedMenu },
          });
        }
        if (pageName === 'subDetail') {
          const selectedMenu = footMenus[1];
          yield put({
            type: 'footMenuChoiced',
            payload: { selectedMenu },
          });
        }
        if (pageName === 'indexMessage') {
          const selectedMenu = footMenus[0];
          yield put({
            type: 'footMenuChoiced',
            payload: { selectedMenu },
          });
        }
        if (pageName === 'buyHistory') {
          const selectedMenu = footMenus[2];
          yield put({
            type: 'footMenuChoiced',
            payload: { selectedMenu },
          });
        }
      }

      // 支付页面隐藏底部
      if (pageName === 'toOpen') {
        yield put({
          type: 'hideFooter',
        });
      } else {
        yield put({
          type: 'showFooter',
        });
      }
      if (params) {
        const { footerHide } = params;
        if (footerHide) {
          console.log('foot77777', footerHide);
          yield put({
            type: 'hideFooter',
          });
        }
      }
      // 透传请求参数，对应的model名称
      yield put({
        type: 'innerPageSwitched',
        params,
        modelName: matchItem.modelName,
      });
    },
    *hideRouteLoading({ pageName }, { select, put }) {
      console.log(`hideRouteLoading in:${pageName}`);
      yield put({
        type: 'app/hideRouteLoading',
      });
    },
  },

  reducers: {
    footMenuChoiced(state, action) {
      return { ...state, ...action.payload };
    },
    hideFooter(state) {
      return { ...state, footerHide: true };
    },
    showFooter(state) {
      return { ...state, footerHide: false };
    },
    // 切换到其他内部页面时返回的数据
    innerPageSwitched(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

export default pcEntity;
