import React from 'react';
// import WhiteSpace from 'antd-mobile/lib/white-space/index';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
import styles from './myLike.less';


/**
 * 我关注的
 * @date        2018-06-13
 * @author 赵永帅
 */

class MyLikeCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in BuyCard', props);
    this.state = {
    };
  }

  handleTap(e) {
    console.log('handleTap in,props,event:', e);
    e.preventDefault();
    const { msgObj } = this.props;
    if (msgObj) {
      msgObj.mid = msgObj.id;
    }
    this.props.myLikeClick(this.props.msgObj);
  }

  render() {
    const { msgObj } = this.props;
    console.log('msgObj888888', msgObj);
    return (
      <Hammer onTap={this.handleTap.bind(this)}>
        <div className={styles.historyBox}>
          <div className={styles.tops}>
            <img src={msgObj.logo} alt="-" />
          </div>

          <div className={styles.bottoms}>
            <div className={styles.events}>{msgObj.name}</div>
            <div className={styles.contents}>{msgObj.desc}</div>
          </div>
        </div>
      </Hammer>
    );
  }
}

export default MyLikeCard;
