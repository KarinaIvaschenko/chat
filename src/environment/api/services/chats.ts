import { ALL_CHATS_URL } from './../../../constants/url';
import axios from '../axios';

export const getAllChatsRequest = () => {
  return axios.get(ALL_CHATS_URL.CHATS);
};
