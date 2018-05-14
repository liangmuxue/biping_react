// /* jshint node: true */

const ENV = {
  modulePrefix: 'tiannianbao',
};

if (process.env.NODE_ENV === 'development') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://10.0.109.126';
  // ENV.host = 'http://10.0.107.254:8280';
  // ENV.host = 'http://10.0.106.161:8280';
  // ENV.host = 'http://10.0.106.161:8280';
  //  ENV.host = 'http://10.0.109.224:8280';
  ENV.host = 'http://wp.test.tnb99.net';

  // ENV.socketHost = 'http://10.0.109.221:8280';
  // ENV.imgHost = 'http://img.tnb99.cn';
  // ENV.wxScanurl = 'http://localhost:4200/index.html';
  // 分享消息页面对应的网址
  ENV.msgShareUrl = 'http://localhost:9000/images/msgImages';
  ENV.wxBrowserCheck = false;
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.mockUser = {
    userName: '7654d1b1-0bdf-4135-974d-d8b3c86bfa94',
    passWord: '2b6c7bbd-d6f8-45f6-b6fb-234d4e31d873',
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
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  ENV.wxBrowserCheck = true;
}

export const config = {
  env: ENV,
};
