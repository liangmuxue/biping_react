import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/switch/style/index.css';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';


import style from './myself.less';
/**
* 个人中心
* @author 梁慕学
* @Date  2017-12-25
*/

const Item = List.Item;
const Brief = Item.Brief;

function getUserMain(propsAll) {

}

class BasicInput extends Component {
  constructor(props) {
    console.log('props in MsgDetail', props);
    super(props);
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
  changePage(mesObj) {
    // 跳转到购买记录页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'buyHistory' },
    });
  }
  render() {
    console.log('MsgDetail render', this.props);
    if (!this.props.data) {
      return (<div>none</div>);
    }
    const { dispatch, data } = this.props;
    const userMain = data;
    console.log('myself render', userMain);

    let SwitchExample = (props) => {
      const { getFieldProps } = props.form;
      return (
        <List>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
                initialValue: userMain.isPush == 0,
                valuePropName: 'checked',
              })}
              onClick={(checked) => {
                dispatch({
                type: 'myself/ifpush',
                payload: { ifpush: checked },
              });
            }}
            />}
          >
            <div>
              <img src="/images/myselfImg/1.png" className={style.pushMsgPic} alt="" /> <span>推送消息  </span>
            </div>
          </List.Item>
        </List>
      );
    };
    SwitchExample = createForm()(SwitchExample);

    return (<div>
      <div className={style.mineBox}>
        <div><img src={userMain.headUrl} className={style.minePic} /></div>
        <div className={style.mineName}>{userMain.name}</div>
      </div>
      <List className={style.myList}>
        <Item arrow="horizontal" onClick={() => {}}>
          <div onClick={this.changePage.bind(this)} ><img src="/images/myselfImg/2.png" className={style.historyPic} /> <span className={style.history}>购买记录</span> </div>

        </Item>
      </List>

      <SwitchExample />
      <div className={style.tips}>关闭后，你将无法收到服务号推送的及时消息</div>
            </div>);
  }
}


function mapStateToProps(state) {
  console.log(`myself111111${state}`, state.myself);
  return state.myself;
}

export default connect(mapStateToProps)(mobileRouteComponent(BasicInput));
