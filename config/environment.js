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
  //   userName: '3b42abd7-205a-4b3f-b93d-cdcf5c5670c2',
  //   passWord: '7b4bf910-18ce-4faf-be40-3eaef27b31b1',
  // };
  ENV.mockUser = {
    userName: '67aabb9c-7083-489d-bd96-d166ee03e4b0',
    passWord: 'a8571dd1-6f65-42f6-b419-6051f8fd8fc9',
  };
  // ENV.mockUser = {
  //   userName: 'd53dc5b5-3e0b-473f-a514-1c0fa846d275',
  //   passWord: 'f1d4864a-d080-4f9a-ac3c-313821fb56f8',
  // };
  // ENV.mockUser = {
  //   userName: 'ec26584d-06ea-40bb-a04e-6ba589f94c2c',
  //   passWord: '6fbf3a44-fba6-4441-a213-adb1303a1cea',
  // };
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
    userName: '3b42abd7-205a-4b3f-b93d-cdcf5c5670c2',
    passWord: '4da817d1-547e-4558-b895-c52beeb0efda',
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
