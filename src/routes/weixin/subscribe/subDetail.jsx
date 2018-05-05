import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';
import SubItem from '../../../pageComponents/weixin/subscribe/subItem.jsx';
import HeaderBar from '../../../components/headerBar';
import style from './subDetail.less';
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
    // 发起订阅请求
    this.props.dispatch({
      type: 'subDetail/subscribeItem',
      payload: {
        subItem: itemObj,
      },
    });
  }
  subTypeClick(subTypeObj) {
    console.log('subType in', subTypeObj.typeId);
    // 跳转到订阅包页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'toOpen',
        params: { typeId: subTypeObj.typeId, typeName: subTypeObj.typeName, backPath: 'subDetail' },
      },
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
    return (
      <div>
        <HeaderBar headerText={subDetailData.data.typeName} backRouteLink="subList" {...this.props} />
  <div className={ style.topBox }>
       <SubTypeCard key={subDetailData.data.typeId} typeObj={subDetailData.data} subTypeClick={this.subTypeClick.bind(this)} />
     </div>
        <div className={style.listTitle}>【{subDetailData.data.typeName}】订阅管理</div>
        {subDetailData.data.content.map(item =>
                    (<SubItem
                      key={item.typeId}
                      itemObj={item}
                      subscribeClick={this.subscribeItem.bind(this)}
                    />))}
              <div className={style.full}></div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return state.subDetail;
}

export default connect(mapStateToProps)(mobileRouteComponent(SubDetail));
// export default mobileRouteComponent(AccountInfo);
