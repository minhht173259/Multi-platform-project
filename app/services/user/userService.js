import { Fragment } from 'react';
import apiClient from '../ApiClient';

class UserService {
  async getUserInfo(userId) {
    const request = new FormData();
    request.append('user_id', userId);

    const response = await apiClient.post('/get_user_info', request, null);
    return response;
  }

  async getUserFriends(userId, index, count) {
    const request = new FormData();
    request.append('user_id', userId);
    request.append('index', index);
    request.append('count', count);

    const response = await apiClient.post('/get_user_friends', request, null);
    return response;
  }

  async getRequestedFriend(userId, index, count) {
    const request = new FormData();
    request.append('user_id', userId);
    request.append('index', index);
    request.append('count', count);

    const response = await apiClient.post('/get_requested_friend', request, null);
    return response;
  }

  async getSuggestedListFriends(index, count) {
    const request = new FormData();
    request.append('index', index);
    request.append('count', count);

    const response = await apiClient.post('/get_suggested_list_friends', request, null);
    return response;
  }

  async setRequestFriend(userId) {
    // send request
    const request = new FormData();
    request.append('user_id', userId);

    const response = await apiClient.post('/set_request_friend', request, null);
    return response;
  }

  async setAcceptFriend(userId, isAccept) {
    // UserId này của người gửi
    const request = new FormData();
    request.append('user_id', userId);
    request.append('is_accept', isAccept);

    const response = await apiClient.post('/set_accept_friend', request, null);
    return response;
  }

  async changePassword(password, newPassword) {
    const request = new FormData();
    request.append('password', password);
    request.append('new_password', newPassword);

    const response = await apiClient.post('/change_password', request, null);
    return response;
  }

  async setBlockUser(userId, type) {
    // userId của người muốn block
    const request = new FormData();
    request.append('user_id', userId);
    request.append('type', type);

    const response = await apiClient.post('/set_block_user', request, null);
    return response;
  }

  async setBlockDiary(userId, type) {
    // Nhật ký block
    // userId của người muốn block
    const request = new FormData();
    request.append('user_id', userId);
    request.append('type', type);

    const response = await apiClient.post('/set_block_user', request, null);
    return response;
  }

  getVerifyCode() {}

  checkVerifyCode() {}

  delSavedSearch() {}

  getSavedSearch() {}
}

const userService = UserService();
export default userService;
