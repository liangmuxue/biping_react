import React, { Component } from 'react';
import config from './chart.config.js';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';


export class PieReact extends React.Component {
  constructor(props) {
    super(props);
    const id = (`_${Math.random()}`).replace('.', '_');
    this.state = {
      pieId: `pie${id}`,
      barId: `bar${id}`,
    };
  }
  componentDidMount() {
    console.log('componentDidMount!');

    this.initPie(this.state.pieId);
    this.initPie(this.state.barId);
  }
  componentDidUpdate() {
    console.log('componentDidUpdate!');
    this.initPie();
  }
  initPie(id) {
    console.log('获取数据并刷新');
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if (myChart === undefined) {
      myChart = echarts.init(document.getElementById(id));
    }
    myChart.setOption(config);
  }
  render() {
    return (
      <div>
        <div id={this.state.pieId} style={{ width: '500px', height: '500px', float: 'left' }} />
        <div id={this.state.barId} style={{ width: '500px', height: '500px', float: 'left' }} />
      </div>
    );
  }
}
export default PieReact;
