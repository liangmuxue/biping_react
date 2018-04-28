import React, { Component } from 'react';
import { connect } from 'dva';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import List from 'antd-mobile/lib/list/index';
import Tabs from 'antd-mobile/lib/tabs/index';
import { StickyContainer, Sticky } from 'react-sticky';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import 'antd-mobile/es/tabs/style/index.css';
import style from './subDetail.less';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';
import SubItem from '../../../pageComponents/weixin/subscribe/subItem.jsx';
import HeaderBar from '../../../components/headerBar';

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
    console.log('subType in', subTypeObj.typeId);
    // 请订阅包信息
    this.props.dispatch({
      type: 'toOpen/toOpenDetail',
      payload: { typeId: subTypeObj.typeId },
    });
    // 跳转到订阅包页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'toOpen' },
    });
  }
  render() {
    console.log('SubDetail render', this.props);
    const { subDetailData } = this.props;
    // 如果没有数据，需要首先进行查询
    if (!subDetailData) {
      this.props.dispatch({
        type: 'subDetail/subscribeDetail',
        payload: { typeId: this.props.params.typeId },
      });
      return null;
    }
    const { routeActive } = this.props;
    // 如果有更新标志，则发送请求并重新渲染
    if (routeActive) {
      this.props.dispatch({
        type: 'subDetail/subscribeDetail',
        payload: { typeId: this.props.params.typeId },
      });
      return null;
    }
    return (
      <div>
        <HeaderBar headerText={subDetailData.data.typeName} backRouteLink="subList" {...this.props} />
        <SubTypeCard key={subDetailData.data.typeId} typeObj={subDetailData.data} subTypeClick={this.subTypeClick.bind(this)} />
        <div className={style.listTitle}>【{subDetailData.data.typeName}】订阅管理</div>
        {subDetailData.data.content.map(item =>
                    (<SubItem
                      key={item.typeId}
                      itemObj={item}
                      subscribeClick={this.subscribeItem.bind(this)}
                    />))}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return state.subDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(SubDetail));
// export default mobileRouteComponent(AccountInfo);
