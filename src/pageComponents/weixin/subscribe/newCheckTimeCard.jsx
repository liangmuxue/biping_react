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

class NewCheckTime extends React.Component {
  constructor(props) {
    super(props);
    const { checkTime } = this.props;
    // 选中的item
    this.state = {
      checkItem: checkTime,
      chooseHide: false,

    };
  }
  // 时间选择确定
  timeSubmit() {
    this.setState({
      chooseHide: false,
    });
    console.log('checkTimeSubmit', this.state.checkItem);
    this.props.checkTimeSubmit(this.state.checkItem);
  }
  // 打开
  shareClick() {
    this.setState({
      chooseHide: true,
    });
  }
  closeShare() {
    this.setState({
      chooseHide: false,
    });
  }
  timeClick(item) {
    const arr = this.state.checkItem;
    const index = arr.indexOf(item.label);
    if (index >= 0) {
      arr.splice(index, 1);
    } else {
      arr.push(item.label);
    }
    this.setState({
      checkItem: arr,
    });
    // this.props.timeClick(item);
  }
  render() {
    const { checkTimeObj } = this.props;
    // 选择时间
    const { CheckboxItem } = Checkbox;
    return (
      <div >
        <Button onClick={this.shareClick.bind(this)} className={style.timeBtn}><sapn>时间段</sapn>
          <span className={style.timeVal}>{this.state.checkItem.join('分钟,')}分钟</span>
          <img src="/images/msgImages/arrow1.png" className={style.arrow1} alt=">" />
        </Button>
        <WhiteSpace />
        <Modal
          popup
          visible={this.state.chooseHide}
          onClose={this.closeShare.bind(this)}
          animationType="slide-up"
        >
          <List
            renderHeader={() =>
              (
                <div className={style.chooseTimes}>时间段
                  <span onClick={this.timeSubmit.bind(this)} className={style.finish} >
                    完成
                  </span>
                  <span onClick={this.closeShare.bind(this)} className={style.cancel}>
                    取消
                  </span>
                </div>
              )
            }
            className="popup-list"
          >
            {checkTimeObj.map(item => (
              <CheckboxItem
                onClick={() => this.timeClick(item)}
                className={style.timelv}
                checked={this.state.checkItem.indexOf(item.label) >= 0}
                key={item.value}
              >
                {item.label}分钟
              </CheckboxItem>
           ))}
          </List>
        </Modal>
      </div>
    );
  }
}

export default NewCheckTime;
