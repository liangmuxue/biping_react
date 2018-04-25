import React, { Component } from 'react';
import { connect } from 'dva';
import 'antd-mobile/es/button/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubTypeCard from '../../../pageComponents/weixin/subscribe/subTypeCard.jsx';

/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

function genSubList({ dispatch, data }) {
  // const { customerName } = accountInfo;

}

class subList extends Component {
  constructor(props) {
    console.log('props in subList', props);
    super(props);
  }
  remarkClick(typeObj) {
    console.log('remarkClick in,typeObj:', typeObj);
    // 请求消息详细信息
    this.props.dispatch({
      type: 'subscribe/subscribeDetail',
      payload: { messageId: typeObj.typeId },
    });
    // 跳转到订阅详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subDetail' },
    });
  }
  render() {
    const { data } = this.props;
    console.log('subList data', data);
    if (data) {
      return (
        <div>
          {data.map(item =>
            (<SubTypeCard
              key={item.typeId}
              typeObj={item}
              remarkClick={this.remarkClick.bind(this)}
            />))}
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return state.subscribe;
}

export default connect(mapStateToProps)(mobileRouteComponent(subList));
// export default mobileRouteComponent(AccountInfo);
