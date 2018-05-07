import React, { Component } from 'react';
import { connect } from 'dva';
import TabBar from 'antd-mobile/es/tab-bar';
import 'antd-mobile/es/tab-bar/style/index.css';
import 'antd-mobile/es/badge/style/index.css';
import 'antd-mobile/es/tabs/style/index.css';
import footMenus from './footerMenuData';
import styles from './index.less';

/**
* 底部菜单栏
* @author 梁慕学
* @Date  2017-12-25
*/
function genFooterMenus({ dispatch, pageConstruction }) {
  const { selectedMenu, footerHide } = pageConstruction;
  const menuChoice = (menu) => {
    dispatch({
      type: 'pageConstruction/footMenuChoice',
      payload: { selectedMenu: menu },
    });
  };
  return (
    <div
      style={{
 position: 'fixed', zIndex: 999, width: '100%', bottom: 0,
}}
      className={footerHide ? styles.hide : null}
    >
      <TabBar
        unselectedTintColor="#7F8389"
        tintColor="#428Bff"
        barTintColor="white"
        hidden={pageConstruction.footMenuHidden}
      >
        {footMenus.map(menu =>
          (<TabBar.Item
            title={menu.title}
            key={menu.key}
            icon={<div style={{
              width: '21px',
              height: '21px',
              background: menu.icon,
}}
            />
            }
            selectedIcon={<div style={{
              width: '21px',
              height: '21px',
              background: menu.selectedIcon,
}}
            />
            }
            selected={selectedMenu.key === menu.key}
            badge={menu.badge}
            onPress={() => {
              menuChoice(menu);
            }}
            data-seed="logId"
          />
      ))}
      </TabBar>
    </div>
  );
}

class Footer extends Component {
  render() {
    return genFooterMenus(this.props);
  }
}

function mapStateToProps({ pageConstruction }) {
  return { pageConstruction };
}

export default connect(mapStateToProps)(Footer);
