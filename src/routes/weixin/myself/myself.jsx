import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/switch/style/index.css';
import style from './myself.less';
/**
* 老人账号信息页面
* @author 梁慕学
* @Date  2017-12-25
*/
let SwitchExample = (props) => {
  const { getFieldProps } = props.form;
  return (
    <List>
      <List.Item
        extra={<Switch
          {...getFieldProps('Switch1', {
            initialValue: true,
            valuePropName: 'checked',
          })}
          onClick={(checked) => { console.log(checked); }}
        />}
      ><div>
            <img src="/assets/myselfImg/1.png" className={style.pushMsgPic}/ > <span>推送消息  </span>
      </div></List.Item>
        </List>
  );
};
SwitchExample = createForm()(SwitchExample);
const Item = List.Item;
const Brief = Item.Brief;

class BasicInput extends React.Component {
  constructor(props) {
    super(props);
    // 设置 initial state
    this.state = {
      value:1
    };
  }
  onSubmit() {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert('Validation failed');
      }
    });
  }
  onReset() {
    this.props.form.resetFields();
  }
  validateAccount(rule, value, callback) {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four charactors for account'));
    }
  }

  render() {
    return (<div>
<div className={style.mineBox}>
    <div><img src="/assets/myselfImg/mine_pic.png" className={style.minePic }/></div>
    <div className={style.mineName}>币评</div>
</div>
<List className={style.myList}>
  <Item arrow="horizontal" onClick={() => {}}>
  <div><img src="/assets/myselfImg/2.png" className={style.historyPic}/> <span className={style.history}>购买记录</span> </div>

  </Item>
</List>

<SwitchExample />
  <div className={style.tips}>关闭后，你将无法收到服务号推送的及时消息</div>
</div>);
}
}

function mapStateToProps({ state }) {
  return { state };
}

export default connect(mapStateToProps)(mobileRouteComponent(BasicInput));
