import React from 'react';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Icon from 'antd-mobile/lib/icon/index';
import Result from 'antd-mobile/lib/result/index';
import 'antd-mobile/es/white-space/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import 'antd-mobile/es/result/style/index.css';
import style from './noWechat.less';
/**
 * 微信外登录提醒
 * @date        2018-04-20
 * @auther
 */
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;

const ResultExample = () => (<div className="result-example">
  <Result
    img={<img src="./assets/images/indexImg/noWechat.png" />}
    title=""
    message="请在微信客户端打开链接"
  />
</div>);

class NoWechat extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in NoWechat', props);
    this.state = {
    };
  }


  render() {
    return (
      <div>
        <ResultExample />
      </div>
    );
  }
}

export default NoWechat;
