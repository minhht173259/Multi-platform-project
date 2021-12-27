import apiClient from '../ApiClient';

class ChatService {
  async getListConversations(index, count) {
    const request = new FormData();
    request.append('index', index);
    request.append('count', count);

    const response = await apiClient.post('/get_list_conversation', request, null);
    return response;
  }

  async getConversation(partnerId, index, count) {
    const request = new FormData();
    request.append('partner_id', partnerId);
    request.append('index', index);
    request.append('count', count);

    const response = await apiClient.post('/get_conversation', request, null);

    return response;
  }

  async deleteMessage(messageId) {
    const request = new FormData();
    request.append('message_id', messageId);

    const response = await apiClient.post('/delete_message', request, null);
    return response;
  }

  async deleteConversation(partnerId, conversationId) {
    const request = new FormData();
    request.append('partner_id', partnerId);
    request.append('conversation_id', conversationId);

    const response = await apiClient.post('/delete_conversation', request, null);
    return response;
  }
}

const chatService = new ChatService();
export default chatService;
