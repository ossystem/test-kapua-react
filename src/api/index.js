import apiWorker from '../utils/apiUtils';
import { API } from '../constants';

export const getTree = () => {
  return apiWorker('get', API.nodes, {}, null);
};

export const updateTree = (move) => {
  return apiWorker('post', API.updateNodes, {}, {move});
};