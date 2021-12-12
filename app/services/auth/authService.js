import apiClient from '../ApiClient';

const authServices = {
  async singIn(phone = '', password = '') {
    const request = {
      phonenumber: phone,
      password
    };
    const response = await apiClient.post('/login', request, null);
    return response;
  },

  async signUp(phone, password) {
    const request = new FormData();
    request.append('phonenumber', phone);
    request.append('password', password);

    const response = await apiClient.post('/signup', request, null);
    return response;
  },

  async logout(phone = '', password = '') {
    const response = await apiClient.post('/logout', null, null);
    return response;
  }
};

export default authServices;
