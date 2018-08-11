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
    const { subDetailData, params } = data;
    console.log('SubDetailChildrenCard=>', this.props, subDetailData, params);
    return (
      <div className={styles.content}>
        <div className={styles.title}>【{subDetailData.data.typeName}】交易对订阅设置</div>
        <ul>
          {subDetailData.data.content.map(item => (
            params.typeId === 730 && item.exchangeId === 30 ? null : (
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
            )
          ))}
        </ul>
      </div>
    );
  }
}

export default SubDetailChildrenCard;
