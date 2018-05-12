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
  ENV.imgShareUrl = 'http://img.test.tnb99.net';
  // ENV.mockUser = {
  //   userName: 'e7c38411-f8f2-4283-a274-5b04c59444d7',
  //   passWord: 'b2cbacf0-2635-4d42-ad4f-85b63f30f8dc',
  // };
  //  ENV.mockUser = {
  //   userName: 'ed18c1a1-4470-4db0-b060-a3d44827993f ',
  //   passWord: '20165a11-0c4e-490b-83a7-162d914e17a5',
  // };
  // ENV.mockUser = {
  //   userName: '9174d49f-7f22-4476-8de4-1180702c5c23',
  //   passWord: '227abf4f-5a6f-43f9-b3a2-9a89cfb1510f',
  // };
  ENV.mockUser = {
    userName: '400f55b9-1af3-4801-ae21-3fd2eb888296',
    passWord: '3376a304-def6-4c8b-8c75-52b044d33ebd',
  };
  ENV.imgUrl = 'https://biping.oss-cn-beijing.aliyuncs.com';
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
