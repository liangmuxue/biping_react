import React from 'react';
import List from 'antd-mobile/lib/list/index';
import Picker from 'antd-mobile/lib/picker/index';
import 'antd-mobile/es/picker-view/style/index.css';
import 'antd-mobile/es/picker/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
// import 'antd-mobile/dist/antd-mobile.css';


/**
* 订阅小项内容组件
* @date        2018-04-20
* @author 梁慕学
*/
class ChooseTime extends React.Component {
  constructor(props) {
    super(props);
    console.log('thisprops is', props);
    this.state = {
    };
  }
  render() {
    const district = [{
      label: '>2%',
      value: '>2%',
    }, {
      label: '>3%',
      value: '>3%',
    }, {
      label: '>5%',
      value: '>5%',
    }, {
      label: '>8%',
      value: '>8%',
    }];
    const downdistrict = [{
      label: '<-2%',
      value: '<-2%',
    }, {
      label: '<-3%',
      value: '<-3%',
    }, {
      label: '<-5%',
      value: '<-5%',
    }, {
      label: '<-8%',
      value: '<-8%',
    }];

    return (
      <List style={{ backgroundColor: 'white' }} className="picker-list">
        <Picker data={district} cols={1} title="涨幅" onChange={this.onChange(this)} className="forss">
          <List.Item arrow="horizontal">涨幅</List.Item>
        </Picker>
        <Picker data={downdistrict} cols={1} title="跌幅" className="forss">
          <List.Item arrow="horizontal">跌幅</List.Item>
        </Picker>
      </List>

    );
  }
}
export default ChooseTime;
