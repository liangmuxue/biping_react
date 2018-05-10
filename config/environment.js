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
  ENV.host = 'http://10.0.109.224:8280';
  // ENV.host = 'http://wp.test.tnb99.net';

  // ENV.socketHost = 'http://10.0.109.221:8280';
  // ENV.imgHost = 'http://img.tnb99.cn';
  // ENV.wxScanurl = 'http://localhost:4200/index.html';
  // 分享消息页面对应的网址
  ENV.msgShareUrl = 'http://localhost:9000/images/msgImages';
  ENV.wxBrowserCheck = true;
  ENV.mockUser = {
    userName: '6f92cbe9-4a31-4bcc-8943-3725f9d8a4c6',
    passWord: '9a5958aa-6c3e-4321-9f66-e5d05735f622',
  };
  // ENV.mockUser = {
  //   userName: 'a23edc92-5360-49cd-bffc-6bb3eabb2aa0',
  //   passWord: '8c43d9ac-b9a6-4e6c-af81-0f6067934b31',
  // };
}
if (process.env.NODE_ENV === 'production') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://47.93.78.97:7090';
  ENV.host = 'http://wp.test.tnb99.net';
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
  ENV.msgShareUrl = 'http://img.test.tnb99.net/msg';
  ENV.wxBrowserCheck = true;
}

export const config = {
  env: ENV,
};
