import React from 'react';
import Button from 'antd-mobile/lib/button/index';
import 'antd-mobile/es/wing-blank/style/index.css';
import 'antd-mobile/es/white-space/style/index.css';
import Card from 'antd-mobile/lib/card/index';
import 'antd-mobile/es/button/style/index.css';
import style from './subTag.less';

/**
 * 消息列表页面--某个标签
 * @author 梁慕学
 * @Date  2018-4-29
 */

class SubTag extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in MessageCard', props);
    this.state = {
    };
  }


  render() {
    return (
      <div >
        <div className={style.coinMain} style={{ display: 'block' }}>
          <div className={style.bgBox} >
            <div className={style.mask} />
            <img className={style.bgPic} src="/images/coinList/coinBg.png" />
          </div>
          <div>
            <img className={style.coinArrow}src="/images/coinList/coinArrow.png" />
            <img className={style.coinLogo} src="/images/coinList/coinBg.png" />
            <span className={style.readNum}>33168人关注</span>
            <div style={{ background: '#fff' }}>
              <div className={style.coinName}>BTC(比特币)</div>
              <div className={style.btnBox}>
                <Button type="primary" className={style.subscribe}>订阅</Button>
              </div>
            </div>
          </div>
        </div>

        <div className={style.coinList} >
          <div className={style.coinListBox}>
            <Card.Header title={
              <div className={style.cardtitle}>
                <div className={style.logoFrom}>来自订阅：交易所公告 · 刚刚</div>
                <div className={style.clear} />
              </div>}
            />
            <Card.Body>
              <div className={style.cardtitles}> gate.io将HAV，REM，Tomo和ELEC转移到主交易区长期支持公告</div>
              <span className={style.eventStrat}>事件开始日期：2018年6月21日</span>
            </Card.Body>
          </div>

          <div className={style.coinListBox}>
            <Card.Header title={
              <div className={style.cardtitle}>
                <div className={style.logoFrom}>来自订阅：交易所公告 · 刚刚</div>
                <div className={style.clear} />
              </div>}
            />
            <Card.Body>
              <div className={style.cardtitles}> gate.io将HAV，REM，Tomo和ELEC转移到主交易区长期支持公告</div>
              <span className={style.eventStrat}>事件开始日期：2018年6月21日</span>
            </Card.Body>
          </div>

          <div className={style.coinListBox}>
            <Card.Header title={
              <div className={style.cardtitle}>
                <div className={style.logoFrom}>来自订阅：交易所公告 · 刚刚</div>
                <div className={style.clear} />
              </div>}
            />
            <Card.Body>
              <div className={style.cardtitles}> gate.io将HAV，REM，Tomo和ELEC转移到主交易区长期支持公告</div>
              <span className={style.eventStrat}>事件开始日期：2018年6月21日</span>
            </Card.Body>
          </div>

          <div className={style.coinListBox}>
            <Card.Header title={
              <div className={style.cardtitle}>
                <div className={style.logoFrom}>来自订阅：交易所公告 · 刚刚</div>
                <div className={style.clear} />
              </div>}
            />
            <Card.Body>
              <div className={style.cardtitles}> gate.io将HAV，REM，Tomo和ELEC转移到主交易区长期支持公告</div>
              <span className={style.eventStrat}>事件开始日期：2018年6月21日</span>
            </Card.Body>
          </div>
        </div>
      </div>


    );
  }
}


export default SubTag;
