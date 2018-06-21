import List from 'antd-mobile/lib/list/index';
import Modal from 'antd-mobile/lib/modal/index';
import Button from 'antd-mobile/lib/button/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Checkbox from 'antd-mobile/lib/checkbox/index';

import 'antd-mobile/es/checkbox/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import 'antd-mobile/es/switch/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import React from 'react';
import style from './subContentType.less';
/**
* 时间段选择
* @Date 2018-6-9
* @author 赵永帅
*/
class CheckTime extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in SubItem', props);
    const {
      checkTimeObj,
    } = this.props;
    // 选中的item
    const checkItem = [];
    console.log('checkTimeObj is', checkTimeObj);
    const { subDetailData } = checkTimeObj;
    console.log('subDetailData is', subDetailData);
    subDetailData.data.timeTypeArea.map((item) => {
      checkItem.push(item);
    });
    this.state = {
      checkItem,
    };
  }
  // 时间选择确定
  checkTimeSubmit() {
    console.log('checkTimeSubmit:', this.state.checkItem);
    const itemObj = this.state.checkItem;
    const { remainDate, typeId, typeName } = this.props.checkTimeObj.subDetailData.data;
    if (remainDate >= 0) {
      console.log('checkTimeSubmit', itemObj);
      // 时间选择确定
      this.props.checkTimeObj.dispatch({
        type: 'subDetail/checkTimeSubmit',
        payload: {
          subItem: itemObj,
        },
      });
    } else {
      // 如果大类别没有开通，跳转到开通页面
      this.props.checkTimeObj.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId, typeName, backPath: 'subDetail' },
        },
      });
    }
  }
  // 关闭
  closeShare() {
    const { dispatch } = this.props.checkTimeObj;
    console.log('closeShare in');
    dispatch({
      type: 'subDetail/closeShare',
    });
    console.log('subscribe in,props:', this.state.checkItem);
  }
  // 打开
  shareClick() {
    const { dispatch } = this.props.checkTimeObj;
    dispatch({
      type: 'subDetail/chooseTime',
    });
  }
  // 时间选择
  switchPayType(item) {
    console.log('item777777', item);
    // 判断是否存在已选中里面
    if (item.hasSubscribe === 1) {
      item.hasSubscribe = 0;
    } else if (item.hasSubscribe === 0) {
      item.hasSubscribe = 1;
    }
    console.log('item88888', item);
    this.setState({
      checkItem: this.state.checkItem,
    });
    console.log('999999999', this.state.checkItem);
  }
  render() {
    const {
      checkTimeObj,
    } = this.props;
    console.log('checkTimeObj is', checkTimeObj);
    const { subDetailData } = checkTimeObj;
    console.log('this.this.state. is', this.state.checkItem);
    console.log('subDetailData is', subDetailData.data.timeTypeArea);
    let buttonContent = '';
    subDetailData.data.timeTypeArea.map((item) => {
      if (item.hasSubscribe === 1) {
        buttonContent = `${item.minuteCount}分钟,${buttonContent}`;
      }
    });
    console.log('buttonContent', buttonContent);
    // 隐藏或者显示时间
    let { chooseHide } = checkTimeObj;
    if (!chooseHide) {
      chooseHide = false;
      // document.body.removeEventListener('touchmove', this.tmListener);
    }
    // 选择时间
    const { CheckboxItem } = Checkbox;
    return (
      <div >
        <Button onClick={this.shareClick.bind(this)} className={style.timeBtn}><sapn>时间段</sapn>
          <span className={style.timeVal}>{buttonContent}</span>
          <img src="/images/msgImages/arrow1.png" className={style.arrow1} alt=">" />
        </Button>
        <WhiteSpace />
        <Modal
          popup
          visible={chooseHide}
          onClose={this.closeShare.bind(this)}
          animationType="slide-up"
        >
          <List
            renderHeader={() =>
              (<div className={style.chooseTimes}>时间段
                <span onClick={this.checkTimeSubmit.bind(this)}className={style.finish} >
                  完成
                </span>
                <span onClick={this.closeShare.bind(this)} className={style.cancel}>
                  取消
                </span>
               </div>)}
            className="popup-list"
          >
            {subDetailData.data.timeTypeArea.map(item => (
              <CheckboxItem
                onChange={() => this.switchPayType(item)}
                className={style.timelv}
                checked={item.hasSubscribe === 1}
                key={item.transVerbId}
              >
                {item.minuteCount}分钟
              </CheckboxItem>
           ))}
          </List>
        </Modal>
      </div>
    );
  }
}

export default CheckTime;
