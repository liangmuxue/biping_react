/**
* 常量定义
* @author 梁慕学
* @date  18-01-10
*/

const LOCALKEY_SYSUSER = 'local_systemUser';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
// URL参数相关
const urlParam_sourceType = 'sourceType';
const urlParam_directPage = 'directPage';
const urlParam_code = 'code';
const urlParamValue_sourceType = {
  fromWap: 'wap',
  fromWx: 'wechat',
};
const urlParamValue_directPage = {
  indexMessage: 'indexMessage',
  messageDetail: 'messageDetail',
  eventCalendar: 'eventCalendar',
};
export default {
  LOCALKEY_SYSUSER,
  formItemLayout,
  urlParam_sourceType,
  urlParam_directPage,
  urlParam_code,
  urlParamValue_sourceType,
  urlParamValue_directPage,
};
