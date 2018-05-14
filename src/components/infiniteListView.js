import React from 'react';
import ListView from 'antd-mobile/lib/list-view/index';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator/index';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh/index';
import 'antd-mobile/es/toast/style/index.css';
import styles from './infiniteListView.less';

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
      loading,
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
      loading, onEndReached, pagination, bkey, onRefresh, renderRow, list,
    } = this.props;
    console.log('render in infi', this.props);
    const endReached = (event) => {
      console.log('reach end', event);
      if (loading || !pagination.hasMore) {
        console.log('end no more,list', list);
        if (this.state.noMoreTipShow) {
          return;
        }
        // 直接在组件state中添加提示没有更多
        list.push({ noMoreTip: 1 });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(list),
          noMoreTipShow: true,
        });
      } else {
        // 调用父级方法，进行分页请求
        onEndReached();
      }
    };
    const onRefreshAct = (event) => {
      console.log('onRefreshAct in', event);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.state = {
        dataSource,
      };
      // 调用父级方法，进行刷新请求
      onRefresh();
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
    const renderRowInner = (rowData, sectionID, rowID) => {
      console.log('renderRowInner rowData:', rowData);
      if (rowData.noMoreTip && rowData.noMoreTip === 1) {
        return <div className={styles.noMoreTip}>没有更多内容了</div>;
      } else {
        return renderRow(rowData, sectionID, rowID);
      }
    };
    const listView = (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={renderRowInner}
          renderSeparator={separator}
          className="am-list"
          pageSize={pageSize}
          style={{
            height: this.props.height,
            overflow: 'auto',
          }}
          pullToRefresh={<PullToRefresh
            onRefresh={onRefreshAct}
            distanceToRefresh={25}
            indicator={{
              release: <ActivityIndicator text="正在加载" size="samll" />,
              finish: <div />,
            }}

          />}
          onScroll={() => {}}
          scrollRenderAheadDistance={500}
          onEndReached={endReached}
          onEndReachedThreshold={10}
        />
        {this.state.noMoreTip}
      </div>
    );
    return listView;
  }
}

export default InfiniteListView;
