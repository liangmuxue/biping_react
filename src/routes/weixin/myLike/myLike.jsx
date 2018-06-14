import React from 'react';
import { connect } from 'dva';
// import Card from 'antd-mobile/lib/card/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Button from 'antd-mobile/lib/button/index';
import WingBlank from 'antd-mobile/lib/wing-blank/index';
import 'antd-mobile/es/button/style/index.css';
import 'antd-mobile/es/list/style/index.css';
import InfiniteListView from '../../../components/infiniteListView';
import { buildPagiProps } from '../../common/paginationRoute';
import MyLikeCard from '../../../pageComponents/weixin/myLike/myLikeCard.jsx';
import { rebuildBuyList } from '../../../selectors/buyList';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import HeaderBar from '../../../components/headerBar';
import styles from './myLike.less';
import BaseComponent from '../baseComponent';
/**
 * 购买历史记录
 * @author 赵永帅
 * @Date2018-4-24
 */
const Buttongo = () => (
  <WingBlank>
    <Button type="primary">去看看订阅包</Button><WhiteSpace />
  </WingBlank>
);

class AccountInfo extends BaseComponent {
  constructor(props) {
    console.log('props in AccountInfo', props);
    super(props);
  }
  myLikeClick(msgObj) {
    console.log('cardClick in,msgObj:', msgObj);
    // 跳转到订阅详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subTagList', params: { ...msgObj, backPath: 'myLike' } },
    });
  }
  buttonClick() {
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'subList' },
    });
  }
  componentDidMount() {
    console.log('componentDidMount messageLisst', this.props);
    // 初始化时进行查询
    this.props.dispatch({
      type: 'myLike/myLikeQuery',
    });
  }
  render() {
    console.log('6666666666', this.props);
    const { buyList } = this.props;
    console.log('buyList', buyList);
    const { myLike } = this.props;
    if (myLike) {
      const { flag } = myLike;
      if (flag && flag === 1) {
        return (
          <div className={styles.empty}>
            <HeaderBar headerText="我关注的" backRouteLink="myself" {...this.props} />
            <div><img src="/images/myLikeImg/3.png" className={styles.noBuycar} /></div>
            <div className={styles.notread}>您还没有买过任何订阅包</div>
            <WingBlank>
              <Button type="primary" onClick={this.buttonClick.bind(this)}>去看看订阅包</Button><WhiteSpace />
            </WingBlank>
          </div>
        );
      }
    }


    const buyListProps = buildPagiProps(this.props.dispatch, {
      ...buyList,
      renderRow: (rowData, sectionID, rowID) => {
        console.log('rowData is', rowData);
        return (
          <MyLikeCard msgObj={rowData} myLikeClick={this.myLikeClick.bind(this)} />
        );
      },
    });
    const height = document.documentElement.clientHeight;
    const backPath = 'myself';
    return (
      <div>
        <div className={styles.full} />
        <HeaderBar headerText="我关注的" backRouteLink={backPath} {...this.props} />
        {/* 使用继承infinite的列表页组件，传递上拉加载更多的处理方法 */}
        <InfiniteListView {...buyListProps} height={height} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('dfasdafsdsafdsafdsfd', state.myLike);
  // 第一次进入时没有数据，直接返回
  if (!state.myLike.dataSource) {
    const { myLike } = state;
    return { myLike };
  }
  // 加工数据
  const buyList = rebuildBuyList(state.myLike);
  return buyList;
}

export default connect(mapStateToProps)(mobileRouteComponent(AccountInfo));
// export default mobileRouteComponent(AccountInfo);
