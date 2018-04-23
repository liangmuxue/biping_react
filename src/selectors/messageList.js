import { createSelector } from 'reselect';
import Immutable from 'seamless-immutable';
import { pathConfig } from '../utils/pathConfig';

/**
* 老人动态处理类的加工
* @author 梁慕学
* @date  18-02-05
*/
const { getAvatarRemotePath } = pathConfig;
const getMessageList = (data) => {
  console.log('data in getMessageList', data);
  return data;
};

export const rebuildMessageList = createSelector(
  [getMessageList],
  (messageList) => {
    if (!messageList.dataSource) {
      return messageList;
    }
    const imDataSource = [];
    messageList.dataSource.forEach((item) => {
      // 加工为实际图片路径
      const picPathTotal = getAvatarRemotePath(item.picPath);
      // 使用Immutable对象
      imDataSource.push(Immutable.merge(item, { picPathReal: picPathTotal }));
    });
    console.log('imDataSource is', imDataSource);
    // 使用Immutable数组
    messageList.dataSource = Immutable(imDataSource);// eslint-disable-line no-param-reassign
    return {
      messageList,
    };
  },
);
