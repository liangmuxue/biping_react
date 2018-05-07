import React from 'react';
import ListView from 'antd-mobile/lib/list-view/index';
import Toast from 'antd-mobile/lib/toast/index';
import 'antd-mobile/es/toast/style/index.css';
import style from './infiniteListView.less';

/**
 * 无线滚动长列表，用于移动端使用
 * @date        2018-01-15
 * @author 梁慕学
 */


class InfiniteListView extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
    };
  }
  componentWillMount() {
    console.log('componentWillMount infi', this.props);
    // // 有数据则加入到滚动列表
    if (this.props.dataSource && this.props.dataSource.length > 0) {
      // 这个list是所有的列表数据
      const { list } = this.props;
      // 转换为listview的数据源
      console.log('componentWillMount list is:', list);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list),
      });
    }
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps in', nextProps);
    const {
      loading, loadingShow,
    } = nextProps;
    // 如果是显示加载信息的内容，则不进行数据比较
    if (loading) {
      return;
    }
    // 有数据则加入到滚动列表
    if (nextProps.dataSource && nextProps.dataSource.length > 0) {
      // 这个list是所有的列表数据
      const { list } = nextProps;
      // 转换为listview的数据源
      console.log('componentWillReceivePropslist is:', list);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list),
      });
    }
  }

  render() {
    const {
      loading, onEndReached, pagination, bkey,
    } = this.props;
    console.log('render in infi', this.props);
    const endReached = (event) => {
      console.log('reach end', event);
      if (loading || !pagination.hasMore) {
        console.log('end no more');
        Toast.info('没有更多的内容了', 2);
        return;
      }
      // 调用父级方法，进行分页请求
      onEndReached();
    };
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
      />
    );
    let { pageSize } = this.props;
    if (pagination) {
      ({ pageSize } = pagination);
    }
    console.log(`pageSize in infi:${pageSize} with key:${bkey}`);
    const listView = (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={this.props.renderRow}
          renderSeparator={separator}
          className="am-list"
          pageSize={pageSize}
          style={{
            height: this.props.height,
            overflow: 'auto',
          }}
          onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReached={endReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
    return listView;
  }
}

export default InfiniteListView;
