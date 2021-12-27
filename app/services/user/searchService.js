import apiClient from '../ApiClient';

class SearchService {
  search(keyword) {
    const request = new FormData();
    request.append('keyword', keyword);

    const response = apiClient.post('/search', request, null);
    return response;
  }

  getSavedSearch(index, count) {
    // index, count
    const request = new FormData();
    request.append('index', index);
    request.append('count', count);

    const response = apiClient.post('/get_saved_search', request, null);
    return response;
  }

  delSavedSearch(id, all) {
    const request = new FormData();
    // TODO: Option

    const response = apiClient.post('/del_saved_search', request, null);
    return response;
  }
}
const searchService = new SearchService();
export default searchService;
