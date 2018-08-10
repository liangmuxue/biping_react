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

class CoinList extends BaseComponent {
  constructor(props) {
    super(props);
    const { params } = this.props;
    this.state = {
      tabName: params.tabName || null,
    };
  }
  componentWillMount() {
    const { params } = this.props;
    this.props.dispatch({
      type: 'coinList/queryList',
      payload: { ...params },
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinList',
        obj: {
          '进入': '进入交易对列表',
        },
      },
    });
  }
  // 搜索点击
  searchClick() {
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinListSearch',
      },
    });
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
    const { params } = this.props;
    const { verbId, exchangeId } = params;
    const coinName = tab.title;
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinListTabClick',
        obj: {
          '名称': coinName,
        },
      },
    });
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
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinListDetailClick',
        obj: {
          '币种': rowData.baseCoinCode,
        },
      },
    });
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
    const { params } = this.props;
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/subscribeRemove',
      payload: { symbolVerbId },
      noUser: true,
      params: {
        verbId: params.verbId,
      },
    });
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinListCancel',
      },
    });
  }
  cancelBtn(e, data) {
    const { params } = this.props;
    e.stopPropagation();
    const { symbolVerbId } = data;
    this.props.dispatch({
      type: 'coinList/subscribeRemove',
      payload: { symbolVerbId },
      params: {
        verbId: params.verbId,
      },
    });
    this.props.dispatch({
      type: 'app/pushPoint',
      payload: {
        code: 'coinListCancel',
      },
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
      let obj = {
        title: item.coinName,
        exchangeId: item.exchangeId,
      }
      tabs.push(obj);
    });
    const { coinName } = coinListHeadData.sobmolList[0];
    let name = null;
    if (this.state.tabName) {
      name = this.state.tabName;
    } else {
      name = coinListHeadData.subscribeCount > 0 ? '自选' : coinName;
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
                  {
                    params.verbId === 730 ? null :
                    (
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
                    )
                  }
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
                (params.verbId === 718 ?
                  (
                    <div>
                      <p className={styles.bottomText}>{`检测时间段：${rowData.timeStr.split(',').join('分钟 、')}分钟`}</p>
                      <p className={styles.bottomText}>{`涨幅 >${rowData.gainHold * 100}% 跌幅 <${rowData.loseHold * 100}%`}</p>
                    </div>
                  ) :
                  (
                    <div>
                      {
                        rowData.macdFlag === 0 ? null : <p className={styles.bottomText} >MACD（{rowData.macdTimeStr}线）</p>
                      }
                      {
                        rowData.kdjFlag === 0 ? null : <p className={styles.bottomText} >KDJ（{rowData.kdjTimeStr}线）</p>
                      }
                      {
                        rowData.bollFlag === 0 ? null : <p className={styles.bottomText} >布林带（{rowData.bollTimeStr}线）</p>
                      }
                    </div>
                  )
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
    console.log('name=>>', name);
    let index = null;
    for(let i in tabs) {
      if (tabs[i].title == name) {
        index = i;
      }
    }
    return (
      <div className={styles.coinListCon}>
        <div onClick={this.searchClick.bind(this)}>
          <SearchBar placeholder='搜索' disabled="true" />
        </div>
        <Tabs
          key={Math.random()}
          tabs={tabs}
          initialPage={Number(index)}
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
