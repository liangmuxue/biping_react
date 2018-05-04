import React from 'react';
// import ListView from 'antd-mobile/lib/list-view/index';

/**
 * 内部页面调度
 * @date        2018-02-10
 * @author 梁慕学
 */

class InnerPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in InnerPage', props);
    this.state = {
      isLoading: false, // 内部页面加载标志
      pageList: [], // 内部页面列表
    };
  }


  render() {
    const { loading, isActived, children } = this.props;

    return (
      <div
        style={isActived ? 'display:block' : 'display:none'}
      >{children}
      </div>
    );
  }
}

export default InnerPage;
