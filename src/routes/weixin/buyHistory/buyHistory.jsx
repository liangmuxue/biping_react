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
import { rebuildBuyList } from '../../../selectors/buyList';
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
class AccountInfo extends Component {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  cardClick(msgObj) {
    console.log('cardClick in,msgObj:', msgObj);
  }
  render() {
    console.log('6666666666', this.props);
    const { buyList } = this.props;
    console.log('buyList is:', buyList);
    if (buyList) {
      const totalCount = buyList.pagination.totalCount;
      if (totalCount == 0) {
        return (
          <div className={styles.empty}>
            <div><img src="/images/buyHistoryImg/3.png" className={styles.buycar} /></div>
            <div className={styles.notread}>您还没有买过任何订阅包</div>
            <Buttongo />
          </div>
        );
      }
    }


    const buyListProps = buildPagiProps(this.props.dispatch, {
      ...buyList,
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
        <InfiniteListView {...buyListProps} height={height} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dfasdafsdsafdsafdsfd', state.buyHistory);
  // 第一次进入时没有数据，直接返回
  if (!state.buyHistory.dataSource) {
    const { buyHistory } = state;
    return { buyHistory };
  }
  // 加工数据
  const buyList = rebuildBuyList(state.buyHistory);
  return buyList;
}

export default connect(mapStateToProps)(mobileRouteComponent(AccountInfo));
// export default mobileRouteComponent(AccountInfo);
