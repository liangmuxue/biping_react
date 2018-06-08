import List from 'antd-mobile/lib/list/index';
import Switch from 'antd-mobile/lib/switch/index';
import 'antd-mobile/es/switch/style/index.css';
import { createForm } from 'rc-form';
import 'antd-mobile/es/button/style/index.css';
import React from 'react';
import style from './subItem.less';


/**
* 订阅小项内容组件
* @date        2018-04-20
* @author 梁慕学
*/

class SubItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in SubItem', props);
    this.state = {
    };
  }
  // 订阅某小类
  subscribe(e) {
    console.log('subscribe in,props:', this.props);
    this.props.subscribeClick(this.props.itemObj);
  }
  render() {
    const {
      itemObj, dispatch, flag, abnormal,
    } = this.props;
    console.log('itemObj is', itemObj);
    let SwitchExample = (props) => {
      const { getFieldProps } = props.form;
      // 是否订阅
      let isSub = null;
      if (itemObj.isSub) {
        isSub = itemObj.isSub;
      } else if (itemObj.hasSubscribe) {
        isSub = itemObj.hasSubscribe;
      }
      // 名称
      let typeName = null;
      if (itemObj.typeName) {
        typeName = itemObj.typeName;
      } else if (itemObj.exchangeName) {
        typeName = itemObj.exchangeName;
      }
      // 图片路径
      let headImg = null;
      if (itemObj.headImg) {
        headImg = itemObj.headImg;
      } else if (itemObj.exchangeIcon) {
        headImg = itemObj.exchangeIcon;
      }
      return (
        <List>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
                  initialValue: isSub === 1,
                  valuePropName: 'checked',
                })}
              onClick={this.subscribe.bind(this)}
            /> // 敬请期待
          }
          >

            {itemObj.headImg === '' ? <span>#</span> : <img src={headImg} className={style.subItemLogo} alt="" />}
            <span className={style.toMsg}>{typeName} </span>
          </List.Item>
        </List>
      );
    };
    SwitchExample = createForm()(SwitchExample);
    return (
      <SwitchExample />
    );
  }
}

export default SubItem;
