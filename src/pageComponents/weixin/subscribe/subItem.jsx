import List from 'antd-mobile/lib/list/index';
import Button from 'antd-mobile/lib/button/index';
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
    const { itemObj } = this.props;
    console.log('itemObj is', itemObj);
    const extraBtn = (<Button

      style={itemObj.isSub ? { background: '#DDDDDD', color: '#353535',width:'1.42rem', padding:0} : { width:'1.42rem', background: '#108ee9', color: '#fff', padding:0 }}
      size="small"
      inline
      className={style.unreadBtn}
      onClick={this.subscribe.bind(this)}
    >{itemObj.isSub ? '已订阅' : '订阅'}
                      </Button>);
    return (
      <List.Item
        extra={extraBtn}
        multipleLine
      >
        {'# '+ itemObj.typeName}
      </List.Item>
    );
  }
}

export default SubItem;
