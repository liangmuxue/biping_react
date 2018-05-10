const baseModel = {
  effects: {
    *active({ payload }, { put }) {
      console.log('active in common');
      yield put({ type: 'app/hideRouteLoading' });
    },
    *deactive({ payload }, { put }) {
      console.log('deactive in common');
      yield put({ type: 'deactiveOk' });
    },
    *paramsSet({ payload }, { put }) {
      console.log('paramsSet in common', payload);
      yield put({ type: 'paramsSetOk', payload });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    paramsSetOk(state, { payload }) {
      console.log('paramsSetOk in', payload);
      return {
        ...state,
        paramsData: payload.params,
      };
    },
    deactiveOk(state) {
      return {
        ...state,
      };
    },
  },
};

export default baseModel;
