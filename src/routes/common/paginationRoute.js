/**
 * 通用的分页请求封装
 * @date        2018-01-18
 * @author 梁慕学
 * @param       {func}                dispatch 需要传递dispatch方法
 * @param       {object}                config   对于不同页面请求的定义包括请求类别，初始数据等
 * @return      {object}               返回包装后的payload
 */
export function buildPagiProps(dispatch, config) {
  const props = Object.assign({}, config, {
    // 定义滚动到底部的处理，需要进行分页处理
    onEndReached() {
      const { modelName } = config.modelDef;
      // 请求名的通用拼法
      const disPatchType = `${modelName}/query`;
      // payload中需要连带modelDef和filter，用于后续分页查询
      const payload = {
        filter: config.filter,
        pagination: config.pagination,
        modelDef: config.modelDef,
        list: config.list, // 透传全部数据集合
      };
      // 累加当前页码，进行下一页查询
      payload.pagination.current += 1;
      dispatch({
        type: disPatchType,
        payload,
        loading: config.loading,
      });
    },
  });
  return props;
}
