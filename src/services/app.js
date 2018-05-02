import request from '../dataExchange/request';

/**
 * 全局请求处理
 * @date        2018-01-12
 * @author      梁慕学
 */
export async function login(params) {
  return request({
    url: 'userLogin',
    method: 'get',
    filter: params,
  });
}

export async function logout(params) {
  return request({
    url: 'logout',
    method: 'get',
    data: params,
  });
}
// 通过code获取用户信息
export const autoReg = async function query(params) {
  return request('getUser', {
    method: 'get',
    filter: params,
    // 构造默认空token
    systemUser: {
      token: 'none',
    },
  });
};

export const query = async function query(params) {
  return request('userLogin', {
    method: 'get',
    filter: params,
    // 构造默认空token
    systemUser: {
      token: 'none',
    },
  });
};
