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

class subList extends Component {
  constructor(props) {
    console.log('props in subList', props);
    super(props);
  }
  componentWillMount() {
    console.log('componentWillMount subList', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'subscribe/subscribeQuery',
    });
  }
  remarkClick(typeObj) {
    console.log('remarkClick in,typeObj:', typeObj);
    // 跳转到订阅详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subDetail', params: { typeId: typeObj.typeId } },
    });
  }
  subTypeClick(subTypeObj) {
    console.log('subTypeObj in subList', subTypeObj);
    // 跳转到订阅包页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'toOpen',
        params: { typeId: subTypeObj.typeId, typeName: subTypeObj.typeName, backPath: 'subList' },
      },
    });
  }
  render() {
    const { busiFlag } = this.props;
    console.log(`render flag:${busiFlag}`);
    const { subListData } = this.props;
    console.log('subList data', subListData);
    if (subListData) {
      return (
        <div>
          {subListData.data.map(item =>
            (<SubTypeCard
              key={item.typeId}
              typeObj={item}
              remarkClick={this.remarkClick.bind(this)}
              subTypeClick={this.subTypeClick.bind(this)}
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
