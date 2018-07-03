import React from 'react';
import styles from './typeLayer.less';

class TypeLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closeLayer() {
    this.props.closeLayer();
  }
  render() {
    const { eventCalendar } = this.props;
    const { typeList } = eventCalendar;
    if (!typeList || !typeList.data) {
      return null;
    }
    const typelistData = typeList.data;
    return (
      <div className={styles.typeLayer}>
        <span onClick={() => this.closeLayer()} className={styles.leftClose}></span>
        <div className={styles.title}>
          <p>订阅的类型<em>点击进入事件类型标签</em></p>
          <button>编辑</button>
        </div>
        <ul className={styles.typeList}>
          {typelistData.map(( msg ) => (
            <li>{msg.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TypeLayer;
