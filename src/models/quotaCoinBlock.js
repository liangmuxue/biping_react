import modelExtend from 'dva-model-extend';
import { pageModel } from './pagination';
import { queryNormal } from '../services/common';

// 使用常量定义，用于多个地方引用
export const MODEL_DEF = {
  modelName: 'quotaCoinBlock',
};
export default modelExtend(pageModel, {
  namespace: MODEL_DEF.modelName,
  effects: {
  },
  reducers: {
  },
});
