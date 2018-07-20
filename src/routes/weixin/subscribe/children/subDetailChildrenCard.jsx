import React from 'react';
// import NoticeBar from 'antd-mobile/lib/notice-bar/index';
import styles from './subDetailChildrenCard.less';

class SubDetailChildrenCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  itemClick(item) {
    this.props.itemClick(item);
  }
  render() {
    const { data } = this.props;
    const { subDetailData } = data;
    console.log('SubDetailChildrenCard=>', this.props, subDetailData);
    return (
      <div className={styles.content}>
        <div className={styles.title}>【{subDetailData.data.typeName}】交易对订阅设置</div>
        {/* <NoticeBar marqueeProps={{ loop: true, style: { textAligin: 'left', padding: '0 7.5px' } }}>
          目前仅支持火币和HADAX两个交易所
        </NoticeBar> */}
        {/* <div className={styles.support}><img alt="" src="/images/myselfImg/1.png" />目前仅支持火币和HADAX两个交易所</div> */}
        <ul>
          {subDetailData.data.content.map(item => (
            <li onClick={() => this.itemClick(item)} key={item.exchangeId}>
              <img src={item.img} className={styles.headImg} alt="" />
              {item.name}
              {item.wait ? (
                <div className={styles.rightText}>敬请期待</div>
              ) : (
                <div className={styles.right}>
                  <img className={styles.rightImg} alt="" src="/images/buyHistoryImg/right_arrow.png" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SubDetailChildrenCard;
