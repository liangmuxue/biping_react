import React, { Component } from 'react';

/**
 * 微信公共父组件
 * @extends Component
 */
class BaseComponent extends Component {
  componentDidUpdate(props) {
    console.log('componentDidUpdate in base', props);
    props.dispatch({
      type: 'app/hideRouteLoading',
    });
  }
}

export default BaseComponent;
