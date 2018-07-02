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
async function wechatPay(config) {
  console.log('config111111', config);
  const result = 0;
  return new Promise((resolve) => {
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
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve(1);
          return;
        }
        resolve(0);
      },
    );
  });
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
      const { verbId, commoId, typeName } = payload;
      const data = { verbId, commoId };
      console.log('query for toOpenPayDetail8888888', data);
      const dataReturn = yield call(queryNormal, {
        endpoint, filter, data, method: 'POST',
      }, st);
      console.log('verbCommodList data', dataReturn);
      if (!dataReturn.success) {
        return null;
      }
      const datanow = dataReturn.response.data;
      let resultno = 0;
      if (datanow && datanow.timeStamp) {
        const config = datanow;
        resultno = yield call(wechatPay, config);
        if (resultno === 1) {
          console.log('777777777888888888');
          yield put({
            type: 'paySuccess',
            payload: { typeName },
          });
        }
      }
    },
    *active({ params, backArrow }, { put }) {
      yield put({ type: 'app/hideRouteLoading' });
      // console.log("active in toopen",params);
      yield put({ type: 'toOpenDetailDirect', payload: { params, backArrow } });
    },
  },

  reducers: {
    toOpenDetailDirect(state, action) {
      return {
        ...state,
        params: action.payload.params,
        paySuccess: false,
        actType: 'toOpenDetailDirect',
      };
    },
    toOpenDetailSuccess(state, action) {
      console.log('toOpenDetailSuccess in', action.payload);
      const { response, backPath } = action.payload;
      return {
        ...state,
        toOpenData: { ...response },
        backPath,
        paySuccess: false,
        actType: 'toOpenDetailSuccess',
      };
    },

    // 切换支付类别
    payTypeChange(state, action) {
      console.log('payTypeChange val', action.payload);
      const val = action.payload;
      let selectedItem = null;
      let commId = null;
      let firstEnter = null;
      let typeName = null;
      state.toOpenData.data.forEach((item) => {
        if (item.commid === val.commid) {
          selectedItem = val.currentPrice / 100;
          commId = val.commid;
          item.checked = true;
          firstEnter = true;
          typeName = val.name;
        } else {
          item.checked = false;
        }
      });
      return {
        ...state,
        selectedItem,
        commId,
        firstEnter,
        typeName,
        actType: 'payTypeChange',
      };
    },
    paySuccess(state, action) {
      return {
        ...state,
        paySuccess: true,
        ...action.payload,
      };
    },
    resetPayFlag(state) {
      return {
        ...state,
        paySuccess: false,
      };
    },
  },

});
