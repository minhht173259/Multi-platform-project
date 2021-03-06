/* eslint-disable default-param-last */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenStorage } from './TokenStorage';

let cancel;

class ApiClient {
  constructor() {
    this.baseUrl = 'https://zalo-group15.herokuapp.com/it4788';
  }

  initRequest(method = '', path = '', params = null) {
    const request = {
      baseUrl: this.baseUrl,
      url: this.baseUrl + path,
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),
      method,
      params
    };
    return request;
  }

  async checkTokenInvalid(response) {
    if (response && response.code) {
      await tokenStorage.tokenInvalid(response.code);
      return null;
    }
    return response;
  }

  async authorizeRequest(request) {
    // todo : Check Refresh token | duplicate service
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return request;
    }

    if (!request.headers) {
      request.headers = {
        Authorization: `Bearer ${token}`
      };
    } else {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  }

  async authorizeFormRequest(request) {
    // todo : Check Refresh token | duplicate service
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return request;
    }

    request.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    return request;
  }

  async get(path = '', params = null) {
    let request = this.initRequest('get', path, params);
    try {
      request = await this.authorizeRequest(request);
      const response = await axios(request);
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async getWithCancel(path = '', params = null) {
    if (cancel !== undefined) {
      cancel();
    }
    let request = this.initRequest('get', path, params);
    try {
      request = await this.authorizeRequest(request);
      const response = await axios(request);
      // this.checkTokenInvalid(response.data);
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async post(path = '', body, params = null) {
    let request = this.initRequest('post', path, params);
    request.data = body;
    try {
      request = await this.authorizeRequest(request);
      const response = await axios(request);
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async postFormData(path = '', body, params = null) {
    let request = this.initRequest('post', path, params);
    request.data = body;
    try {
      request = await this.authorizeFormRequest(request);
      const response = await axios(request);
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async put(path = '', body, params = null) {
    let request = this.initRequest('put', path, params);
    request.data = body;
    try {
      request = await this.authorizeRequest(request);
      const response = await axios(request);
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  async delete(path = '') {
    let request = this.initRequest('delete', path, null);
    try {
      request = await this.authorizeRequest(request);
      const response = await axios(request);
      return response.data;
    } catch (error) {
      throw this.processError(error);
    }
  }

  processError(error) {
    let errorModel = {};
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      errorModel = error.response.data;
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('Error', error.request);
      errorModel = {
        statusCode: null,
        errorCode: null,
        messages: ['No response was received']
      };
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message);
      errorModel = {
        statusCode: null,
        errorCode: null,
        messages: [error.message]
      };
    }
    return errorModel;
  }
}

const apiClient = new ApiClient();

export default apiClient;
