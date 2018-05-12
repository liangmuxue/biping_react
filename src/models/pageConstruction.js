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
    innerPageList: [],
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
      const { code } = payload.selectedMenu;
      const { isFirst } = payload;
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
        },
      });
    },
    *switchToInnerPage({ payload }, { select, put }) {
      // 页面名称，相关的参数
      const {
        pageName, params, direct, backArrow, currentPage,
      } = payload;
      // 页面名称转大写
      const upPageName = pageName.toUpperCase();
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
      let matchPage = null;
      for (let i = 0; i < innerPageList.length; i += 1) {
        // 取得对应的匹配组件定义
        let { modelName } = innerPageList[i];
        // 取得对应的model名称，如果没有则默认是页面名称
        if (!modelName) {
          modelName = innerPageList[i].pageName;
        }
        if (modelName === 'subList') {
          modelName = 'subscribe';
        }
        console.log(`page name is:${innerPageList[i].pageName},and isShow:${innerPageList[i].isShow}`);
        if (pageName === innerPageList[i].pageName) {
          matchPage = innerPageList[i];
          // 从隐藏到显示
          matchPage.isShow = true;
          // 如果由非激活状态转变为激活状态，要进行页面通知
          const actEvent = `${modelName}/active`;
          console.log(`act name:${actEvent}`);
          console.log('act params:', params);
          yield put({
            type: actEvent,
            pageName,
            params,
            backArrow,
          });
        } else if (innerPageList[i].isShow) {
          // 如果同一页面进出，不隐藏
          if (innerPageList[i].pageName !== matchItem.pageName) {
            // 从显示到隐藏
            innerPageList[i].isShow = false;
            // 如果由激活状态转变为非激活状态，要进行页面通知
            const deActive = `${modelName}/deactive`;
            console.log(`need send deactive:${deActive}`);
            yield put({
              type: deActive,
              pageName,
              params,
            });
          }
        }
      }
      // 如果没有匹配，则初始化此页面组件
      if (!matchPage) {
        matchPage = {
          pageName,
          params,
          isShow: true,
        };
        // 放入页面列表
        innerPageList.push(matchPage);
      }
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
      const { innerPageList } = yield select(({ pageConstruction }) => pageConstruction);
      // 根据当前已有页面进行匹配，如果没有，直接进行提示隐藏处理
      const matchItem = innerPageList.filter((element) => {
        return element.pageName === pageName;
      });
      console.log('matchItem in pagc', matchItem);
      if (!matchItem || matchItem.length === 0) {
        yield put({
          type: 'app/hideRouteLoading',
        });
        return;
      }
      // 如果是非显示页面，不进行加载提示隐藏
      if (!matchItem[0].isShow) {
        return;
      }
      // 显示页面加载
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
