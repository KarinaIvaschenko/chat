import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategories } from '../redux/categories/slice';
import { setLanguages } from '../redux/languages/slice';
import { setAllChats } from '../redux/allChats/allChats';
import { useNavigate } from 'react-router-dom';
import useChats from '../hooks/useChats';

import {
  Categories,
  CreateChat,
  Welcome,
  ChatsContainer,
  SearchBlock,
  AllFilters,
} from '../components';
import NewUser from '../components/Modals/NewUser/NewUser';
import { removeUser, setVerified } from '../redux/user/slice';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { welcomeModal, createChatModal, newUserModal } = useSelector(
    (state: RootState) => state.modals,
  );
  const { token } = useSelector((state: RootState) => state.user);

  // const { getAllChats } = useChats();

  const checkLogSession = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const endpoint = 'api/v1/chat-channel/public';
      const url = `${baseUrl}/${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(url, { headers });
      const data = response.data.data;      
    } catch (error) {
      console.log('log')
      console.error(error);
      dispatch(removeUser());
      dispatch(setVerified(false));
      navigate('/');
    }
  };

  useEffect(() => {
    checkLogSession();
    const getChats = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const endpoint = 'api/v1/chat-channel/public';
        const url = `${baseUrl}/${endpoint}`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, { headers });
        const data = response.data.data;

        if (response.status === 401) {
          dispatch(removeUser());
          dispatch(setVerified(false));
          navigate('/');
        }

        dispatch(setAllChats(data));
      } catch (error) {
        console.error(error);
      }
    };
    getChats();
  }, []);

  useEffect(() => {
    checkLogSession();
    const getCategories = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const endpoint = 'api/v1/chat-category';
        const url = `${baseUrl}/${endpoint}`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });
        const data = response.data.data;

        if (response.status === 401) {
          dispatch(removeUser());
          dispatch(setVerified(false));
          navigate('/');
        }

        dispatch(setCategories(data));
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL;
        const endpoint = 'api/v1/chat-language';
        const url = `${baseUrl}/${endpoint}`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });
        const data = response.data.data;

        if (response.status === 401) {
          dispatch(removeUser());
          dispatch(setVerified(false));
          navigate('/');
        }

        dispatch(setLanguages(data));
      } catch (error) {
        console.error(error);
      }
    };

    getLanguages();
  }, []);

  const { isExpanded } = useSelector((state: RootState) => state.size);

  return (
    <div
      className="page-container"
      style={{
        paddingLeft: isExpanded ? '273px' : '170px',
        paddingRight: '43px',
      }}>
      <Categories />
      <SearchBlock />
      <AllFilters />

      <ChatsContainer />

      {createChatModal && <CreateChat />}
      {welcomeModal && <Welcome />}
      {newUserModal && <NewUser />}
    </div>
  );
};

export default Main;
