import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace, Result, Icon, Button, WingBlank } from 'antd-mobile';
import { List, Checkbox, Flex } from 'antd-mobile';
import OpenCard from '../../../pageComponents/weixin/toOpen/openCard.jsx';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/checkbox/style/index.css';

import style from './toOpen.less';
import styles from '../myself/myself.less';

/**
 * 订阅包
 * @author 赵永帅
 * @Date 2018-4-25
 */

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

<<<<<<< HEAD
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Test);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Test.__proto__ || Object.getPrototypeOf(Test)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (val) {
      console.log(val);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Test, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = [{ value: 0, label: '1个月20元' }, { value: 1, label: '3个月60元' }, { value: 3, label: '6个月120元' }, { value: 4, label: '1年200元' }];
      return React.createElement(
        'div',
        null,
        React.createElement(
          List,
          null,
          data.map(function (i) {
            return React.createElement(
              CheckboxItem,
              { key: i.value, onChange: function onChange() {
                  return _this2.onChange(i.value);
                } }, 
              i.label
            );
          })
        )
      );
    }
  }]);

  return Test;
}(React.Component);

 const ButtonExample = () => (
   <WingBlank className={style.transfrom}>
           <Button type="primary" className={style.toGret}>去获取</Button><WhiteSpace />
   </WingBlank>
 )

 const ButtonPay = () => (
   <WingBlank className={style.pay}>
           <Button type="primary" className={style.toPay}>确认支付</Button><WhiteSpace />
   </WingBlank>
 )


function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;

  return (
      <div>
      <div className={styles.mineBox}>
          <div><img src="/assets/myselfImg/mine_pic.png" className={styles.minePic }/></div>
          <div className={styles.mineName}>币评</div>
      </div>

        <div className={style.introduce}>
          <img src="/assets/toOpen/open_bg.png" className={style.openbg}/>
          <div className={style.introduceTitle}>套餐介绍</div>
          <div className={style.slogan}>拉好友、<span className={style.colorFont}>免费</span>开通</div>
          <ButtonExample  />
          <div className={style.matterBox}>每邀请1位好友关注「币评区块链」公众号、免费获得「币事件」服务<span className={style.redData}>30</span>天</div>
        </div>
          <Test />

          <div className={style.full}></div>
          <div className={style.payBottom}>
            <ButtonPay />
            <div className={style.payMoney}>支付金额：<span className={style.sum}>20</span>元</div>
          </div>
      </div>




  );
}

class AccountInfo extends Component {
=======
class toOpenDetail extends Component {
>>>>>>> 1cc7cd35b7f4cf89a8100615d815fe5f24732175
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  openClick(type) {
    console.log('dddddddd');
  }
  render() {
    console.log('toOpenDetail render', this.props.toOpen);
    if (!this.props.toOpen.data) {
      return null;
    }
    const { data } = this.props.toOpen;
    const { typeId } = this.props.toOpen;
    const { dispatch } = this.props;
    console.log('content in subdetail', data);
    return (
      <div>
        <OpenCard openObj={this.props.systemUser} openClick={this.openClick.bind(this)} />
        {data.map((i) => {
          return React.createElement(
            CheckboxItem,
            {
              key: i.count,
              onChange: function onChange() {
                console.log('i.count');
                // 请订阅包信息
                dispatch({
                  type: 'toOpen/toOpenPayDetail',
                  payload: { verbId: typeId, commoId: i.commid },
                });
              },
            },
            i.name, i.count, '元',
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dd666666', state);
  // console.log('toooooo', { toOpen: state.toOpen, systemUser: state.app.systemUser });
  return { toOpen: state.toOpen, systemUser: state.app.systemUser };
}

export default connect(mapStateToProps)(mobileRouteComponent(toOpenDetail));
// export default mobileRouteComponent(AccountInfo);
