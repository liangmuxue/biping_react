/**
 * Created by wyf on 2017/1/18.
 */

export default function dateFormat(text, formatType) {
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
