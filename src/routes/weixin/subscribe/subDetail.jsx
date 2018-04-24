import React, { Component } from 'react';
import { connect } from 'dva';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import { Button, WingBlank, List } from 'antd-mobile';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/tabs/style/index.css';
import style from '../bEvents/bEvents.less';
import styles from '../subscribe/subList.less';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';
import SubItem from '../../../pageComponents/weixin/subscribe/subItem.jsx';

/**
* 订阅详情页面
* @author 梁慕学
* @Date  2018-4-25
*/

class SubDetail extends Component {
  constructor(props) {
    console.log('props in SubDetail', props);
    super(props);
  }
  subscribeItem(itemObj) {
    console.log('subscribeItem in', itemObj);
  }
  render() {
    console.log('SubDetail render', this.props);
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    const { typeObj } = this.props.data;
    return (
      <div>
        <SubTypeCard key={typeObj.typeId} typeObj={typeObj} />
        <div className={style.listTitle}>【{typeObj.typeName}】订阅管理</div>
        {data.map(item =>
                    (<SubItem
                      key={item.typeId}
                      itemObj={item}
                      subscribeClick={this.subscribeItem.bind(this)}
                    />))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.subscribe;
}

export default connect(mapStateToProps)(mobileRouteComponent(SubDetail));
// export default mobileRouteComponent(AccountInfo);
