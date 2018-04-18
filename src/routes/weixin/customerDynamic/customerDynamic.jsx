import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'dva';
import Card from 'antd-mobile/lib/card/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import 'antd-mobile/es/card/style/index.css';
import 'antd-mobile/es/wing-blank/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import InfiniteListView from '../../../components/infiniteListView';
import { buildPagiProps } from '../../common/paginationRoute';
import { rebuildCustomerDynamic } from '../../../selectors/customerDynamic';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import styles from './index.less';
/**
 * 老人动态页面
 * @author 梁慕学
 * @Date  2017-12-25
 */
function genDynamics({
  dispatch, customerDynamic,
}) {
  // const { filter, dataSource, pagination,modelDef } = customerDynamic;
  console.log('customerDynamic is:', customerDynamic);
  const dynamicListProps = buildPagiProps(dispatch, {
    ...customerDynamic,
    renderRow: (rowData, sectionID, rowID) => {
      console.log('rowData is', rowData);
      return (
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          <Card full>
            <Card.Header
              title={rowData.createUser.id}
              thumb={rowData.picPathReal}
              thumbStyle={{ width: '64px', height: '64px' }}
              extra={rowData.lastUpdateDateTime}
            />
            <Card.Body>
              <div>{rowData.contents}</div>
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
        </WingBlank>
      );
    },
  });
  const height = document.documentElement.clientHeight * 3 / 4;
  return (
    <div className={styles.container}>
      {/* 使用继承infinite的列表页组件，传递上拉加载更多的处理方法 */}
      <InfiniteListView {...dynamicListProps} height={height} />
    </div>
  );
}

@pureRender
class CustomerDynamic extends Component {
  render() {
    console.log('cd render');
    return genDynamics(this.props);
  }
}

function mapStateToProps(state, ownProps) {
  // 第一次进入时没有数据，直接返回
  if (!state.customerDynamic.dataSource) {
    const { customerDynamic } = state;
    return { customerDynamic };
  }
  // 加工数据
  const customerDynamic = rebuildCustomerDynamic(state, state.customerDynamic);
  return customerDynamic;
}


export default connect(mapStateToProps)(mobileRouteComponent(CustomerDynamic));
