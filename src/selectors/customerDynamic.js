import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { pathConfig } from '../utils/pathConfig';

/**
* 老人动态处理类的加工
* @author 梁慕学
* @date  18-02-05
*/
const { getAvatarRemotePath } = pathConfig;
const getCustomerDynamic = state => state.customerDynamic;

export const rebuildCustomerDynamic = createSelector(
  [getCustomerDynamic],
  (customerDynamic) => {
    if (!customerDynamic.dataSource) {
      return customerDynamic;
    }
    const imDataSource = [];
    customerDynamic.dataSource.forEach((item) => {
      // 加工为实际图片路径
      const picPathTotal = getAvatarRemotePath(item.picPath);
      // 使用Immutable对象
      imDataSource.push(Immutable.merge(item, { picPathReal: picPathTotal }));
    });
    console.log('imDataSource is', imDataSource);
    // 使用Immutable数组
    customerDynamic.dataSource = Immutable(imDataSource);// eslint-disable-line no-param-reassign
    return {
      customerDynamic,
    };
  },
);
