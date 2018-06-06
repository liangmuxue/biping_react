import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { NoticeBar, Modal, List, Button, WhiteSpace, WingBlank, Tabs, Badge, Checkbox } from 'antd-mobile';
import 'antd-mobile/es/modal/style/index.css';
import 'antd-mobile/es/toast/style/index.css';
import 'antd-mobile/es/checkbox/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/switch/style/index.css';
import Switch from 'antd-mobile/lib/switch/index';
import 'antd-mobile/es/notice-bar/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';
import SubItem from '../../../pageComponents/weixin/subscribe/subItem.jsx';
import ChooseTime from '../../../pageComponents/weixin/subscribe/ChooseTime.jsx';
import HeaderBar from '../../../components/headerBar';
import style from './subDetail.less';
import BaseComponent from '../baseComponent';
/**
* 订阅详情页面
* @author 梁慕学
* @Date  2018-4-25
*/

class SubDetail extends BaseComponent {
  constructor(props) {
    console.log('props in SubDetail', props);
    super(props);
    this.tmListener = null;
  }
  componentWillMount() {
    console.log('componentWillMount subdetail', this.props);
    const { params } = this.props;
    // 初始化时进行查询
    this.props.dispatch({
      type: 'subDetail/subscribeDetail',
      payload: { ...params },
    });
  }
  // 订阅所有
  subscribeAll() {
    const { typeId } = this.props.subDetailData.data;
    this.props.dispatch({
      type: 'subDetail/subscribeAll',
      payload: { typeId },
    });
  }
  // 订阅某小类
  subscribeItem(itemObj) {
    console.log('subscribeItem in', itemObj);
    const { remainDate, typeId, typeName } = this.props.subDetailData.data;
    const { preventFlag } = this.props;
    // 防止误点击
    if (preventFlag) {
      return null;
    }
    if (remainDate >= 0) {
      // 发起订阅请求
      this.props.dispatch({
        type: 'subDetail/subscribeItem',
        payload: {
          subItem: itemObj,
        },
      });
    } else {
      // 如果大类别没有开通，跳转到开通页面
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId, typeName, backPath: 'subDetail' },
        },
      });
    }
  }
  subTypeClick(subTypeObj) {
    console.log('subType in', subTypeObj.typeId);
    const { preventFlag } = this.props;
    console.log(`preventFlag is:${preventFlag}`);
    // 避免重复点击，用标志控制
    if (!preventFlag) {
      // 跳转到订阅包页面
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId: subTypeObj.typeId, typeName: subTypeObj.typeName, backPath: 'subDetail' },
        },
      });
    }
  }
  // 弹出时间选择框
  shareClick(event) {
    console.log('777777', this.props);
    this.props.dispatch({
      type: 'subDetail/chooseTime',
    });
  }
  // 关闭时间选择框
  closeShare() {
    const { dispatch } = this.props;
    console.log('closeShare in');
    dispatch({
      type: 'subDetail/closeShareSuc',
    });
  }
  render() {
    console.log('SubDetail render', this.props);
    const { subDetailData } = this.props;
    // 如果没有数据，需要首先进行查询
    if (!subDetailData || !subDetailData.data || !subDetailData.data.content) {
      return null;
    }
    const tabs = [
      { title: <Badge >交易所</Badge>, sub: '1' },
      { title: <Badge >涨跌幅</Badge> },
      { title: <Badge >成交量</Badge> },
    ];
    const { backPath } = subDetailData;

    let SwitchTab3 = (props) => {
      const { getFieldProps } = props.form;
      return (
        <List>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
                 initialValue: true,
                valuePropName: 'checked',
              })}
              onClick={(checked) => {
              console.log('checked is', checked);
              }}
            />}
          >
            <div>
              <span className={style.buyOnce}>单笔买入量  </span> <span className={style.passMoney}>超过60万人民币</span>
            </div>
          </List.Item>

          <List.Item
            extra={<Switch
              {...getFieldProps('Switch2', {
           initialValue: true,
           valuePropName: 'checked',
         })}
              onClick={(checked) => { console.log(checked); }}
            />}
          >
            <div>
              <span className={style.buyOnce}>单笔卖出量  </span> <span className={style.passMoney}>超过60万人民币</span>
            </div>
          </List.Item>
        </List>
      );
    };
    SwitchTab3 = createForm()(SwitchTab3);

    // 选择时间
    const { CheckboxItem } = Checkbox;
    let chooseHide = this.props.chooseHide;
    if (!chooseHide) {
      chooseHide = false;
      document.body.removeEventListener('touchmove', this.tmListener);
    }
    const chooseTime = (
      <WingBlank>
        <Button onClick={this.shareClick.bind(this)} className={style.timeBtn}><sapn>时间段</sapn><span className={style.timeVal}>5分钟,15分钟</span><img src="/images/msgImages/arrow1.png" /></Button>
        <WhiteSpace />
        <Modal
          popup
          visible={chooseHide}
          onClose={this.closeShare.bind(this)}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>时间段<span onClick={this.closeShare.bind(this)} >完成</span></div>} className="popup-list">
            {['3分钟', '5分钟', '10分钟', '15分钟'].map((i, index) => (
              <CheckboxItem className={style.timelv} key={index}>{i}</CheckboxItem>
           ))}
          </List>
          <List.Item>
            <Button type="primary" onClick={this.closeShare.bind(this)} style={{ hackeight: '20px' }}>确认</Button>
          </List.Item>
        </Modal>
      </WingBlank>
    );


    return (
      <div>
        <HeaderBar headerText={subDetailData.data.typeName} backRouteLink={backPath} {...this.props} />
        <div className={style.topBox}>
          <SubTypeCard key={subDetailData.data.typeId} typeObj={subDetailData.data} flag="1" subTypeClick={this.subTypeClick.bind(this)} />
        </div>
        <div className={style.listTitle}>【{subDetailData.data.typeName}】订阅管理<button className={style.openAll} onClick={this.subscribeAll.bind(this)} >打开所有</button></div>
        <div style={{ display: 'none' }}>
          {subDetailData.data.content.map(item =>
                        (<SubItem
                          abnormal={1}
                          key={item.typeId}
                          itemObj={item}
                          subscribeClick={this.subscribeItem.bind(this)}
                        />))}
        </div>

        <div >
          <div>
            <NoticeBar marqueeProps={{ loop: true, style: { textAligin: 'left', padding: '0 7.5px' } }}>
              目前仅支持火币和HADAX两个交易所
            </NoticeBar>
          </div>
          <div>
            <Tabs
              tabs={tabs}
              initialPage={1}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div style={{
         backgroundColor: '#fff',
        }}
              >  {subDetailData.data.content.map(item =>
                          (<SubItem
                            abnormal={1}
                            key={item.typeId}
                            itemObj={item}
                            subscribeClick={this.subscribeItem.bind(this)}
                          />))}
              </div>
              <div >
                <div className={style.coinSet}>异动时间段选择</div>
                {chooseTime}
                <div className={style.coinSet}>涨跌幅设置</div>
                <ChooseTime />
              </div>
              <div >
                <div className={style.coinSet}>交易量异动设置</div>
                <SwitchTab3 />
                <div className={style.dealTips}>注：根据币评大数据显示，90%以上的超过60万人民币的单笔交易代表庄家要控盘的信号</div>
              </div>
            </Tabs>
            <WhiteSpace />
          </div>
        </div>


        <div className={style.full} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return state.subDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(SubDetail));
// export default mobileRouteComponent(AccountInfo);
