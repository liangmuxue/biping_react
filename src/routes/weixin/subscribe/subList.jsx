import React, { Component } from 'react';
import { connect } from 'dva';
import 'antd-mobile/es/button/style/index.css';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import SubCard from './children/subCard';
import BaseComponent from '../baseComponent';
import styles from './subList.less';
/**
 * 老人账号信息页面
 * @author 梁慕学
 * @Date  2017-12-25
 */

class subList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // 初始化时进行查询
    this.props.dispatch({
      type: 'subscribe/subscribeQuery',
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'subscribeList',
        obj: {
          '进入': '进入订阅管理',
        },
      },
    });
  }
  itemClick(item) {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'subscribeListClick',
        obj: {
          '点击管理订阅': item.typeName,
        },
      },
    });
    const backPath = 'subList';
    // 跳转到新订阅详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subDetail', params: { typeId: item.typeId, typeCode: item.typeCode, backPath } },
    });
  }
  render() {
    const { busiFlag } = this.props;
    console.log(`render flag:${busiFlag}`);
    const { subListData } = this.props;
    console.log('subList data', subListData);
    if (subListData && subListData.data) {
      return (
        <div className={styles.subListCon}>
          {subListData.data.map(item =>
            (
              <SubCard
                key={item.typeId}
                item={item}
                itemClick={this.itemClick.bind(this)}
              />
            ))
          }
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
