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
    // 跳转到之前的页面
    dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: backRouteLink },
    });
  }

  render() {
    const { headerText } = this.props;
    return (
      <div className={styles.toptitle}>
        {this.props.headerText}
        <Hammer onTap={this.backTo.bind(this)}>
          <img src="/images/messageListImg/left_arrow.png" className={styles.leftArrow} />
        </Hammer>
      </div>
    );
  }
}

export default HeaderBar;
