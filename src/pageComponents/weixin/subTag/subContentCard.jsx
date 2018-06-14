import 'antd-mobile/es/button/style/index.css';
import Card from 'antd-mobile/lib/card/index';
import Hammer from 'react-hammerjs';
import React from 'react';
import style from './subTag.less';


/**
* 订阅包卡片
* @date        2018-04-25
* @author 赵永帅
*/

class SubContentCard extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }
  // 卡片点击
  handleTap() {
    console.log('handleTap in,props:', this.props.subObj);
    this.props.cardClick(this.props.subObj);
  }
  render() {
    const { subObj } = this.props;
    console.log('subObj', subObj);
    return (
      <div>
        <div className={style.mesList} >
          <Card full>
            <Hammer onTap={this.handleTap.bind(this)}>
              <div className={style.coinListBox}>
                <Card.Header title={
                  <div className={style.cardtitle}>
                    <div className={style.logoNameBox}>
                      <div className={style.logoFrom}>来自订阅：{subObj.tagName} · {subObj.time}</div>
                      <div className={style.clear} />
                    </div>
                  </div>}
                />
                <Card.Body>
                  <div className={style.cardtitles}>{subObj.content}</div>
                  <span className={subObj.startTime === '币事件' ? style.eventStrat : style.hide}>事件开始日期：{subObj.startTime}</span>
                </Card.Body>

              </div>
            </Hammer>
          </Card>
        </div>
      </div>
    );
  }
}

export default SubContentCard;
