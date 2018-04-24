import axios from 'axios';
import Kitsu from 'kitsu';
import MockAdapter from 'axios-mock-adapter';
import { config } from '../../config/environment';


/**
* 数据请求交换封装
* @date        2018-01-10
* @author 梁慕学
*/
const API_ROOT = config.env.host;
const api = new Kitsu({
  baseURL: `${API_ROOT}/webInterface`,
  resourceCase: 'none',
  pluralize: false,
  camelCaseTypes: true,
});

const fetch = (endpoint, options) => {
  const {
    method = 'get',
    systemUser,
    data, filter,
  } = options;
  // const cloneData = lodash.cloneDeep(data);
  // 公共头信息
  api.headers = {
    type: 'wechat',
    token: systemUser.token, // 登录后获取的token信息
  };

  // 根据不同的请求类型，执行不同的发方法
  try {
    switch (method.toLowerCase()) {
      case 'get':
        return api.fetch(endpoint, {
          ...filter,
        });
      case 'delete':
        return api.remove(endpoint, data.id);
      case 'post':
        return api.create(endpoint, data);
      case 'put':
        return api.update(endpoint, data);
      case 'patch':
        return api.update(endpoint, data);
      default:
        return axios(options);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default function request(endpoint, options) {
  return fetch(endpoint, options).then((response) => {
    return Promise.resolve({
      success: true,
      response,
    });
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }
    return Promise.resolve({
      success: false,
      error: new Error({ success: false, statusCode, message: msg }),
    });
  });
}

// export default request;
