// /* jshint node: true */

const ENV = {
  modulePrefix: 'tiannianbao',
};

if (process.env.NODE_ENV === 'development') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://10.0.109.126';
  ENV.host = 'http://10.0.107.254:8280';
  // ENV.host = 'http://10.0.109.224:80';
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
}
if (process.env.NODE_ENV === 'production') {
  ENV.resourceHost = 'http://resource.tnb99.net';
  ENV.socketHost = 'http://47.93.78.97:7090';
  ENV.host = 'http://api.tnb99.cn';
  ENV.imgHost = 'http://img.tnb99.cn';
  ENV.wxScanurl = 'http://localhost:4200/index.html';
}

export const config = {
  env: ENV,
};
