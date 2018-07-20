import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';

export const MODEL_DEF = {
  modelName: 'subscribeResult',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  state: {

  },
  subscriptions: {

  },
  effects: {
  },
  reducers: {
  },
});
