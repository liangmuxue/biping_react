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
  subTypeClick(subTypeObj) {
    console.log('subType in', subTypeObj);
  }
  render() {
    console.log('SubDetail render', this.props);
    const { busiFlag } = this.props;
    // 只有消息详情请求才响应
    if (!busiFlag || busiFlag !== 'subscribeDetailSuccess') {
      return null;
    }
    if (!this.props.data) {
      return null;
    }
    const { content } = this.props.data;
    console.log('content in subdetail');
    return (
      <div>
        <SubTypeCard key={this.props.data.typeId} typeObj={this.props.data} subTypeClick={this.subTypeClick.bind(this)} />
        <div className={style.listTitle}>【{this.props.data.typeName}】订阅管理</div>
        {content.map(item =>
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
