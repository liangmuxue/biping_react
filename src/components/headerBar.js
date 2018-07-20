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
  backTo(e) {
    // e.stopPropagation();
    const { dispatch, backRouteLink, pageName } = this.props;
    console.log('currentPath', this.props);
    const currentPage = pageName;
    // 跳转到之前的页面
    dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: backRouteLink, backArrow: true, currentPage },
    });
  }

  render() {
    const { headerText } = this.props;
    console.log('12345778', this.props);
    return (
      <div className={styles.toptitle}>
        {this.props.headerText}
        <div onClick={(e) => this.backTo(e)} type="headerBack" className={styles.zone} ref={backArrow => this.backArrowArea = backArrow}>
          <img src="/images/messageListImg/left_arrow.png" className={styles.leftArrow} />
        </div>
      </div>
    );
  }
}

export default HeaderBar;
