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
  backTo(e) {
    e.preventDefault();
    const { subTagObj } = this.props;
    const { dispatch } = subTagObj;
    console.log('currentPath', this.props);
    // 跳转到之前的页面
    dispatch({
      type: 'pageConstruction/switchToInnerPage',
      payload: { pageName: 'indexMessage', backArrow: true, currentPage: 'indexMessage' },
    });
  }
  render() {
    const { subTagObj } = this.props;
    console.log('subTagObj', subTagObj);
    return (
      <div>
        <div className={style.mesList} >
          <Card full>
            <Hammer >
              <div className={style.coinListBox}>
                <Card.Header title={
                  <div className={style.cardtitle}>
                    <div className={style.logoNameBox}>
                      <div className={style.logoFrom}>来自订阅：交易所公告 · 刚刚</div>
                      <div className={style.clear} />
                    </div>
                  </div>}
                />
                <Card.Body>
                  <div className={style.cardtitles}> gate.io将HAV，REM，Tomo和ELEC转移到主交易区长期支持公告</div>
                  <span className={style.eventStrat}>事件开始日期：2018年6月21日</span>
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
