import {config} from '../../config';

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
    if(options !== undefined) {
      Object.keys(options).map((key, index) => {
        optionsArray.push(key + '=' + options[key]);
      });
    }

    const optionsStringified = '?' + optionsArray.join('&');

    return fetch(`${apiUrl}${path}${optionsStringified}`, {
      method: 'GET',
      headers,
    })
      .then(checkStatus)
      .then(response => response.json())
      .catch(e => console.warn('Get error:', e));
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
      .catch(e => console.warn('Post error:', e));
  },

  put: () => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...api.getAuthHeaders(),
    };

    const body = JSON.stringify(data);

    return fetch(`${apiUrl}${path}`, {
      method: 'PUT',
      headers,
      body,
    })
      .then(checkStatus)
      .then(response => response.json())
      .catch(e => console.warn('Post error:', e));
  },

  session_token: () => {
    return !!config.testUser ?
      config.testUser.token :
      session_token;
  },


  clearToken: () => {
    session_token = null;
  },

  setToken: (newToken) => {
    session_token = newToken;
  },

  getToken: () => (session_token),

  getTokenObj: () => ({session_token}),

  getAuthHeaders: () => ({
    'Authorization': `Bearer ${api.getToken()}`,
  }),
};