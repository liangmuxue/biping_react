import footMenus from '../pageComponents/weixin/footer/footerMenuData';
import { innerPageDefs } from '../wxRouter';

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
    *footMenuChoice({ payload,history }, { call, put }) {  // eslint-disable-line
      // 发送菜单切换项
      yield put({
        type: 'footMenuChoiced',
        payload,
      });
      const { code } = payload.selectedMenu;
      // 进行内部页面跳转
      yield put({
        type: 'switchToInnerPage',
        payload: {
          pageName: code,
        },
      });
    },
    *switchToInnerPage({ payload }, { select, put }) {
      // 页面名称，相关的参数
      const { pageName, params } = payload;
      const { innerPageList } = yield select(({ pageConstruction }) => pageConstruction);
      // 进行内部页面排列处理
      let matchPage = null;
      for (let i = 0; i < innerPageList.length; i += 1) {
        // 取得对应的匹配组件定义
        const matchItem = innerPageDefs.def.filter((element) => {
          return element.name === innerPageList[i].pageName;
        })[0];
        let { modelName } = matchItem;
        // 取得对应的model名称，如果没有则默认是页面名称
        if (!modelName) {
          modelName = matchItem.name;
        }
        const st = yield select();
        const state = st[modelName];
        console.log(`new currentModel is:${modelName}`);
        console.log('relate state is:', state);
        if (pageName === innerPageList[i].pageName) {
          matchPage = innerPageList[i];
          // 从隐藏到显示
          if (!matchPage.isShow) {
            matchPage.isShow = true;
            // 如果由非激活状态转变为激活状态，要进行页面通知
            const actEvent = `${modelName}/active`;
            console.log(`act name:${actEvent}`);
            console.log('act params:', params);
            yield put({
              type: actEvent,
              pageName,
              params,
            });
          }
        } else if (innerPageList[i].isShow) {
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
      yield put({
        type: 'innerPageSwitched',
        params,
      });
    },
  },

  reducers: {
    footMenuChoiced(state, action) {
      return { ...state, ...action.payload };
    },
    // 切换到其他内部页面时返回的数据
    innerPageSwitched(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

export default pcEntity;
