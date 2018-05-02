import React from 'react';
import ListView from 'antd-mobile/lib/list-view/index';

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

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    // setTimeout(() => {
    //   this.rData = genData();
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //     isLoading: false,
    //   });
    // }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps in', nextProps);
    // 如果是显示加载信息的内容，则不进行数据比较
    if (nextProps.loading) {
      return;
    }
    // 有数据则加入到滚动列表
    if (nextProps.dataSource && nextProps.dataSource.length > 0) {
      // 这个list是所有的列表数据
      const { list } = nextProps;
      // 转换为listview的数据源
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list),
      });
    }
  }


  render() {
    const {
      loading, onEndReached, pageSize, pagination,
    } = this.props;
    const endReached = (event) => {
      console.log('reach end', event);
      if (loading || !pagination.hasMore) {
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

    return (
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
    );
  }
}

export default InfiniteListView;
