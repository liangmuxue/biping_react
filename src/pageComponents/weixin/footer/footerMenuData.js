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
    badge: 0,
    // icon: 'calendar',
    icon: 'url(/images/footerImg/msg.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/images/footerImg/msgActived.png) center center /  21px 21px no-repeat',
  },
  {
    code: 'eventCalendar',
    title: '事件日历',
    key: 'eventCalendar',
    badge: 0,
    icon: 'url(/images/footerImg/calendar-gray.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/images/footerImg/calendar-blue.png) center center /  21px 21px no-repeat',
  },
  {
    code: 'subList',
    title: '订阅管理',
    key: 'subList',
    badge: 0,
    // icon: 'line-chart',
    icon: 'url(/images/footerImg/manage.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/images/footerImg/manageActived.png) center center /  21px 21px no-repeat',
  },
  {
    code: 'myself',
    title: '我的  ',
    key: 'myself',
    badge: 0,
    // icon: 'appstore-o',
    icon: 'url(/images/footerImg/my.png) center center /  21px 21px no-repeat',
    selectedIcon: 'url(/images/footerImg/myActived.png) center center /  21px 21px no-repeat',
  },
];

export default menus;
