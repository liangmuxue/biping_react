/**
 * Created by wyf on 2017/1/18.
 */
function dateFormat(text, formatType) {
  const date = new Date(text);
  const year = date.getFullYear();
  const month = preFixO(date.getMonth() + 1);
  const day = preFixO(date.getDate());
  let dateStr = `${year}-${month}-${day}`;
  switch (formatType) {
    case 1:
      dateStr = `${year}年${month}月${day}日`;
      break;
    case 2:
      dateStr = `${year}/${month}/${day}`;
      break;
    default:
      break;
  }
  return dateStr;
}

function preFixO(number) {
  return (`0${number}`).substr(-2);
}

/**
 * 返回转换后的日期文本
 *
 * @param t 时间毫秒值
 * @param modelString 模式
 */
function convertDate(t, modelString) {
  var ONE_MINUTE = 60,
      ONE_HOUR = ONE_MINUTE * 60,
      ONE_DAY = ONE_HOUR * 24,
      ONE_MONTH = ONE_DAY * 30,
      ONE_YEAR = ONE_MONTH * 12;
  var msd = Date.now() - t;
  msd = msd > 0 ? msd : 0;
  var time = parseFloat(msd) / 1000; // to second
  var ret = '';
  var d = new Date(t);

  if (modelString) {
      ret = getDateString(modelString);
  } else {
      if (time != null && time != "") {
          if (time < ONE_MINUTE) {
              ret = "刚刚";
          } else if (time >= ONE_MINUTE && time < ONE_HOUR) {
              ret = parseInt(time / ONE_MINUTE) + "分钟前";
          } else if (time >= ONE_HOUR && time < ONE_DAY) {
              ret = parseInt(time / ONE_HOUR) + "小时前";
          } else if (time >= ONE_DAY && time < ONE_MONTH) {
              ret = parseInt(time / ONE_DAY) + "天前";
          } else if (time >= ONE_MONTH && time < ONE_YEAR) {
              ret = parseInt(time / ONE_MONTH) + "个月前";
          } else if (time >= ONE_YEAR && time < ONE_YEAR * 15) {
              ret = parseInt(time / ONE_YEAR) + "年前";
          } else {
              ret = 'N年前'
          }
      }
  }

  function getDateString(modelString) {
      /**
       * 字符模式:
       *      YYYY: 年
       *      MM: 月
       *      DD: 日
       *      hh: 小时
       *      mm: 分钟
       *      ss: 秒
       */
      var _r = /\d?(\d{2})/;
      var _ret = modelString || 'YYYY-MM-DD hh:mm:ss';
      var _d = {
          'YYYY': d.getFullYear(),
          'MM': ('0' + (d.getMonth() + 1)).replace(_r, '$1'),
          'DD': ('0' + d.getDate()).replace(_r, '$1'),
          'hh': ('0' + d.getHours()).replace(_r, '$1'),
          'mm': ('0' + d.getMinutes()).replace(_r, '$1'),
          'ss': ('0' + d.getSeconds()).replace(_r, '$1')
      };

      for (var k in _d) {
          _ret = _ret.replace(k, _d[k]);
      }

      return _ret;
  }

  return ret;
}
/**
  * 返回当前一周日期
  * 
  * @param t 时间毫秒
  */
function weekDay(t) {
  var t = new Date(t) || new Date()
  var day = new Date(t).getDay();
  var date = new Date(t).getDate();
  var weekArr = [];
  for (var i = 0; i<7; i++) {
    weekArr.push(pad(new Date(t.getFullYear(), t.getMonth(), t.getDate() + (i - day)).getDate()));
  }
  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  return weekArr;
}

export {
  dateFormat,
  convertDate,
  weekDay
};
