import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { config } from '../../config/environment';


/**
* 数据请求交换封装
* @date        2018-01-10
* @author 梁慕学
*/
const API_ROOT = config.env.host;

const fetch = (endpoint, options) => {
  const {
    method = 'get',
    systemUser,
    data, filter,
  } = options;
  // 定义标准请求，加入协议头信息
  const axiosInst = axios.create({
    baseURL: `${API_ROOT}/webInterface`,
    timeout: 3000,
    headers: {
      type: 'wechat',
      token: systemUser.token,
    },
  });
  // 转form请求
  const formData = new window.FormData();
  if (method.toLowerCase() === 'post') {
    for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        formData.append(key, data[key]);
      }
    }
  }
  // 根据不同的请求类型，执行不同的发方法
  try {
    switch (method.toLowerCase()) {
      case 'get':
        return axiosInst.get(endpoint, {
          params: { ...filter },
        });
      case 'delete':
        return axiosInst.remove(endpoint, data.id);
      case 'post':
        return axiosInst.post(
          endpoint, formData,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        );
      case 'put':
        return axiosInst.update(endpoint, data);
      case 'patch':
        return axiosInst.update(endpoint, data);
      default:
        return axiosInst(options);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default function request(endpoint, options) {
  return fetch(endpoint, options).then((response) => {
    const { data } = response;
    return Promise.resolve({
      success: true,
      response: data,
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
