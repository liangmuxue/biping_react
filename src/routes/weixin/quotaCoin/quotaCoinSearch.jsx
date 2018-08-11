import React from 'react';
import { connect } from 'dva';
import BaseComponent from '../baseComponent';
import mobileRouteComponent from '../../common/mobileRouteComponent';
import { SearchBar } from 'antd-mobile';
import 'antd-mobile/es/search-bar/style/index.css';
import styles from './quotaCoinSearch.less';

function SearchList(props) {
  const { list } = props;
  return (
    <ul className={styles.searchList}>
      {list.map(item => (
        <li onClick={props.itemClick.bind(this, item)} key={item.symbolId}>{`${item.baseCoinCode}`}</li>
      ))}
    </ul>
  );
}
function HotList(props) {
  const { hotList, changeClick } = props;
  if (!hotList) {
    return null;
  }
  const { data } = hotList;
  let listData = null;
  if (changeClick) {
    listData = data.list;
  } else {
    listData = data.default;
  }
  return (
    <div className={styles.history}>
      <div className={styles.title}>
        热搜
        <span onClick={props.exchangeClick.bind(this)} className={styles.right}><img alt="" src="/images/quotaCoin/exchange.png" />换一批</span>
      </div>
      {
        listData.length > 0 ?
        (
          <ul>
            {listData.map(item => (
              <li onClick={props.itemClick.bind(this, item)} key={item.symbolId}>{item.baseCoinCode}</li>
            ))}
          </ul>
        ) : (
          <div className={styles.noData}>暂无热搜</div>
        )
      }
    </div>
  );
}
function HistoryList(props) {
  const { historyList } = props;
  if (!historyList) {
    return null;
  }
  const { data } = historyList;
  const listData = data.list;
  return (
    listData.length > 0 ? (
      <div className={styles.history}>
        <div className={styles.title}>
          搜索历史
          <span onClick={props.deleteClick.bind(this)} className={styles.right}><img alt="" src="/images/quotaCoin/delete.png" /></span>
        </div>
        <ul>
          {listData.map(item => (
            <li
              onClick={props.itemClick.bind(this, item)}
              key={item.symbolId}
            >
              {item.baseCoinCode}
            </li>
          ))}
        </ul>
      </div>
    ) : null
  );
}
class QuotaCoinSearch extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: null,
      timeOut: 0,
      changeClick: false,
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'quotaCoin',
    });
    this.props.dispatch({
      type: 'quotaCoinSearch/searchHot',
      payload: {},
    });
    this.props.dispatch({
      type: 'quotaCoinSearch/searchHistory',
      payload: {},
    });
  }
  componentDidMount() {
    this.autoFocusInst.focus();
  }
  onCancel() {
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'quotaCoin',
        params: {
          backPath: 'quotaCoinSearch',
        },
      },
    });
  }
  onChange(val) {
    clearTimeout(this.state.timeOut);
    const content = val;
    this.state.timeOut = setTimeout(() => {
      this.props.dispatch({
        type: 'quotaCoinSearch/searchList',
        payload: {
          filter: { content },
        },
      });
      this.setState({
        searchVal: val,
      });
    }, 500);
  }
  itemClick(item) {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'quotaCoinDetailSearchDetail',
        obj: {
          '联想内容': item.baseCoinCode,
          '输入内容': this.state.searchVal,
        },
      },
    });
    this.props.dispatch({
      type: 'quotaCoinSearch/createCount',
      payload: {
        symbolId: item.symbolId,
      },
    });
    this.props.dispatch({
      type: 'quotaCoinSearch/searchHistoryAdd',
      payload: {
        exchangeId: item.exchangeId,
        symbolId: item.symbolId,
      },
    });
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'quotaCoinDetail',
        params: {
          backPath: 'quotaCoin',
          exchangeId: item.exchangeId,
          symbolId: item.symbolId,
        },
      },
    });
  }
  exchangeClick() {
    this.setState({
      changeClick: true,
    });
    this.props.dispatch({
      type: 'quotaCoinSearch/searchHot',
      payload: {},
    });
  }
  deleteClick() {
    this.props.dispatch({
      type: 'quotaCoinSearch/searchHistoryRemove',
      payload: {},
    });
  }
  render() {
    console.log('render=>', this.props);
    const { quotaCoinSearch, pagiLoading } = this.props;
    const { list } = quotaCoinSearch;
    let conHtml = null;
    if (!this.state.searchVal) {
      conHtml = (
        <div>
          <HotList
            hotList={quotaCoinSearch.hotList}
            changeClick={this.state.changeClick}
            itemClick={this.itemClick.bind(this)}
            exchangeClick={this.exchangeClick.bind(this)}
          />
          <HistoryList
            historyList={quotaCoinSearch.historyList}
            itemClick={this.itemClick.bind(this)}
            deleteClick={this.deleteClick.bind(this)}
          />
        </div>
      );
    } else if (list.length <= 0) {
      conHtml = pagiLoading ? null : (
        <div className={styles.noCon}>暂无匹配项</div>
      );
    } else {
      conHtml = (<SearchList list={list} itemClick={this.itemClick.bind(this)} />);
    }
    return (
      <div>
        <SearchBar
          placeholder="搜索"
          ref={ref => this.autoFocusInst = ref}
          onChange={this.onChange.bind(this)}
          onCancel={this.onCancel.bind(this)}
        />
        {conHtml}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { quotaCoinSearch: state.quotaCoinSearch, pagiLoading: state.app.pagiLoading };
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoinSearch));
