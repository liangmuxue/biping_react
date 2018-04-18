import { config } from '../../config/environment';

/**
* 路径处理类
* @author 梁慕学
* @date  18-02-05
*/

export const pathConfig = {
  // baseRemotePath: config.env.resourceHost + "/assets/mockData/image",
  basePath: () => {
    return config.env.host;
  },
  baseImgRemotePath: config.env.imgHost,
  baseRemotePath: config.env.resourceHost,
  // 普通头像上传
  uploadUrl: () => {
    return `${config.env.host}/upload`;
  },
  // 富文本编辑图片上传
  uploadEditorUrl: () => {
    return `${config.env.host}/image/editor`;
  },
  // excel上传url
  uploadExcelUrl: () => {
    return `${config.env.host}/excelUpload`;
  },
  // 批量上传右面的 a链接
  templateUrl: () => {
    return `${config.env.resourceHost}/template`;
  },
  // 全都导出到excel表格
  exportAllUrl: () => {
    return `${config.env.resourceHost}/excel/`;
  },
  // 居家项目本地路径
  getJujiaLocalPath(avatar) {
    return `./assets/images/kangyi/${avatar}`;
  },
  // 居家项目服务器路径
  getJujiaRemotePath(avatar) {
    return `${pathConfig.baseImgRemotePath}/reportImg/${avatar}`;
  },
  // 头像服务器路径
  getAvatarRemotePath(avatar) {
    return `${pathConfig.baseImgRemotePath}/headImg/${avatar}`;
  },
};
