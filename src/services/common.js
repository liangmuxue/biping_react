import request from '../dataExchange/request';

/**
 * 通用请求处理，封装filter，分页等
 * @date        2018-01-12
 * @author      梁慕学
 * @params endpoint 请求对象地址
 * @params filter 过滤
 * @params state 其他请求内容,主要是承载分页信息
 */
export const query = async function query(
  { endpoint, filter, pagination },
  state,
  // 分页请求默认属性
  options = {
    pageSize: 'pager.pageSize', // 每页条目数
    pageNumber: 'pager.number', // 当前页
    totalPage: 'meta.totalPage', // 总页码
  },
) {
  // 取得当前的分页属性，并构建请求参数
  const { current, pageSize } = pagination;
  const page = {
    [options.pageSize]: pageSize,
    [options.pageNumber]: current,
  };

  let systemUser = null;
  if (state.app) {
    ({ systemUser } = state.app);
  }
  return request(endpoint, {
    method: 'get',
    filter,
    page,
    systemUser,
  });
};


/**
* @date        2018-04-22
 * 通用请求处理(不包含分页)
 * @author      梁慕学
 * @params endpoint 请求对象地址
 * @params filter 过滤
 * @params state 其他请求内容,主要是承载分页信息
 */
export const queryNormal = async function queryNormal(
  { endpoint, filter, method },
  state,
) {
  // 获取通用请求头信息
  let systemUser = null;
  if (state.app) {
    ({ systemUser } = state.app);
  }
  console.log('queryNormal in,filter', filter);
  return request(endpoint, {
    method,
    filter,
    systemUser,
  });
};
