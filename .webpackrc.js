const path = require('path')
const { version } = require('./package.json')
export default {
  define: {
    'process.env.contextPath': process.env.contextPath,
  },
  entry: 'src/index.js',
  outputPath: `./dist/${version}`,
};
