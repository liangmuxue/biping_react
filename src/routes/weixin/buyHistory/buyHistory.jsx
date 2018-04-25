import React, { Component } from 'react';
import { connect } from 'dva';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { Card, WhiteSpace } from 'antd-mobile';
import { Button, WingBlank } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import InfiniteListView from '../../../components/infiniteListView';
import { buildPagiProps } from '../../common/paginationRoute';
import BuyCard from '../../../pageComponents/weixin/buyHistory/buyCard.jsx';
import style from '../announcement/announcement.less';
import styles from './buyHistory.less';
/**
 * 购买历史记录
 * @author 赵永帅
 * @Date2018-4-24
 */
const Buttongo = () => (
  <WingBlank>
    <Button type="primary">去看看</Button><WhiteSpace />
  </WingBlank>
);

function genDynamics({ dispatch, accountInfo }) {
  // const { customerName } = accountInfo;


}
@pureRender
class payRecordList extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  cardClick(msgObj) {
    console.log('cardClick in,msgObj:', msgObj);
  }
  render() {
    console.log('cd render');
    console.log('messageList is:0000000', this.props);
    if (!this.props.dataSource) {
      return (<div>none</div>);
    }
    const dataSource = this.props;
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...dataSource,
      renderRow: (rowData, sectionID, rowID) => {
        console.log('rowData is', rowData);
        return (
          <BuyCard msgObj={rowData} cardClick={this.cardClick.bind(this)} />
        );
      },
    });
    const height = document.documentElement.clientHeight;

    return (
      <div>
        {/* 使用继承infinite的列表页组件，传递上拉加载更多的处理方法 */}
        <InfiniteListView {...messageListProps} height={height} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dfasdafsdsafdsafdsfd', state.buyHistory);
  return state.buyHistory;
}

export default connect(mapStateToProps)(mobileRouteComponent(payRecordList));
// export default mobileRouteComponent(AccountInfo);
