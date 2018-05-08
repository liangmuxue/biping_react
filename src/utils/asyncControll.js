/**
 * Created by lmx on 2018/5/4.
 * 同步异步功能类
 */
export const timeoutCall = async function query(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
};
