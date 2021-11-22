import apiClient from '../ApiClient';

const authServices = {
  async singIn(phone = '', password = '') {
    const request = {
      phonenumber: phone,
      password
    };
    const response = await apiClient.post('/login', request, null);
    return response;
  }
};

export default authServices;
