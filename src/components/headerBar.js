import React from 'react';
import ListView from 'antd-mobile/lib/list-view/index';
import Hammer from 'react-hammerjs';
import styles from './headerBar.less';

/**
 * 公共页面头内容
 * @date        2018-04-25
 * @author 梁慕学
 */


class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
  }
  backTo() {
    const { dispatch, backRouteLink } = this.props;
    console.log(`need back to:${backRouteLink}`);
    // 跳转到之前的页面
    dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: backRouteLink, backArrow: true },
    });
  }

  render() {
    const { headerText } = this.props;
    console.log('12345778', this.props);
    return (
      <div className={styles.toptitle}>
        {this.props.headerText}
        <Hammer onTap={this.backTo.bind(this)}>
          <div className={styles.zone}>
            <img src="/images/messageListImg/left_arrow.png" className={styles.leftArrow} />
          </div>
        </Hammer>
      </div>
    );
  }
}

export default HeaderBar;
