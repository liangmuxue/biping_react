import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import 'antd-mobile/es/search-bar/style/index.css';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './coinSearch.less';

function History(props) {
  const { hotList } = props;
  if (!hotList) {
    return null;
  }
  const { data } = hotList;
  console.log('hotList=>', data);
  return (
    <div className={styles.history}>
      <div className={styles.title}>热门交易对</div>
      {
        data.list.length > 0 ?
        (
          <ul>
            {data.list.map(item => (
              <li onClick={props.itemClick.bind(this, item)} key={item.symbolId}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <div>暂无热门交易对</div>
        )
      }
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
  const { list } = props;
  console.log('SearchList=>', list);
  return (
    <ul className={styles.searchList}>
      {list.map(item => (
        <li onClick={props.itemClick.bind(this, item)} key={item.symbolId}>{item.symbolCode}</li>
      ))}
    </ul>
  );
}
class CoinSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOut: 0,
      searchVal: null,
    };
  }
  componentWillMount() {
    const { params } = this.props;
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'coinSearch',
    });
    this.props.dispatch({
      type: 'coinSearch/searchHot',
      payload: { ...params },
    });
  }
  componentDidMount() {
    this.autoFocusInst.focus();
  }
  onChange(val) {
    console.log(this.state, val);
    this.setState({
      searchVal: val,
    });
    const { params } = this.props;
    const { exchangeId } = params;
    const content = val;
    clearTimeout(this.state.timeOut);
    this.state.timeOut = setTimeout(() => {
      this.props.dispatch({
        type: 'coinSearch/searchList',
        payload: {
          filter: { exchangeId, content },
        },
      });
    }, 500);
  }
  itemClick(item) {
    console.log('itemClick');
    const { params } = this.props;
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'coinDetail',
        params: {
          backPath: 'coinSearch',
          exchangeId: params.exchangeId,
          verbId: params.verbId,
          symbolId: item.symbolId,
        },
      },
    });
  }
  render() {
    console.log('CoinSearch render=>', this.props);
    const { coinSearch } = this.props;
    const { list } = coinSearch;
    let conHtml = null;
    if (!this.state.searchVal) {
      conHtml = (<History hotList={coinSearch.hotList} itemClick={this.itemClick.bind(this)} />);
    } else if (list.length <= 0) {
      conHtml = (<NoCon />);
    } else {
      conHtml = (<SearchList list={list} itemClick={this.itemClick.bind(this)} />);
    }
    return (
      <div>
        <SearchBar
          placeholder="搜索"
          ref={ref => this.autoFocusInst = ref}
          onChange={this.onChange.bind(this)}
        />
        {conHtml}
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
