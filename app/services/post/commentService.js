import apiClient from '../ApiClient';

class CommentAndLikeService {
  async like(id) {
    const request = new FormData();
    request.append('id', id);

    const response = await apiClient.post('/like', request, null);
    return response;
  }

  async setComment(id, index = 0, count = 5, comment) {
    const request = new FormData();
    request.append('id', id);
    request.append('index', index);
    request.append('count', count);
    request.append('comment', comment);

    const response = await apiClient.post('/set_comment', request, null);
    return response;
  }

  async getComment(id, index, count) {
    const request = new FormData();
    request.append('id', id);
    request.append('index', index);
    request.append('count', count);

    const response = await apiClient.post('/get_comment', request, null);
    return response;
  }

  async editComment(id, idCom, comment) {
    const request = new FormData();
    request.append('id', id);
    request.append('id_com', idCom);
    request.append('comment', comment);

    const response = await apiClient.post('/edit_comment', request, null);
    return response;
  }

  async deleteComment(id, idCom) {
    const request = new FormData();
    request.append('id', id);
    request.append('id_com', idCom);

    const response = await apiClient.post('/delete_comment', request, null);
    return response;
  }
}

const commentService = new CommentAndLikeService();
export default commentService;
