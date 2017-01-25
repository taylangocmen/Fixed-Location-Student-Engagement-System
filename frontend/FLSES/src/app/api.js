import {config} from '../../config';
import {storage} from '../app/storage';

export const apiUrl = `${config.apiBaseUrl}`;

let session_token = null;

const checkStatus = response =>
  Math.floor(response.status / 100) === 2 ?
    response :
    Promise.reject(response);

export const api = {
  get: (path, options) => {
    const headers = {
      ...api.getAuthHeaders(),
    };


    let optionsArray = [];
    Object.keys(options).map((key, index) => {
      optionsArray.push(key + '=' + options[key]);
    });

    const optionsStringified = '?' + optionsArray.join('&');

    // console.error('optionsStringified:', optionsStringified);

    return fetch(`${apiUrl}${path}${optionsStringified}`, {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(response => response.json())
      .catch(e => console.warn('Error:', e));
  },

  post: (path, data) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...api.getAuthHeaders(),
    };

    const body = JSON.stringify(data);

    return fetch(`${apiUrl}${path}`, {
      method: 'POST',
      headers,
      body,
    })
      .then(checkStatus)
      .then(response => response.json())
      .catch(e => console.warn('Error:', e));

  },

  session_token: () => (
    !!config.testUser ?
      '':
      session_token
  ),


  clearToken: () => {
    session_token = null;
    return storage.clearApiToken();
  },

  setToken: (newToken) => {
    session_token = newToken;
    storage.setApiToken(newToken);
  },

  getToken: () => storage.getApiToken()
    .then(storedToken => (session_token = storedToken)),

  tokenExists: () => session_token !== null,


  returnToken: () => api.getToken()
    .then(() => ({session_token})),

  getAuthHeaders: () => ({
    "Authorization": `Bearer ${api.session_token()}`,
  }),

};