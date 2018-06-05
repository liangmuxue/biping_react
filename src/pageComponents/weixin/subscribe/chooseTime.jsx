import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import arrayTreeFilter from 'array-tree-filter';
import { district, provinceLite } from 'antd-mobile-demo-data';
import 'antd-mobile/es/picker/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import style from './ChooseTime.less';


/**
* 订阅小项内容组件
* @date        2018-04-20
* @author 梁慕学
*/

class ChooseTime extends React.Component {

  setVal() {
    this.props.form.setFieldsValue({
      district: ['>2%', '>3%', '>5%', '>8%'],
    });
  }
  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }


  render() {
    const district = [{
      label: '>2%',
      value: '>2%',
    },{
      label: '>3%',
      value: '>3%',
    },{
      label: '>5%',
      value: '>5%',
    },{
      label: '>8%',
      value: '>8%',
    }];
    const downdistrict = [{
      label: '<-2%',
      value: '<-2%',
    },{
      label: '<-3%',
      value: '<-3%',
    },{
      label: '<-5%',
      value: '<-5%',
    },{
      label: '<-8%',
      value: '<-8%',
    }];

    return (<div >
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker data={district} cols={1} title="涨幅"className="forss">
            <List.Item arrow="horizontal">涨幅</List.Item>
          </Picker>
        </List>
          <List style={{ backgroundColor: 'white' }} className="picker-list">
            <Picker data={downdistrict} cols={1} title="涨幅"className="forss">
              <List.Item arrow="horizontal">跌幅</List.Item>
            </Picker>
          </List>
    </div>);
  }
}

export default ChooseTime;
