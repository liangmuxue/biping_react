/**
* 底部菜单项数据定义
* @author 梁慕学
* @DateTime  2017-12-25
*/

const menus = [
  {
    code: 'indexMessage',
    title: '消息',
    key: 'indexMessage',
    badge: 1,
    // icon: 'calendar',
    icon: 'url(/assets/footerImg/2.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/assets/footerImg/2actived.png) center center /  21px 21px no-repeat',
  },
  {
    code: 'healthInfo',
    title: '订阅管理',
    key: 'healthInfo',
    badge: 0,
    // icon: 'line-chart',
    icon: 'url(/assets/footerImg/3.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/assets/footerImg/3actived.png) center center /  21px 21px no-repeat',
  },
  {
    code: 'accountInfo',
    title: '我的  ',
    key: 'accountInfo',
    badge: 0,
    // icon: 'appstore-o',
    icon: 'url(/assets/footerImg/3.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/assets/footerImg/4actived.png) center center /  21px 21px no-repeat',
  },
];

export default menus;
