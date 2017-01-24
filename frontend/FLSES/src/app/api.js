import {config} from '../../config';

export const apiUrl = `${config.apiBaseUrl}`;

let token = null;

export const api = {
  post: (path, data) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const body = JSON.stringify(data);

    return fetch(`${apiUrl}${path}`, {
      method: 'POST',
      headers,
      body,
    })
  }

};