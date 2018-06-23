import React from 'react';
import NoticeBar from 'antd-mobile/lib/notice-bar/index';
import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Tabs from 'antd-mobile/lib/tabs/index';
import Badge from 'antd-mobile/lib/badge/index';
import 'antd-mobile/es/notice-bar/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import style from './subContentType.less';
import ChooseTime from './chooseTime.jsx';
import SubItem from './subItem.jsx';
import BuyOrPayCard from './buyOrPayCard.jsx';
import CheckTime from './checkTimeCard.jsx';

// import 'antd-mobile/dist/antd-mobile.css';


/**
* 订阅小项内容组件
* @date        2018-04-20
* @author 梁慕学
*/
class SubContentType extends React.Component {
  constructor(props) {
    super(props);
    console.log('thisprops is', props);
    this.state = {
    };
  }
  // 订阅交易所
  subscribeItem(itemObj) {
    this.props.subscribeItem(itemObj);
  }
  subscribeAll() {
    this.props.subscribeAll();
  }
  // 开通or关闭
  gainOrLose(itemObj) {
    console.log('gainOrLose2', itemObj);
    this.props.gainOrLose(itemObj);
  }
  render() {
    const { subTypeContent } = this.props;
    if (!subTypeContent || !subTypeContent.subDetailData) {
      return null;
    }
    const { subDetailData } = subTypeContent;
    console.log('subTypeContent11111', subDetailData);
    // 选择买入量卖出量
    const { volArea } = subDetailData.data;
    const tabs = [
      { title: <Badge >交易所</Badge> },
      { title: <Badge >涨跌幅</Badge> },
      { title: <Badge >成交量</Badge> },
    ];

    const checkTime = (
      <CheckTime
        checkTimeObj={subTypeContent}
      />
    );
    const buyOrPayContent = (
      volArea.map(item => (
        <BuyOrPayCard buyObj={item} gainOrLose={this.gainOrLose.bind(this)} />))
    );

    return (
      <div>
        <Tabs
          tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ position: 'relative' }}>
            <div className={style.listTitle} style={{ marginTop: 0, height: '1.74rem' }}>【{subDetailData.data.typeName}】订阅管理<button className={style.openAll} onClick={this.subscribeAll.bind(this)} >打开所有</button></div>

            <div className={style.noticeBar}>
              <NoticeBar marqueeProps={{ loop: true, style: { textAligin: 'left', padding: '0 7.5px' } }}>
                      目前仅支持火币和HADAX两个交易所
              </NoticeBar>
            </div>
            <div style={{
         backgroundColor: '#fff',
        }}
            >  {subDetailData.data.exchangeArea.map(item =>
                          (<SubItem
                            abnormal={1}
                            key={item.transVerbId}
                            itemObj={item}
                            subscribeClick={this.subscribeItem.bind(this)}
                          />))}
            </div>
            <div className={style.waiting}>
              <div className={style.borderBox}>
                <img src="/images/coinList/okex.png" className={style.subItemLogo} alt="" />
                <span className={style.logoName}>OKEx</span>
                <span className={style.plzWaiting}>敬请期待</span>
                <div style={{ clear: 'both' }} />
              </div>
            </div>

            <div className={style.waiting}>
              <div className={style.borderBox}>
                <img src="/images/coinList/bian.png" className={style.subItemLogo} alt="" />
                <span className={style.logoName}>币安</span>
                <span className={style.plzWaiting}>敬请期待</span>
              </div>
            </div>
          </div>
          <div >
            <div className={style.coinSet}>异动时间段选择</div>
            {checkTime}
            <div className={style.coinSet}>涨跌幅设置</div>
            <ChooseTime chooseObj={subDetailData} gainOrLose={this.gainOrLose.bind(this)} />
          </div>
          <div >
            <div className={style.coinSet}>交易量异动设置</div>
            {buyOrPayContent}
            <div className={style.dealTips}>注：根据币评大数据显示，90%以上的超过60万人民币的单笔交易代表庄家要控盘的信号</div>
          </div>
        </Tabs>
        <WhiteSpace />
      </div>

    );
  }
}
export default SubContentType;
