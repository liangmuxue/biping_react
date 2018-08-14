// /* jshint node: true */

const ENV = {
  modulePrefix: 'biping',
};

if (process.env.NODE_ENV === 'development') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://10.0.109.126';
  // ENV.host = 'http://10.0.107.254:8280';
  // ENV.host = 'http://10.0.106.10:8280';
  // ENV.host = 'http://localhost:8280';
  // ENV.host = 'http://10.0.107.231:8280';
  // ENV.host = 'http://10.0.108.137:8280';
  // ENV.host = 'https://twp.closerhearts.net.cn';
  ENV.host = 'https://wps.bipingcoin.com/';
  // ENV.socketHost = 'http://10.0.109.221:8280';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd4795144c135bdd&redirect_uri=';
  ENV.messageHost = 'http://twx.closerhearts.net.cn';
  ENV.qrImgName = 'wxtest.png';
  // ENV.messageHost = 'http://twx.closerhearts.net.cn';
  // ENV.wxScanurl = 'http://localhost:4200/index.html';
  // 分享消息页面对应的网址
  ENV.msgShareUrl = 'http://localhost:9000/images/msgImages';
  ENV.wxBrowserCheck = false;
  ENV.imgShareUrl = 'http://img.closerhearts.net.cn';
  ENV.mockUser = {
    userName: '836566ff-1788-41bb-8156-a2f9385657b1',
    passWord: '9d296af7-22e8-4119-a86f-ae0725c9014c',
  };

  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.closerhearts.net.cn';
  ENV.wxBrowserCheck = true;
  // ENV.analysis = true;
}
if (process.env.NODE_ENV === 'test') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://47.93.78.97:7090';
  ENV.host = 'https://twp.closerhearts.net.cn';
  //  ENV.host = 'http://twp.closerhearts.net.cn';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd4795144c135bdd&redirect_uri=';
  ENV.messageHost = 'https://twx.closerhearts.net.cn';
  ENV.qrImgName = 'wxtest.png';
  //  ENV.messageHost = 'http://twx.closerhearts.net.cn';
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.closerhearts.net.cn';
  ENV.wxBrowserCheck = true;
  // ENV.analysis = true;
}
if (process.env.NODE_ENV === 'production') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://47.93.78.97:7090';
  ENV.host = 'https://wps.bipingcoin.com';
  //  ENV.host = 'http://twp.closerhearts.net.cn';
  ENV.wechatHost = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92489c80243c1c9c&redirect_uri=';
  ENV.messageHost = 'https://wx.bipingcoin.com';
  ENV.qrImgName = 'bipingcoin.png';
  //  ENV.messageHost = 'http://twx.closerhearts.net.cn';
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.closerhearts.net.cn';
  ENV.wxBrowserCheck = true;
  ENV.analysis = true;// 标志是否进行埋点请求
}

export const config = {
  env: ENV,
};
