import React from 'react';
import { createForm } from 'rc-form';
import List from 'antd-mobile/lib/list/index';
import Picker from 'antd-mobile/lib/picker/index';
import 'antd-mobile/es/picker-view/style/index.css';
import 'antd-mobile/es/picker/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import style from './chooseTime.less';
// import 'antd-mobile/dist/antd-mobile.css';

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
    console.log('gainOrLose1555', value);
    const { chooseObj } = this.props;
    console.log('chooseObj', chooseObj);
    // 涨幅
    const { gainArea } = chooseObj.data;
    this.setState({ gainValue: value });
  }
  // 跌幅赋值
  loseValue(value) {
    // 跌幅
    const { loseArea } = chooseObj.data;
    let itemObj = null;
    loseArea.map((item) => {
      if (item.transVerbId = value) {
        item.hasSubscribe = 0;
        itemObj = item;
      }
    });
    // 类别（涨跌幅，买入卖出）
    itemObj.itemType = 'loseArea';
    this.props.gainOrLose(itemObj);
  }
  componentWillMount() {
    console.log('componentWillMount chooseTime', this.props);
    this.setState({
      downdistrict: [],
      district: [],
      gainValue: [8],
    });
  }
  render() {
    const changeAct = function (data) {
      console.log('changeAct in', data);
    };
    const { chooseObj } = this.props;
    console.log('chooseObj', chooseObj);
    const { gainArea, loseArea } = chooseObj.data;
    const { downdistrict, district } = this.state;
    // 防止重复加载
    if (!district || district.length === 0) {
      loseArea.map(item => (
        downdistrict.push({ value: item.transVerbId, label: `<-${item.loseHold * 100}%` })
      ));
      gainArea.map(item => (
        district.push({ value: item.transVerbId, label: `>${item.gainHold * 100}%` })
      ));
    }
    console.log('this.state.district', this.state.district);
    console.log(`this.state.gainValue:${this.state.gainValue}`);
    let ChooseTimeEx = (props) => {
      const { getFieldProps } = props.form;
      return (
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker
            data={district}
            cols={1}
            title="涨幅"
            value={this.state.gainValue}
            onOk={v => this.gainValue(v)}
          >
            <List.Item arrow="horizontal" >涨幅</List.Item>
          </Picker>
          <Picker
            data={downdistrict}
            cols={1}
            value={this.state.loseValue}
            title="跌幅"
            onOk={v => this.gainValue(v)}
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
