import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { pathConfig } from '../utils/pathConfig';

/**
* 老人动态处理类的加工
* @author 梁慕学
* @date  18-02-05
*/
const { getAvatarRemotePath } = pathConfig;
const getBuyList = (data) => {
  console.log('data in getBuyList', data);
  return data;
};

export const rebuildBuyList = createSelector(
  [getBuyList],
  (buyList) => {
    if (!buyList.dataSource) {
      return buyList;
    }
    const imDataSource = [];
    buyList.dataSource.forEach((item) => {
      // 使用Immutable对象
      imDataSource.push(Immutable.merge(item, { }));
    });
    console.log('imDataSource is', imDataSource);
    // 使用Immutable数组
    buyList.dataSource = Immutable(imDataSource);// eslint-disable-line no-param-reassign
    return {
      buyList,
    };
  },
);
