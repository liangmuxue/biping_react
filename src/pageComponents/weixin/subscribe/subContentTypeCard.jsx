import React from 'react';
import { createForm } from 'rc-form';
import Modal from 'antd-mobile/lib/modal/index';
import NoticeBar from 'antd-mobile/lib/notice-bar/index';
import List from 'antd-mobile/lib/list/index';
import Button from 'antd-mobile/lib/button/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Tabs from 'antd-mobile/lib/tabs/index';
import Badge from 'antd-mobile/lib/badge/index';
import Checkbox from 'antd-mobile/lib/checkbox/index';
import 'antd-mobile/es/checkbox/style/index.css';
import Switch from 'antd-mobile/lib/switch/index';
import 'antd-mobile/es/switch/style/index.css';
import 'antd-mobile/es/notice-bar/style/index.css';
import 'antd-mobile/es/modal/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import style from './subContentType.less';
import ChooseTime from './chooseTime.jsx';
import SubItem from './subItem.jsx';

// import 'antd-mobile/dist/antd-mobile.css';


/**
* 订阅小项内容组件
* @date        2018-04-20
* @author 梁慕学
*/
class SubContentType extends React.Component {
  constructor(props) {
    super(props);
    console.log('thisprops is', props);
    this.state = {
    };
  }
  // 打开时间段选择
  shareClick(event) {
    this.props.shareClick();
  }
  // 关闭时间段选择
  closeShare() {
    this.props.closeShare();
  }
  // 订阅交易所
  subscribeItem(itemObj) {
    this.props.subscribeItem(itemObj);
  }
  subscribeAll() {
    this.props.subscribeAll();
  }
  render() {
    const { subTypeContent } = this.props;
    const subDetailData = subTypeContent.subDetailData;
    console.log('subTypeContent11111', subDetailData);
    const timeTypeArea = subDetailData
    // 选择时间
    const { CheckboxItem } = Checkbox;
    let chooseHide = subTypeContent.chooseHide;
    if (!chooseHide) {
      chooseHide = false;
      document.body.removeEventListener('touchmove', this.tmListener);
    }

    const tabs = [
      { title: <Badge >交易所</Badge> },
      { title: <Badge >涨跌幅</Badge> },
      { title: <Badge >成交量</Badge> },
    ];

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
              <span className={style.buyOnce}>单笔买入量 </span>
              <span className={style.passMoney}>超过60万人民币</span>
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
              <span className={style.buyOnce}>单笔卖出量  </span>

              <span className={style.passMoney}>超过60万人民币</span>
            </div>
          </List.Item>
        </List>
      );
    };
    SwitchTab3 = createForm()(SwitchTab3);

    const checkTime = (
      <div >
        <Button onClick={this.shareClick.bind(this)} className={style.timeBtn}><sapn>时间段</sapn><span className={style.timeVal}>5分钟,15分钟</span><img src="/images/msgImages/arrow1.png" className={style.arrow1} /></Button>
        <WhiteSpace />
        <Modal
          popup
          visible={chooseHide}
          onClose={this.closeShare.bind(this)}
          animationType="slide-up"
        >
          <List renderHeader={() => <div className={style.chooseTimes}>时间段<span onClick={this.closeShare.bind(this)}className={style.finish} >完成</span><span onClick={this.closeShare.bind(this)} className={style.cancel}>取消</span></div>} className="popup-list">
            {subDetailData.data.timeTypeArea.map(item => (
              <CheckboxItem className={style.timelv} key={item.gainHold}  >{item.gainHold}
              </CheckboxItem>
           ))}
          </List>
        </Modal>
      </div>
    );

    return (
      <div>
        <Tabs
          tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ position: 'relative' }}>
            <div className={style.listTitle} style={{ marginTop: 0, height: '1.74rem' }}>【{subDetailData.data.typeName}】订阅管理<button className={style.openAll} onClick={this.subscribeAll.bind(this)} >打开所有</button></div>

            <div className={style.noticeBar}>
              <NoticeBar marqueeProps={{ loop: true, style: { textAligin: 'left', padding: '0 7.5px' } }}>
                      目前仅支持火币和HADAX两个交易所
              </NoticeBar>
            </div>
            <div style={{
         backgroundColor: '#fff',
        }}
            >  {subDetailData.data.exchangeArea.map(item =>
                          (<SubItem
                            abnormal={1}
                            key={item.transVerbId}
                            itemObj={item}
                            subscribeClick={this.subscribeItem.bind(this)}
                          />))}
            </div>
          </div>
          <div >
            <div className={style.coinSet}>异动时间段选择</div>
            {checkTime}
            <div className={style.coinSet}>涨跌幅设置</div>
            <ChooseTime chooseObj={subDetailData} />
          </div>
          <div >
            <div className={style.coinSet}>交易量异动设置</div>
            <SwitchTab3 />
            <div className={style.dealTips}>注：根据币评大数据显示，90%以上的超过60万人民币的单笔交易代表庄家要控盘的信号</div>
          </div>
        </Tabs>
        <WhiteSpace />
      </div>

    );
  }
}
export default SubContentType;
