import React from 'react';
import { createForm } from 'rc-form';
import List from 'antd-mobile/lib/list/index';
import Picker from 'antd-mobile/lib/picker/index';
import 'antd-mobile/es/picker-view/style/index.css';
import 'antd-mobile/es/picker/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
// import 'antd-mobile/dist/antd-mobile.css';
const initValue = {
  gainValue: [],
  loseValue1: [],
};

/**
* 涨跌幅选择卡片
* @date        2018-04-20
* @author 赵永帅
*/
class ChooseTime extends React.Component {
  constructor(props) {
    super(props);
    console.log('gainOrLose1', props);
  }
  // 涨幅赋值
  gainValue(value) {
    console.log('gainOrLose1', value);
    initValue.gainValue = value;
    this.props.gainOrLose(value);
  }
  // 跌幅赋值
  loseValue(value) {
    initValue.loseValue = value;
    this.props.gainOrLose(value);
  }

  render() {
    const changeAct = function(data){
      console.log("changeAct in",data);
    };
    const { chooseObj } = this.props;
    console.log('chooseObj', chooseObj);
    // 涨幅
    const { gainArea } = chooseObj.data;
    // 跌幅
    const { loseArea } = chooseObj.data;
    console.log('loseArea', loseArea);
    const district = [];
    const downdistrict = [];
    loseArea.map(item => (
      downdistrict.push({ value: item.transVerbId, label: `<${item.loseHold * 100}%` })
    ));
    gainArea.map(item => (
      district.push({ value: item.transVerbId, label: `>${item.gainHold * 100}%` })
    ));
    const sValue = [{value:'2013',label:'春'}];
    let ChooseTimeEx = (props) => {
      const { getFieldProps } = props.form;
      return (
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker
            data={district}
            cols={1}
            title="涨幅"
            onOk={changeAct}
            value= {sValue}
          >
            <List.Item arrow="horizontal" >涨幅</List.Item>
          </Picker>
          <Picker
            data={downdistrict}
            cols={1}
            value={initValue.loseValue}
            title="跌幅"
            onChange={v => this.loseValue({ loseValue: v })}
            {...getFieldProps('district4')}
          >
            <List.Item arrow="horizontal">跌幅</List.Item>
          </Picker>
        </List>
      );
    };
    ChooseTimeEx = createForm()(ChooseTimeEx);
    return (
      <ChooseTimeEx />
    );
  }
}
export default ChooseTime;
