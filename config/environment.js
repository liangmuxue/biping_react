// /* jshint node: true */

const ENV = {
  modulePrefix: 'biping',
};

if (process.env.NODE_ENV === 'development') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://10.0.109.126';
  // ENV.host = 'http://10.0.107.254:8280';
  // ENV.host = 'http://10.0.106.10:8280';
  ENV.host = 'http://localhost:8280';
  // ENV.host = 'http://10.0.109.224:8280';
  // ENV.host = 'http://wp.test.tnb99.net';
  // ENV.host = 'http://twp.test.tnb99.net';

  // ENV.socketHost = 'http://10.0.109.221:8280';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92489c80243c1c9c&redirect_uri=';
  ENV.messageHost = 'http://twx.test.tnb99.net';
  // ENV.messageHost = 'http://twx.test.tnb99.net';
  // ENV.wxScanurl = 'http://localhost:4200/index.html';
  // 分享消息页面对应的网址
  ENV.msgShareUrl = 'http://localhost:9000/images/msgImages';
  ENV.wxBrowserCheck = false;
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.mockUser = {
    userName: '836566ff-1788-41bb-8156-a2f9385657b1',
    passWord: '9d296af7-22e8-4119-a86f-ae0725c9014c',
  };

  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.wxBrowserCheck = true;
}
if (process.env.NODE_ENV === 'test') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://47.93.78.97:7090';
  ENV.host = 'http://twp.test.tnb99.net';
  //  ENV.host = 'http://twp.test.tnb99.net';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd4795144c135bdd&redirect_uri=';
  ENV.messageHost = 'http://twx.test.tnb99.net';
  //  ENV.messageHost = 'http://twx.test.tnb99.net';
  ENV.imgHost = 'http://img.tnb99.cn';
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
