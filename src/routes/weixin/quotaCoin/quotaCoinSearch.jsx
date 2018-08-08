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
class QuotaCoinSearch extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: null,
      timeOut: 0,
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: 'quotaCoin',
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
  render() {
    const { quotaCoinSearch, pagiLoading } = this.props;
    const { list } = quotaCoinSearch;
    let conHtml = null;
    if (!this.state.searchVal) {
      conHtml = null;
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
