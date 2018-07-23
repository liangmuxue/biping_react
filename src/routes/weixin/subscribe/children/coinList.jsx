import React from 'react';
import { connect } from 'dva';
import { SearchBar } from 'antd-mobile';
import 'antd-mobile/es/search-bar/style/index.css';
import Tabs from 'antd-mobile/lib/tabs/index';
import mobileRouteComponent from '../../../common/mobileRouteComponent';
import styles from './coinList.less';
import BaseComponent from '../../baseComponent';
import InfiniteListView from '../../../../components/infiniteListView';
import { buildPagiProps } from '../../../common/paginationRoute';
import { rebuildMessageList } from '../../../../selectors/messageList';
import Toast from 'antd-mobile/lib/toast/index';
import 'antd-mobile/es/icon/style/index.css';

class CoinList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabName: null,
    };
  }
  componentWillMount() {
    const { params } = this.props;
    this.props.dispatch({
      type: 'coinList/queryList',
      payload: { ...params },
    });
    if (params.tabName) {
      this.setState({
        tabName: params.tabName,
      });
    }
  }
  // 搜索点击
  searchClick() {
    const { params } = this.props;
    // 跳转到信息详情页面
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'coinSearch',
        params: {
          backPath: 'coinList',
          exchangeId: params.exchangeId,
          verbId: params.verbId,
        },
      },
    });
  }
  // tab选项卡点击
  tabChange(tab) {
    Toast.loading('正在加载...');
    const { params } = this.props;
    const { verbId, exchangeId } = params;
    const { title } = tab;
    const coinName = title;
    this.setState({
      tabName: coinName,
    });
    if (coinName !== '自选') {
      this.props.dispatch({
        type: 'coinList/listdata',
        payload: {
          filter: { exchangeId, verbId, coinName },
        },
      });
    } else {
      this.props.dispatch({
        type: 'coinList/userListData',
        payload: {
          filter: { exchangeId, verbId },
        },
      });
    }
  }
  // 订阅详情
  toDetail(rowData) {
    const { params } = this.props;
    this.props.dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: {
        pageName: 'coinDetail',
        params: {
          backPath: 'coinList',
          exchangeId: params.exchangeId,
          verbId: params.verbId,
          symbolId: rowData.symbolId,
          tabName: this.state.tabName,
        },
      },
    });
  }
  showCancel(e, data) {
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/showCancel',
      payload: { symbolVerbId },
    });
  }
  cancelBtnlist(e, data) {
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/subscribeRemove',
      payload: { symbolVerbId },
      noUser: true,
    });
  }
  cancelBtn(e, data) {
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/subscribeRemove',
      payload: { symbolVerbId },
    });
  }
  // 开启微信推送
  pushAdd(e, data) {
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/pushAdd',
      payload: { symbolVerbId },
    });
  }
  // 取消微信推送
  pushRemove(e, data) {
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/pushRemove',
      payload: { symbolVerbId },
    });
  }
  render() {
    const { coinList, params } = this.props;
    const { coinListHeadData } = coinList;
    const tabs = [
      { title: '自选' },
    ];
    if (!coinListHeadData || !coinListHeadData.sobmolList) {
      return null;
    }
    coinListHeadData.sobmolList.map(item => {
      const obj = {
        title: item.coinName,
        exchangeId: item.exchangeId,
      }
      tabs.push(obj);
    });
    const { coinName } = coinListHeadData.sobmolList[0];
    let name = coinListHeadData.subscribeCount > 0 ? '自选' : coinName;
    if (this.state.tabName) {
      name = this.state.tabName;
    }
    // 加工list数据
    const { messageList } = rebuildMessageList({ messageList: coinList });
    const coinListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      renderRow: (rowData) => {
        let contentHtml = null;
        if (name === '自选') {
          contentHtml = (
            <div onClick={() => this.toDetail(rowData)} className={styles.userList}>
              <p className={styles.nametext}>{rowData.exchangeZhName}</p>
              <div className={styles.contentMsg}>
                <img className={styles.headimg} alt="" src={rowData.baseLogo} />
                <span className={styles.headtext}>{rowData.baseCoinCode}<em>/{rowData.quoteCoinCode}</em></span>
                <div className={styles.rightBtn}>
                  <div className={styles.btns}>
                    {
                      rowData.pushFlag ?
                      (
                        <img onClick={(e) => this.pushRemove(e, rowData)} alt="" src="/images/coinList/blueremind.png" />
                      ) :
                      (
                        <img onClick={(e) => this.pushAdd(e, rowData)} alt="" src="/images/coinList/grayremind.png" />
                      )
                    }
                  </div>
                  <div className={`${styles.btns} ${styles.rightBtns}`}>
                    <img onClick={(e) => this.showCancel(e, rowData)} alt="" src="/images/coinList/three.png" />
                    {
                      rowData.showCancekBtn ?
                      (
                        <span
                          onClick={(e) => this.cancelBtn(e, rowData)}
                          className={styles.removeBtn}
                        ><div></div>取消订阅</span>
                      ) : (
                        null
                      )
                    }
                    
                  </div>
                </div>
              </div>
              {
                params.verbId === 717 ?
                (
                  <p className={styles.bottomText}>{`单笔买入 >60万,单笔卖出 >60万`}</p>
                ) :
                (
                  <div>
                    <p className={styles.bottomText}>{`检测时间段：${rowData.timeStr.split(',').join('分钟 、')}分钟`}</p>
                    <p className={styles.bottomText}>{`涨幅 >${rowData.gainHold * 100}% 跌幅 <${rowData.loseHold * 100}%`}</p>
                  </div>
                )
              }
              <div className={styles.line}></div>
            </div>
          );
        } else {
          contentHtml = (
            <div onClick={() => this.toDetail(rowData)} className={styles.listItem}>
              <span className={styles.text1}>{rowData.exchangeZhName}</span>
              <img className={styles.coinImg} alt="" src={rowData.baseLogo} />
              <span className={styles.text2}>{rowData.baseCoinCode}<em>/{rowData.quoteCoinCode}</em></span>
              {
                rowData.subscribeFlag ?
                (
                  <button onClick={(e) => this.cancelBtnlist(e, rowData)} className={`${styles.rightBtn} ${styles.selectBtn}`}>已订阅</button>
                ) :
                (
                  <button onClick={() => this.toDetail(rowData)} className={styles.rightBtn}><em>+</em> 订阅</button>
                )
              }
              <div className={styles.line}></div>
            </div>
          );
        }
        return (
          contentHtml
        );
      },
    });
    const height = document.documentElement.clientHeight - 100;
    let initialIndex = 0;
    if (params.tabName) {
      console.log('ifif', params.tabName);
      for (let i in tabs) {
        if(tabs[i].title == params.tabName) {
          initialIndex = i;
        }
      }
    } else {
      coinListHeadData.subscribeCount > 0 ? initialIndex = 0 : initialIndex = 1;
    }
    console.log('coinName=>', initialIndex);
    const ininin = 2;
    return (
      <div className={styles.coinListCon}>
        <div onClick={this.searchClick.bind(this)}>
          <SearchBar placeholder='搜索' disabled="true" />
        </div>
        <Tabs
          tabs={tabs}
          initialPage={Number(initialIndex)}
          swipeable={false}
          tabBarActiveTextColor="#0068dd"
          tabBarTextStyle={{ fontSize: '.26rem' }}
          renderTab={tab => <span>{tab.title}</span>}
          onChange={tab => this.tabChange(tab)}
        >
          <InfiniteListView
            ref={this.setPageRef}
            {...coinListProps}
            noPullRefresh
            rendergoTop
            height={height}
            listRemain
          />
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
