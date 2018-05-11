import modelExtend from 'dva-model-extend';
import { pageModel } from './commonPage';
import { queryNormal } from '../services/common';

/**
* 消息详情处理
* @author 赵永帅
* @date  18-04-25
*/

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'toOpen',
  endpoint: '',
};
function wechatPay(config) {
  console.log('config111111', config);
  let result = 0;
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      // document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      // document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      // document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        appId: config.appId, // 公众号名称，由商户传入
        timeStamp: config.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: config.nonceStr, // 随机串
        package: config.package,
        signType: 'MD5', // 微信签名方式：
        paySign: config.paySign, // 微信签名
      },
      (res) => {
        // alert(res.err_msg);
        if (!res.err_msg === 'get_brand_wcpay_request:ok') {
          result = 1;
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      },
    );
  }
  return result;
}
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,

  state: {
    endpoint: MODEL_DEF.endpoint,
  },

  subscriptions: {
  },

  effects: {
    // 查询订阅包
    *toOpenDetail({ payload }, { put, select, call }) {
      console.log('query for toOpenDetail', payload);
      const st = yield select();
      const endpoint = 'verbCommodList';
      const { typeId, typeName } = payload;
      const filter = { typeId };
      const data = yield call(queryNormal, {
        endpoint, filter,
      }, st);
      console.log('verbCommodList data', data);
      if (typeId) {
        data.response.typeId = typeId;
      }
      if (typeName) {
        data.response.typeName = typeName;
      }
      data.backPath = payload.backPath;
      yield put({
        type: 'toOpenDetailSuccess',
        payload: data,
      });
    },
    // 调取微信支付接口
    *toOpenPayDetail({ payload }, { put, select, call }) {
      console.log('query for toOpenPayDetail', payload);
      const st = yield select();
      const filter = payload;
      const endpoint = 'subscribeverb';
      const { verbId, commoId } = payload;
      const params = { verbId, commoId };
      const dataReturn = yield call(queryNormal, {
        endpoint, filter, params, method: 'POST',
      }, st);
      console.log('verbCommodList data', data);
      const { data } = dataReturn.response;
      let result = 0;
      if (data && data.timeStamp) {
        const config = data;
        result = wechatPay(config);
        if (result === 0) {
          yield put({
            type: 'pageConstruction/switchToInnerPage',
            payload: { pageName: 'result' },
          });
        }
      }
    },


  },

  reducers: {
    toOpenDetailSuccess(state, action) {
      console.log('toOpenDetailSuccess in', action.payload);
      const { response, backPath } = action.payload;
      return {
        ...state,
        toOpenData: { ...response },
        backPath,
      };
    },
    toOpenPayDetailSuccess(state, action) {
      console.log('toOpenDetailSuccess in', action.payload);
      const { data } = action.payload.response;
      let result = 0;
      if (data && data.timeStamp) {
        const config = data;
        result = wechatPay(config);
        // WechatJSSDK.chooseWXPay();
      }
      const { response } = action.payload;
      return {
        ...state,
        ...response,
        routeActive: false, // 重置routeActive标志，避免重复查询
        result,
      };
    },
    // 切换支付类别
    payTypeChange(state, action) {
      console.log('payTypeChange val', action.payload);
      const val = action.payload;
      let selectedItem = null;
      let commId = null;
      let firstEnter = null;
      state.toOpenData.data.forEach((item) => {
        if (item.commid === val.commid) {
          selectedItem = val.currentPrice / 100;
          commId = val.commid;
          item.checked = true;
          firstEnter = true;
        } else {
          item.checked = false;
        }
      });
      return {
        ...state,
        selectedItem,
        commId,
        firstEnter,
      };
    },
  },

});
