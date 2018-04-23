import request from '../dataExchange/request';

/**
 * 消息相关的请求处理
 * @date        2018-01-12
 * @author      梁慕学
 */

// 老人动态信息
export async function queryDetail(messageId) {
  const rtn = request('messageDetail', {
    method: 'get',
    filter: messageId,
  });
  console.log('rtn in messageDetail', rtn);
  return rtn;
}
