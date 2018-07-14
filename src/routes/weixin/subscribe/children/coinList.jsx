import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import 'antd-mobile/es/search-bar/style/index.css';
import Tabs from 'antd-mobile/lib/tabs/index';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './coinList.less';

class CoinList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // document.title = '搜索';
  }
  searchClick() {
    console.log('searchClick', this.state);
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'coinSearch',
        params: {
          backPath: 'coinList',
        },
      },
    });
  }
  render() {
    const tabs = [
      { title: '自选' },
      { title: 'USDT' },
      { title: 'BTC' },
      { title: 'ETH' },
      { title: 'HT' },
      { title: 'BNB' },
    ];
    return (
      <div className={styles.coinListCon}>
        <div onClick={this.searchClick.bind(this)}>
          <SearchBar placeholder="搜索" disabled="true" />
        </div>
        <Tabs
          tabs={tabs}
          initialPage={0}
          swipeable={false}
          renderTab={tab => <span>{tab.title}</span>}
        >
          <div>
            <div className={styles.listItem}>
              <span className={styles.text1}>火币pro</span>
              <img className={styles.coinImg} alt="" src="/images/coinList/coinBg.png" />
              <span className={styles.text2}>HB10<em>/BTC</em></span>
              <button className={`${styles.rightBtn} ${styles.selectBtn}`}>已订阅</button>
              <div className={styles.line}></div>
            </div>
            <div className={styles.listItem}>
              <span className={styles.text1}>火币pro</span>
              <img className={styles.coinImg} alt="" src="/images/coinList/coinBg.png" />
              <span className={styles.text2}>HB10<em>/BTC</em></span>
              <button className={styles.rightBtn}>+ 订阅</button>
              <div className={styles.line}></div>
            </div>
            <div className={styles.listItem}>
              <span className={styles.text1}>火币pro</span>
              <img className={styles.coinImg} alt="" src="/images/coinList/coinBg.png" />
              <span className={styles.text2}>HB10<em>/BTC</em></span>
              <button className={styles.rightBtn}>+ 订阅</button>
              <div className={styles.line}></div>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coinList: state.coinList,
  };
};

export default connect(mapStateToProps)(mobileRouteComponent(CoinList));
