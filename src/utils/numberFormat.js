/**
 * Created by zhaoys 2018/6/20
 */
export const NumberFormat = {
  // 获取净流入
  gainHoldFun(gainHo) {
    let gainHold = gainHo;
    if (gainHold && Math.abs(gainHold) > 1) {
      gainHold = gainHold.toFixed(2);
    } else if (gainHold && Math.abs(gainHold) < 1) {
      gainHold = gainHold.toFixed(10);
    } else {
      gainHold = '-';
    }
    return gainHold;
  },
  gainDifferFun(gainDiff) {
    let gainDiffer = gainDiff;
    if (gainDiffer > 0) {
      gainDiffer = `+${(gainDiffer * 100).toString().substr(0, 4)}%`;
    } else if (gainDiffer <= 0) {
      gainDiffer = `${(gainDiffer * 100).toString().substr(0, 4)}%`;
    } else {
      gainDiffer = '-';
    }
    return gainDiffer;
  },
  // 价格显示转换
  priceShow(price) {
    if (price < 1) {
      return price.toFixed(8);
    }
    return price.toFixed(2);
  },
};
