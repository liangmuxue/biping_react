/**
 * Created by lmx on 2018/8/4.
 * 功能类
 */
export const commonUtils = {
  isEmpty(obj) {
    if(!obj||JSON.stringify(obj) == "{}"){
      return true;
    }
    return false;
  },
};
