/**
 * Created by zhaoys 2018/6/20
 */
export const NumberFormat = {
  // 获取净流入
  gainHoldFun(gainHold) {
    if (gainHold && Math.abs(gainHold) > 1) {
      gainHold = gainHold.toFixed(2);
    } else if (gainHold && Math.abs(gainHold) < 1) {
      gainHold = gainHold.toFixed(10);
    } else {
      gainHold = '-';
    }
    return gainHold;
  },
};
