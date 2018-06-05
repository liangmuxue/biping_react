
import 'antd-mobile/es/switch/style/index.css';
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import 'antd-mobile/es/button/style/index.css';
import React from 'react';


/**
* 订阅异动币内容组件
* @date        2018-04-20
* @author 梁慕学
*/

class Abnormal extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in SubItem', props);
    this.state = {
    };
  }
  // 订阅某小类
  subscribe(e) {
    console.log('subscribe in,props:', this.props);
    this.props.subscribeClick(this.props.itemObj);
  }

  render() {
    const {
      itemObj, dispatch, flag,
    } = this.props;
    console.log('itemObj is', itemObj);
    const tabs = [
      { title: <Badge >交易所</Badge> },
      { title: <Badge>涨跌幅</Badge> },
      { title: <Badge dot>成交量</Badge> },
    ];
    const TabExample = () => (
      <div>
        <Tabs
          tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{
 display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff',
}}
          >
        Content of first tab
          </div>
          <div style={{
 display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff',
}}
          >
        Content of second tab
          </div>
          <div style={{
 display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff',
}}
          >
        Content of third tab
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    );
    return (
      <TabExample />
    );
  }
}

export default Abnormal;
