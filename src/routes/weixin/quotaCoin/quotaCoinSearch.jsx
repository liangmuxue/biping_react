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
      console.log('search');
      this.props.dispatch({
        type: 'quotaCoinSearch/searchList',
        payload: {
          filter: { content },
        },
      });
    }, 500);
    this.setState({
      searchVal: val,
    });
  }
  itemClick(item) {
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
    console.log('render=>', this.props);
    const { list } = this.props;
    let conHtml = null;
    if (!this.state.searchVal) {
      conHtml = null;
    } else if (list.length <= 0) {
      conHtml = (
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
  return state.quotaCoinSearch;
}

export default connect(mapStateToProps)(mobileRouteComponent(QuotaCoinSearch));
