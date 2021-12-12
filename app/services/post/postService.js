import apiClient from '../ApiClient';

class PostService {
  async addPost(described, images, video) {
    const formDataRequest = new FormData();
    formDataRequest.append('described', described);
    formDataRequest.append('image', images);
    formDataRequest.append('video', video);

    const response = await apiClient.post('/add_post', formDataRequest, null);
    return response;
  }

  getPost() {}

  async getListPosts(lastId = -1, index = 0, count = 5) {
    const request = new FormData();
    request.append('last_id', lastId);
    request.append('index', index);
    request.append('count', count);
    const response = await apiClient.post('/get_list_posts', request, null);
    return response;
  }

  async checkNewItem(lastId = -1, categoryId) {
    const request = new FormData();
    request.append('last_id', lastId);
    request.append('category_id', categoryId);

    const response = await apiClient.post('/check_new_item', request, null);
    return response;
  }

  async editPost(id, described, image = [], imageDel = [], imageSort = null, video) {
    const request = new FormData();
    request.append('id', id);
    request.append('image', image);
    request.append('image_del', imageDel);
    request.append('image_sort', imageSort);
    request.append('video', video);

    const response = await apiClient.post('/edit_post', request, null);
    return response;
  }

  async deletePost(id) {
    const request = new FormData();
    request.append('id', id);

    const response = await apiClient.post('/delete_post', request, null);
    return response;
  }

  async reportPost(id, subject, details) {
    const request = new FormData();
    request.append('id', id);
    request.append('subject', subject);
    request.append('details', details);

    const response = await apiClient.post('/report_post', request, null);
    return response;
  }
}

const postService = new PostService();

export default postService;
