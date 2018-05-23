// /* jshint node: true */

const ENV = {
  modulePrefix: 'tiannianbao',
};

if (process.env.NODE_ENV === 'development') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://10.0.109.126';
  // ENV.host = 'http://10.0.107.254:8280';
  // ENV.host = 'http://10.0.106.161:8280';
  //  ENV.host = 'http://47.92.25.130:8280';
  //  ENV.host = 'http://10.0.109.224:8280';
  ENV.host = 'http://wp.test.tnb99.net';
  // ENV.host = 'http://twp.test.tnb99.net';

  // ENV.socketHost = 'http://10.0.109.221:8280';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92489c80243c1c9c&redirect_uri=';
  ENV.messageHost = 'http://wx.test.tnb99.net';
  // ENV.messageHost = 'http://twx.test.tnb99.net';
  // ENV.wxScanurl = 'http://localhost:4200/index.html';
  // 分享消息页面对应的网址
  ENV.msgShareUrl = 'http://localhost:9000/images/msgImages';
  ENV.wxBrowserCheck = false;
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.mockUser = {
    userName: '7f5a83e9-852d-4d5f-b3ab-85a9169ee8aa',
    passWord: '2c7134c7-1e83-4dd9-bf18-862461f4e894',
  };
  // ENV.mockUser = {
  //   userName: 'ed18c1a1-4470-4db0-b060-a3d44827993f ',
  //   passWord: '20165a11-0c4e-490b-83a7-162d914e17a5',
  // };
  // ENV.mockUser = {
  //   userName: 'ffc475f2-7f9f-4509-9dea-56fe9dab76bc',
  //   passWord: '9afb6ab3-1fb3-4833-8286-9b33512eaa78',
  // };
  // ENV.mockUser = {
  //   userName: 'f21116fa-9f1d-4b18-8ccf-a43d76fe4903',
  //   passWord: 'e5585b3b-6f21-4c98-997f-9c2fb1d338b4',
  // };
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.wxBrowserCheck = true;
}
if (process.env.NODE_ENV === 'production') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://47.93.78.97:7090';
  ENV.host = 'http://wp.test.tnb99.net';
  //  ENV.host = 'http://twp.test.tnb99.net';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92489c80243c1c9c&redirect_uri=';
  ENV.messageHost = 'http://wx.test.tnb99.net';
  //  ENV.messageHost = 'http://twx.test.tnb99.net';
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.wxBrowserCheck = true;
}

export const config = {
  env: ENV,
};
