import request from '../dataExchange/request';

/**
 * 个人中心的请求处理
 * @date        2018-01-12
 * @author      赵永帅
 */

// 老人动态信息
export async function queryDetail() {
  const rtn = request('userMain', {
    method: 'get',
  });
  console.log('rtn in messageDetail', rtn);
  return rtn;
}
