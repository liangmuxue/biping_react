import React from 'react';

/**
 * 提醒关注页面
 * @date        2018-04-27
 * @author 赵永帅
 */

class Tour extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in BuyCard', props);
    this.state = {
    };
  }

  render() {
    return (
      <h1>请先关注</h1>
    );
  }
}

export default Tour;
