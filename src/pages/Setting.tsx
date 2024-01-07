import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { removeUser, setVerified } from '../redux/user/slice';
import { openNewUserModal } from '../redux/modals/slice';

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isExpanded } = useSelector((state: RootState) => state.size);

  const handleLogOut = () => {
    dispatch(removeUser());
    dispatch(setVerified(false));
    navigate('/');
  };
  const openModalNewUser = () => {
    navigate('/main');
    dispatch(openNewUserModal());
  };
  return (
    <div
      className="page-container"
      style={{ paddingLeft: isExpanded ? '273px' : '170px' }}
    >
      <h1>Setting</h1>
      <button onClick={() => handleLogOut()}>log out</button>
      <div onClick={() => openModalNewUser()}>new user modal</div>
    </div>
  );
};

export default Setting;
