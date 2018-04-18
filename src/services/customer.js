import request from '../dataExchange/request';

/**
 * 客户相关的请求处理
 * @date        2018-01-12
 * @author      梁慕学
 */

// 老人动态信息
export async function queryDynamic(params) {
  return request('customerDynamic', {
    method: 'get',
    filter: params,
  });
}
