import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import 'antd-mobile/es/search-bar/style/index.css';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './coinSearch.less';

function History(props) {
  return (
    <div className={styles.history}>
      <div className={styles.title}>热门交易对</div>
      <ul>
        <li>BTC/USDT</li>
        <li>BTC/USDT</li>
        <li>BTC/USDT</li>
        <li>BTCAD/USDT</li>
        <li>BTC/USDT</li>
        <li>BTCAS/USDT</li>
        <li>BTC/USDT</li>
        <li>BTC/USDT</li>
        <li>BTC/USDT</li>
        <li>BTCDF/USDT</li>
      </ul>
    </div>
  );
}
function NoCon(props) {
  return (
    <div className={styles.noCon}>
      <img alt="" src="/images/search/2.png" />
      暂无匹配交易对
    </div>
  );
}
function SearchList(props) {
  return (
    <ul className={styles.searchList}>
      <li>EOS/USDT</li>
      <li>EOS/USDT</li>
      <li>EOS/USDT</li>
      <li>EOS/USDT</li>
      <li>EOS/USDT</li>
      <li>EOS/USDT</li>
    </ul>
  );
}
class CoinSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'coinSearch',
    });
  }
  render() {
    return (
      <div>
        <SearchBar placeholder="搜索" />
        {/* <History /> */}
        {/* <NoCon /> */}
        <SearchList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coinSearch: state.coinSearch,
  };
};

export default connect(mapStateToProps)(mobileRouteComponent(CoinSearch));
