import List from 'antd-mobile/lib/list/index';
import Switch from 'antd-mobile/lib/switch/index';
import 'antd-mobile/es/switch/style/index.css';
import { createForm } from 'rc-form';
import 'antd-mobile/es/button/style/index.css';
import React from 'react';
import style from './subContentType.less';


/**
* 订阅买入量或者卖出量
* @Date 2018-6-9
* @author 赵永帅
*/

class BuyOrPayCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in SubItem', props);
    this.state = {
    };
  }
  // 开通某小类
  gainOrLose() {
    console.log('subscribe in,props:', this.props);
    // 类别（涨跌幅，买入卖出）
    this.props.buyObj.itemType = 'volArea';
    this.props.gainOrLose(this.props.buyObj);
  }
  render() {
    const {
      buyObj,
    } = this.props;
    console.log('buyObj is', buyObj);
    let textArea = null;
    if (buyObj.bigVolType === 1) {
      textArea = '单笔买入量';
    } else if (buyObj.bigVolType === 2) {
      textArea = '单笔卖出量';
    }
    let SwitchTab3 = (props) => {
      const { getFieldProps } = props.form;
      return (
        <List>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
                 initialValue: buyObj.hasSubscribe === 1,
                valuePropName: 'checked',
              })}
              onClick={this.gainOrLose.bind(this)}
            />}
          >
            <div>
              <span className={style.buyOnce}>{textArea}</span>
              <span className={style.passMoney}>超过60万人民币</span>
            </div>
          </List.Item>
        </List>
      );
    };
    SwitchTab3 = createForm()(SwitchTab3);
    return (
      <SwitchTab3 />
    );
  }
}

export default BuyOrPayCard;
