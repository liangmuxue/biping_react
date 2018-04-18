import React, { Component } from 'react';

/**
 * 移动端通用route父类，使用HOC模式
 * 主要处理页面激活和隐藏等状态事件
 * @date        2018-02-10
 * @author 梁慕学
 */
const mobileRouteComponent = (WrappedComponent) => {
  return class extends Component {
    render() {
      console.log('WrappedComponent render,this.props', this.props);
      return <WrappedComponent {...this.props} />;
    }
  };
};
export default mobileRouteComponent;
