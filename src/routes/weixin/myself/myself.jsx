import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import style from './myself.less';
/**
* 老人账号信息页面
* @author 梁慕学
* @Date  2017-12-25
*/

const Item = List.Item;

class BasicInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
  validateAccount() {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('At least four charactors for account'));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<div>ttt</div>)
  }
}
