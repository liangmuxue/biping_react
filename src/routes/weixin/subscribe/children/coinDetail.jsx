import React from 'react';
import { connect } from 'dva';
import List from 'antd-mobile/lib/list/index';
import Switch from 'antd-mobile/lib/switch/index';
import Button from 'antd-mobile/lib/button/index';
import Picker from 'antd-mobile/lib/picker/index';
import 'antd-mobile/es/picker-view/style/index.css';
import 'antd-mobile/es/picker/style/index.css';
import 'antd-mobile/es/switch/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import { createForm } from 'rc-form';
import styles from './coinDetail.less';
import BaseComponent from '../../baseComponent';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import NewCheckTime from '../../../../pageComponents/weixin/subscribe/newCheckTimeCard';

class CoinDetail extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
    const { params, coinDetail } = this.props;
    this.props.dispatch({
      type: 'coinDetail/detail',
      payload: { ...params },
      selectTimeArr: [],
    });
  }
  changeData(str, lb = 'time') {
    let returnArr = [];
    let arr = str.split(',');
    for (var i in arr) {
      let lbdata = null;
      if (lb == 'time') {
        lbdata = arr[i];
      } else if (lb == 'gainHold') {
        lbdata = `> ${arr[i]*100}%`;
      } else if (lb == 'loseHold') {
        lbdata = `< ${arr[i]*100}%`;
      }
      let obj = {
        value: arr[i],
        label: lbdata,
      }
      returnArr.push(obj);
    }
    return returnArr;
  }
  confirmClick() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinDetailConfirm',
      },
    });
    const { coinDetail, params } = this.props;
    const { detailData } = coinDetail;
    const { data } = detailData;
    let payloadData = null;
    var that = this;
    if (params.verbId === 717) {
      payloadData = {
        exchangeId: params.exchangeId,
        verbId: params.verbId,
        symbolId: params.symbolId,
        buyFlag: data.detail.buyFlag,
        sellFlag: data.detail.sellFlag,
        pushFlag: data.detail.pushFlag,
      };
    } else if (params.verbId === 718) {
      payloadData = {
        exchangeId: params.exchangeId,
        verbId: params.verbId,
        symbolId: params.symbolId,
        pushFlag: data.detail.pushFlag,
      };
      if (that.state.selectTimeArr) {
        payloadData.timeStr = that.state.selectTimeArr.join(',');
      } else {
        payloadData.timeStr = data.detail.timeStr;
      }
      if (data.detail.gainHold.length) {
        payloadData.gainHold = data.detail.gainHold.join(',');
      } else {
        payloadData.gainHold = data.detail.gainHold;
      }
      if (data.detail.loseHold.length) {
        payloadData.loseHold = data.detail.loseHold.join(',');
      } else {
        payloadData.loseHold = data.detail.loseHold;
      }
    } else {
      payloadData = data.detail;
      payloadData.exchangeId = params.exchangeId;
      payloadData.verbId = params.verbId;
      payloadData.symbolId = params.symbolId;
    }
    this.props.dispatch({
      type: 'coinDetail/subscribeAdd',
      payload: payloadData,
      params: {
        // pageName: 'coinList',
        pageName: 'subscribeResult',
        params: {
          exchangeId: params.exchangeId,
          verbId: params.verbId,
          backPath: 'coinDetail',
          tabName: params.tabName,
        },
      },
    });
  }
  checkTimeSubmit(arr) {
    this.setState({
      selectTimeArr: arr,
    });
  }
  render() {
    const { coinDetail, params } = this.props;
    const { detailData } = coinDetail;
    if (!detailData) {
      return null;
    }
    const { data } = detailData;
    let SwitchExample = (props) => {
      const { getFieldProps } = props.form;
      let contenthtml = null;
      if (params.verbId === 717) {
        contenthtml = (
          <List>
            <List.Item
              extra={<Switch
                {...getFieldProps('Switch1', {
                  initialValue: data.detail.buyFlag,
                  valuePropName: 'checked',
                })}
                onClick={(checked) => { data.detail.buyFlag = Number(checked); }}
              />}
            >单笔买入量 <em className={styles.itemEm}>超过60万人民币</em>
            </List.Item>
            <List.Item
              extra={<Switch
                {...getFieldProps('Switch2', {
                  initialValue: data.detail.sellFlag,
                  valuePropName: 'checked',
                })}
                onClick={(checked) => { data.detail.sellFlag = Number(checked); }}
              />}
            >单笔卖出量 <em className={styles.itemEm}>超过60万人民币</em>
            </List.Item>
            <List.Item
              className={styles.wechatItem}
              extra={<Switch
                {...getFieldProps('Switch3', {
                  initialValue: data.detail.pushFlag,
                  valuePropName: 'checked',
                })}
                onClick={(checked) => { data.detail.pushFlag = Number(checked); }}
              />}
            >微信推送
            </List.Item>
          </List>
        );
      } else if (params.verbId === 718) {
        const gainHoldArr1 = this.changeData(data.dic.gainHoldStr, 'gainHold');
        const loseHoldArr1 = this.changeData(data.dic.loseHoldStr, 'loseHold');
        const timeArr1 = this.changeData(data.dic.timeStr, 'time');
        let checkedTimeArr1 = data.detail.timeStr.split(',');
        const thisTimeArr = this.state.selectTimeArr;
        if (thisTimeArr && thisTimeArr.length > 0) {
          checkedTimeArr1 = thisTimeArr;
        }
        contenthtml = (
          <List>
            <NewCheckTime checkTimeObj={timeArr1} checkTime={checkedTimeArr1} checkTimeSubmit={this.checkTimeSubmit.bind(this)} />
            <Picker
              data={gainHoldArr1}
              cols={1}
              {...getFieldProps('district1')}
              value={[`${data.detail.gainHold}`]}
              onOk={(val) => { data.detail.gainHold = val; }}
              // format={(val) => { return `>${val*100}%`; }}
            >
              <List.Item arrow="horizontal">涨幅</List.Item>
            </Picker>
            <Picker
              data={loseHoldArr1}
              cols={1}
              {...getFieldProps('district2')}
              value={[`${data.detail.loseHold}`]}
              onOk={(val) => { data.detail.loseHold = val; }}
              // format={(val) => { return `<${val*100}%`; }}
            >
              <List.Item arrow="horizontal">跌幅</List.Item>
            </Picker>
            <List.Item
              className={styles.wechatItem}
              extra={<Switch
                {...getFieldProps('Switch3', {
                  initialValue: data.detail.pushFlag,
                  valuePropName: 'checked',
                })}
                onClick={(checked) => { data.detail.pushFlag = Number(checked); }}
              />}
            >微信推送
            </List.Item>
          </List>
        );
      } else {
        const arr1 = [
          {
            label: '一小时',
            value: '一小时',
          },
        ];
        contenthtml = (
          <div>
            <List className={styles.listCon}>
              <List.Item
                extra={<Switch
                  {...getFieldProps('Switch1', {
                    initialValue: data.detail.macdFlag,
                    valuePropName: 'checked',
                  })}
                  onClick={(checked) => { data.detail.macdFlag = Number(checked); }}
                />}
              >MACD
              </List.Item>
              <Picker
                data={arr1}
                cols={1}
                {...getFieldProps('district1')}
                value={['一小时']}
                disabled={true}
              >
                <List.Item arrow="horizontal">时间段</List.Item>
              </Picker>
            </List>
            <List className={styles.listCon}>
              <List.Item
                extra={<Switch
                  {...getFieldProps('Switch2', {
                    initialValue: data.detail.kdjFlag,
                    valuePropName: 'checked',
                  })}
                  onClick={(checked) => { data.detail.kdjFlag = Number(checked); }}
                />}
              >KDJ
              </List.Item>
              <Picker
                data={arr1}
                cols={1}
                {...getFieldProps('district2')}
                value={['一小时']}
                disabled={true}
              >
                <List.Item arrow="horizontal">时间段</List.Item>
              </Picker>
            </List>
            <List className={styles.listCon}>
              <List.Item
                extra={<Switch
                  {...getFieldProps('Switch3', {
                    initialValue: data.detail.bollFlag,
                    valuePropName: 'checked',
                  })}
                  onClick={(checked) => { data.detail.bollFlag = Number(checked); }}
                />}
                >布林带
              </List.Item>
              <Picker
                data={arr1}
                cols={1}
                {...getFieldProps('district3')}
                value={['一小时']}
                disabled={true}
              >
                <List.Item arrow="horizontal">时间段</List.Item>
              </Picker>
            </List>
          </div>
        );
      }
      return (
        contenthtml
      );
    };
    SwitchExample = createForm()(SwitchExample);
    return (
      <div>
        {
          params.verbId !== 730 ?
          (
            <p className={styles.p1}>{params.verbId === 718 ? '异动时间段选择' : '交易量异动设置'}</p>
          ) : null
        }
        <SwitchExample />
        {
          params.verbId !== 730 ?
          (
            <p className={styles.p2}>关闭后，将无法收到该交易对的微信推送消息</p>
          ) : null
        }
        <Button className={styles.cofrimBtn} onClick={() => this.confirmClick()} type="primary">提交</Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    coinDetail: state.coinDetail,
  };
};

export default connect(mapStateToProps)(mobileRouteComponent(CoinDetail));
