import axios from 'axios';
import { Promise } from 'es6-promise';

import { BASE_URL } from '../constants';

/**
 * @param {String} method
 * @param {String} url
 * @param {Object} params
 * @param {Object} data
 */
export default async function apiWorker(method, url, params, data) {
  console.log(`
    apiWorker
    baseUrl: ${BASE_URL}
    url: ${url}
    method: ${method}
    data: ${data}
  `);
  let result = {};
  try {
    result = await makeRequest(method, url, params, data, axios);
  } catch (e) {
    result = processError(e);
  }
  return passData(result);
}

/**
 * @param {String} method
 * @param {String} url
 * @param {Object} params
 * @param {Object} data
 * @param {Object} myAxios
 */
function makeRequest(method, url, params = {}, data = null, myAxios) {
  let result = getResFrame();
  const opt = { method, url, params };

  myAxios.defaults.baseURL = BASE_URL;

  if (data) {
    opt.data = data;
  }

  return myAxios(opt)
    .then(function(res) {
      if ((res.status === 201 || res.status === 200) && res.data) {
        result.data = res.data;
        result.success = true;
      }
      return result;
    });
}

function processError(e) {
  let result = getResFrame();
  let errorMsg = null;

  if (e.response && e.response.data) {
    console.log('REQUEST FAIL----', e.response);
    errorMsg = e.response.data.message
    result.message = errorMsg ? errorMsg : e.response.statusText;
  } else {
    result.message = 'Something went wrong! Try again!';
  }
  return result;
}

function passData(data) {
  return new Promise((resolve, reject) => {
    if(data.success) {
      resolve(data);
    }
    reject(data);
  });
}

function getResFrame() {
  return {
    data: null,
    success: false,
    message: '',
  };
}
