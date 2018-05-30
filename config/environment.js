// /* jshint node: true */

const ENV = {
  modulePrefix: 'biping',
};

if (process.env.NODE_ENV === 'development') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://10.0.109.126';
  // ENV.host = 'http://10.0.107.254:8280';
  // ENV.host = 'http://10.0.106.161:8280';
  // ENV.host = 'http://47.92.25.130:8280';
  //  ENV.host = 'http://10.0.109.224:8280';
  // ENV.host = 'http://wp.test.tnb99.net';
  ENV.host = 'http://twp.test.tnb99.net';

  // ENV.socketHost = 'http://10.0.109.221:8280';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92489c80243c1c9c&redirect_uri=';
  ENV.messageHost = 'http://wx.test.tnb99.net';
  // ENV.messageHost = 'http://twx.test.tnb99.net';
  // ENV.wxScanurl = 'http://localhost:4200/index.html';
  // 分享消息页面对应的网址
  ENV.msgShareUrl = 'http://localhost:9000/images/msgImages';
  ENV.wxBrowserCheck = false;
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  // ENV.mockUser = {
  //   userName: '46cadb3d-44a4-4635-b912-f486fb95e44c',
  //   passWord: 'c1a46aa1-8081-45cb-8aa3-9d666fbaa255',
  // };
  // ENV.mockUser = {
  //   userName: 'd53dc5b5-3e0b-473f-a514-1c0fa846d275',
  //   passWord: 'f1d4864a-d080-4f9a-ac3c-313821fb56f8',
  // };
  ENV.mockUser = {
    userName: '4b8d6d07-ef96-48f2-bb34-7267c2eabaaa',
    passWord: '3ecf1f31-e8f8-4d17-bb35-34b5a73d0cf7',
  };
  // ENV.mockUser = {
  //   userName: '02fb7818-dec5-4602-9ef4-42b22af75936',
  //   passWord: '60b6bb31-5d5b-4b38-8785-cc025737bed8',
  // };
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.wxBrowserCheck = true;
}
if (process.env.NODE_ENV === 'test') {
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
  ENV.mockUser = {
    userName: '46cadb3d-44a4-4635-b912-f486fb95e44c',
    passWord: 'c1a46aa1-8081-45cb-8aa3-9d666fbaa255',
  };
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
