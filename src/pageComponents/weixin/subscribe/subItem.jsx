import List from 'antd-mobile/lib/list/index';
import Button from 'antd-mobile/lib/button/index';
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
    const { itemObj, dispatch, flag } = this.props;
    console.log('itemObj is', itemObj);
    let SwitchExample = (props) => {
      const { getFieldProps } = props.form;

      return (
        <List>
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
<<<<<<< HEAD
<<<<<<< HEAD
                initialValue: itemObj.isSub === 0,
=======
                initialValue: itemObj.isSub === 1,
>>>>>>> e515ae6d1853d966ef83b4c20ffac4b06aae2ce1
=======
                initialValue: itemObj.isSub === 1,
>>>>>>> e515ae6d1853d966ef83b4c20ffac4b06aae2ce1
                valuePropName: 'checked',
              })}
              onClick={this.subscribe.bind(this)}
            />}
          >
            <div>
              <img src={itemObj.headImg} className={style.subItemLogo} alt="" />
              <span className={style.toMsg}>{itemObj.typeName} </span>
            </div>
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
