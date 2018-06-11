import React from 'react';
import { connect } from 'dva';
import 'antd-mobile/es/toast/style/index.css';
import 'antd-mobile/es/icon/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';
import SubItem from '../../../pageComponents/weixin/subscribe/subItem.jsx';
import HeaderBar from '../../../components/headerBar';
import style from './subDetail.less';
import BaseComponent from '../baseComponent';
import SubContentType from '../../../pageComponents/weixin/subscribe/subContentTypeCard.jsx';
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
    const { remainDate, typeId, typeName } = this.props.subDetailData.data;
    if (remainDate >= 0) {
      // 发起订阅请求
      this.props.dispatch({
        type: 'subDetail/subscribeAll',
        payload: { typeId },
      });
    } else {
      // 如果大类别没有开通，跳转到开通页面
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId, typeName, backPath: 'subList' },
        },
      });
    }
  }
  // 订阅所有异动币
  subscribeAllTrans() {
    const { remainDate, typeId, typeName } = this.props.subDetailData.data;
    if (remainDate >= 0) {
      // 发起订阅请求
      this.props.dispatch({
        type: 'subDetail/subscribeAllTrans',
        payload: { typeId },
      });
    } else {
      // 如果大类别没有开通，跳转到开通页面
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId, typeName, backPath: 'subList' },
        },
      });
    }
  }
  // 涨跌幅,买入卖出
  gainOrLose(itemObj) {
    const { remainDate, typeId, typeName } = this.props.subDetailData.data;
    if (remainDate >= 0) {
      // 发起订阅请求
      console.log('gainOrLose3', itemObj);
      // 发起订阅请求
      this.props.dispatch({
        type: 'subDetail/gainOrLose',
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
          params: { typeId, typeName, backPath: 'subList' },
        },
      });
    }
  }


  // 订阅某小类
  subscribeItem(itemObj) {
    console.log('subscribeItem in', itemObj);
    const { remainDate, typeId, typeName } = this.props.subDetailData.data;
    console.log('subDetailData in', this.props);
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
          params: { typeId, typeName, backPath: 'subList' },
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
      console.log('preventFlag is55555');
      // 跳转到订阅包页面
      this.props.dispatch({
        type: 'pageConstruction/switchToInnerPage',
        payload: {
          pageName: 'toOpen',
          params: { typeId: subTypeObj.typeId, typeName: subTypeObj.typeName, backPath: 'subList' },
        },
      });
    }
  }
  shareClick(event) {
    this.props.dispatch({
      type: 'subDetail/chooseTime',
    });
  }

  closeShare() {
    const { dispatch } = this.props;
    console.log('closeShare in');
    dispatch({
      type: 'subDetail/closeShareSuc',
    });
  }
  // 时间选择确定
  checkTimeSubmit(itemObj) {
    const { remainDate, typeId, typeName } = this.props.subDetailData.data;
    if (remainDate >= 0) {
      console.log('checkTimeSubmit', itemObj);
      // 时间选择确定
      this.props.dispatch({
        type: 'subDetail/checkTimeSubmit',
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
  render() {
    console.log('SubDetail render', this.props);
    const { subDetailData } = this.props;
    // 如果没有数据，需要首先进行查询
    if (!subDetailData || !subDetailData.data || !subDetailData.data.typeId) {
      return null;
    }

    const { backPath } = subDetailData;
    // 订阅类型详情（异动币，币事件交易所公告）
    let subContent = null;
    console.log('subContent99999', subDetailData);
    if (subDetailData.data.typeCode && subDetailData.data.typeCode !== 'currencies') {
      subContent = (<div>
        <div className={style.listTitle}>
          【{subDetailData.data.typeName}】订阅管理
          <button className={style.openAll} onClick={this.subscribeAll.bind(this)} >打开所有</button>
        </div>

        {subDetailData.data.content.map(item =>
                              (<SubItem
                                abnormal={1}
                                key={item.typeId}
                                itemObj={item}
                                subscribeClick={this.subscribeItem.bind(this)}
                              />))}
      </div>
      );
    } else {
      subContent = (<SubContentType
        subTypeContent={this.props}
        shareClick={this.shareClick.bind(this)}
        closeShare={this.closeShare.bind(this)}
        subscribeItem={this.subscribeItem.bind(this)}
        subscribeAll={this.subscribeAllTrans.bind(this)}
        gainOrLose={this.gainOrLose.bind(this)}
        checkTimeSubmit={this.checkTimeSubmit.bind(this)}
      />);
    }
    console.log('subDetailData.data', subDetailData.data);
    const subDetailCard = (
      <div className={style.topBox}>
        <SubTypeCard key={subDetailData.data.typeId} typeObj={subDetailData.data} flag="1" subTypeClick={this.subTypeClick.bind(this)} />
      </div>);
    return (
      <div>
        <HeaderBar headerText={subDetailData.data.typeName} backRouteLink={backPath} {...this.props} />
        {subDetailCard}
        {subContent}

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
