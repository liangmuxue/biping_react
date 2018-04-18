import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import md5 from 'md5';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import 'antd/es/form/style/index.css';
import 'antd/es/input/style/index.css';
import 'antd/es/button/style/index.css';
import styles from './index.less';

const FormItem = Form.Item;

const Login = ({
  loading,
  app,
  isLoginFail,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    console.log('app in', app);
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      // 密码转md5
      const loginData = Object.assign(values);
      loginData.password = md5(loginData.password);
      dispatch({ type: 'app/login', payload: loginData });
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src="" />
        <span>天年宝</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('loginName', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          {app.isLoginFail ? <span>用户名或密码错误</span> : null}
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            Sign in
          </Button>
          <p>
            <span>Username is：guest</span>
            <span>Password：guest</span>
          </p>
        </Row>

      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(Form.create()(Login));
