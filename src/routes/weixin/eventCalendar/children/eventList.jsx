import React from 'react';
import InfiniteListView from '../../../../components/infiniteListView';
import { buildPagiProps } from '../../../common/paginationRoute';
import { rebuildMessageList } from '../../../../selectors/messageList';
import styles from './eventList.less';
import TypeLayer from '../layer/typeLayer';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeId: '',
      typeColor: {
        首次代币发行: '#66A5C3',
        交易所公告: '#E9880B',
        硬分叉: '#5C6E3F',
        政策发布: '#0BE983',
        会议: '#E2D115',
        线下交流会: '#9DE90B',
        软分叉: '#724D4D',
        合作消息: '#DF4EE8',
        空投: '#39C58D',
        AMA: '#F86E6E',
        功能发布: '#E9600B',
        公告: '#6CC857',
        转链消息: '#646685',
        升级通知: '#EB3724',
        通用: '#0BA2E9',
        测试通知: '#EBB924',
        蓝图规划: '#363AE0',
        开发竞赛: '#E84E90',
        代币销毁: '#5E4EE5',
      },
      showLayer: false,
    };
  }

  componentWillMount() {
  }
  componentDidMount() {
  }

  typeClick(msg) {
    if (!msg) {
      this.state.typeId = '';
    } else {
      this.state.typeId = msg.id;
    }
    this.props.changeType(this.state.typeId);
  }
  showLayer() {
    this.setState({
      showLayer: true,
    });
  }
  closeLayer() {
    this.setState({
      showLayer: false,
    });
  }
  render() {
    const { eventCalendar } = this.props;
    const { typeList, listData } = eventCalendar;
    if (!typeList || !typeList.data) {
      return null;
    }
    const typelistData = typeList.data;

    // 加工list数据
    const { messageList } = rebuildMessageList({ messageList: eventCalendar });
    console.log('messageList is', messageList);
    const messageListProps = buildPagiProps(this.props.dispatch, {
      ...messageList,
      renderRow: (rowData) => {
        const borderStyle = {
          'border-top-color': this.state.typeColor[rowData.typename],
        };
        const colorStyle = {
          'background-color': this.state.typeColor[rowData.typename],
        };
        let buttonDom = null;
        if (rowData.recerveStatus == 'false') {
          buttonDom = <button className={styles.rightBtn} onClick={() => this.props.reminder(rowData)}>提醒</button>;
        } else {
          buttonDom = <button className={styles.rightBtnSelect} onClick={() => this.props.reminder(rowData)}>已设置</button>;
        }
        return (
          <div>
            <div className={`${styles.listItem}`} style={borderStyle}>
              <div className={styles.leftCon} onClick={() => this.props.toDetail(rowData)} >
                <div className={styles.dsc}>
                  <img alt="币种" src={rowData.img} />
                  <span className={styles.name}>{rowData.coincode}</span>
                  <span className={styles.time}>{rowData.pubtime}</span>
                </div>
                <p className={styles.title}>{rowData.title}</p>
                <p className={styles.detail}>
                事件发布时单价 ￥{rowData.pubprice}，1天后单价
                ￥{rowData.afterprice}，涨幅<em className={`${rowData.incr.indexOf('+') < 0 ? styles.down : styles.up}`}>{rowData.incr}</em>
                </p>
              </div>
              {buttonDom}
              {/* <button className={styles.rightBtn} onClick={() => this.props.reminder(rowData)}>提醒</button> */}
              <div className={styles.rightTop} style={colorStyle}>
                {rowData.typename}
              </div>
            </div>
          </div>
        );
      },
    });
    // var calendarDomHeight = document.getElementById('calendarDom').clientHeight;
    const height = document.documentElement.clientHeight - 210;
    const divStyle = {
      height: height - 100,
    };
    return (
      <div className={styles.eventList}>
        <div id="tagDom" className={styles.tag}>
          <ul>
            <li onClick={() => this.typeClick()} className={`${this.state.typeId == '' ? styles.selected : ''}`}>全部</li>
            {typelistData.map((msg, index) => (
              <li onClick={() => this.typeClick(msg)} key={msg.id} className={`${this.state.typeId == msg.id ? styles.selected : ''}`}>{msg.name}</li>
            ))}
          </ul>
          <div onClick={() => this.showLayer()} className={styles.rightBtn} style={{ display: 'none' }}>
            <img alt="分类" src="/images/calendar/type-right-Button.png" />
          </div>
        </div>
        {
          messageList.list.length > 0 ?
            <InfiniteListView
              {...messageListProps}
              height={height}
              listRemain
            /> :
            <div style={divStyle} className={styles.noData}><img src="/images/calendar/nodata.png" alt="无数据" />当前日期暂无事件，调整日期试试</div>
        }
        {
          this.state.showLayer ? <TypeLayer closeLayer={() => this.closeLayer()} {...this.props} /> : ''
        }
      </div>
    );
  }
}

export default EventList;
