import { getAllChatsRequest } from './../environment/api/services/chats';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { setAllChats } from '../redux/allChats/allChats';

const useChats = () => {
  const dispatch = useDispatch<Dispatch>();

  const allChats = useSelector((state: RootState) => state.allChats);

  const getAllChats = async () => {
    try {
      const { data } = await getAllChatsRequest();
      dispatch(setAllChats(data));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    allChats,
    getAllChats,
  };
};

export default useChats;
