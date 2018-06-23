import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/switch/style/index.css';
import { createForm } from 'rc-form';
import React, { Component } from 'react';
import { connect } from 'dva';
import List from 'antd-mobile/lib/list/index';
import Switch from 'antd-mobile/lib/switch/index';
import Hammer from 'react-hammerjs';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import BaseComponent from '../baseComponent';
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

class BasicInput extends BaseComponent {
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
  changePage() {
    // 跳转到购买记录页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'buyHistory', params: { backPath: 'myself' } },
    });
  }

  changePageToLike() {
    // 跳转到我关注的页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'myLike', params: { backPath: 'myself' } },
    });
  }

  clearStorage() {
    console.log('clear store in');
    localStorage.clear();
  }
  componentDidMount() {
    console.log('componentDidMount myself', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'myself/detailQuery',
      payload: { ...this.props.params },
    });
  }
  render() {
    console.log('MsgDetail render', this.props);
    if (!this.props.data) {
      return null;
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
            <div className={style.toMsg}>
              <img src="/images/myselfImg/1.png" className={style.pushMsgPic} alt="" /> <span className={style.toMsg}>推送消息  </span>
            </div>
          </List.Item>
        </List>
      );
    };
    SwitchExample = createForm()(SwitchExample);
    return (<div>
      <div className={style.mineBox}>
        <div><img src={userMain.headUrl} className={style.minePic} alt="" /></div>
        <div className={style.mineName}>{userMain.name}</div>
      </div>
      <List className={style.myList}>
        <Item arrow="horizontal" onClick={this.changePage.bind(this)}>
          <div>
            <img src="/images/myselfImg/2.png" className={style.historyPic} alt="" />
            <span className={style.history}>购买记录</span>
          </div>
        </Item>
      </List>
      <SwitchExample />
      <Hammer onDoubleTap={this.clearStorage.bind(this)}>
        <div className={style.tips}>关闭后，你将无法收到服务号推送的及时消息</div>
      </Hammer>
      <div className={style.version}>
        <div>@ 2018 biping.io</div>
        <div>V1.0</div>
      </div>
    </div>);
  }
}


function mapStateToProps(state) {
  console.log(`myself111111${state}`, state.myself);
  return state.myself;
}

export default connect(mapStateToProps)(mobileRouteComponent(BasicInput));
