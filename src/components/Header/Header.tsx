import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BsPlusLg, BsFillBellFill } from 'react-icons/bs';
import { HiCamera } from 'react-icons/hi';

import { RootState } from '../../redux/store';
import { openCreateChatModal } from '../../redux/modals/slice';
import { userPhoto } from '../../constants/images';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name } = useSelector((state: RootState) => state.user);

  const openModalCreateChat = () => {
    navigate('/main');
    dispatch(openCreateChatModal());
  };


  return (
    <div style={styles.headerContainer}>
      <header style={styles.header}>
        <div style={styles.btnContainer}>
          <div style={styles.plusCircle}>
            <BsFillBellFill width={20} height={20} color="#fff" />
          </div>
          <div onClick={() => openModalCreateChat()} style={styles.plusCircle}>
            <BsPlusLg width={20} height={20} color="#fff" />
          </div>

        </div>

        <div style={styles.userInfo}>
          <div style={styles.camera}>
            <HiCamera width={20} height={20} color="#fff" />
          </div>
          <img src={userPhoto} alt="userPhoto" width={25} height={25} />
          <span style={styles.userName}>{name}</span>
        </div>
      </header>
    </div>
  );
};

const styles = {
  headerContainer: {
    position: 'fixed' as 'fixed',
    right: 0,
    width: '100%',
    backgroundColor: '#313338',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '18px 30px',
    gap: '49px',
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',

    gap: '12px',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    padding: '8px 12px',
    color: '#fff',
  },
  plusCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: '50%',
    backgroundColor: '#2C3FE1',
    padding: '10px',

    cursor: 'pointer',
  },
  btnText: {
    fontSize: '14px',
  },
  userInfo: {
    position: 'relative' as 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  userName: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#fff',
  },
  camera: {
    position: 'absolute' as 'absolute',
    top: 20,
    left: 10,
    cursor: 'pointer',
  },
};

export default Header;
