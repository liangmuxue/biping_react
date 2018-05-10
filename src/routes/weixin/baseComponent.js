import React, { Component } from 'react';
import { innerPageDefs } from '../../wxRouter';

/**
 * 微信公共父组件
 * @extends Component
 */
class BaseComponent extends Component {
  componentWillMount() {
    console.log('componentWillMount in base:', this.props);
    const { modelName } = this.props;
    const action = `${modelName}/paramsSet`;
    // 统一分发请求参数
    this.props.dispatch({
      type: action,
      payload: { params: this.props.params },
    });
  }
  componentDidUpdate(props) {
    console.log('componentDidUpdate in base', props);
    console.log('this is', this);
    const self = this;
    const matchItem = innerPageDefs.def.filter((element) => {
      return element.name === self.props.pageName;
    })[0];
    console.log('matchItem is', matchItem);
    props.dispatch({
      type: 'pageConstruction/hideRouteLoading',
      pageName: matchItem.name,
    });
  }
}

export default BaseComponent;
