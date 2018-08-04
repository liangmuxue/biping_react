/**
 * Created by lmx on 2018/5/4.
 * url功能类
 */
export const urlUtils = {
  analysisParam(paras) {
    const url = window.location.href;
    // console.log(`url is:${url}`);
    const paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
    // console.log(`paraString is:${paraString}`);
    const paraObj = {};
    let j;
    for (let i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
    }
    const returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) === 'undefined') {
      return null;
    } else {
      return returnValue;
    }
  },
};
