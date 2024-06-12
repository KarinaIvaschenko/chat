import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { SettingsList } from '../components';

// import { removeUser, setVerified } from '../redux/user/slice';
// import { openNewUserModal } from '../redux/modals/slice';

const Setting = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { isExpanded } = useSelector((state: RootState) => state.size);

  // const handleLogOut = () => {
  //   dispatch(removeUser());
  //   dispatch(setVerified(false));
  //   navigate('/');
  // };
  // const openModalNewUser = () => {
  //   navigate('/main');
  //   dispatch(openNewUserModal());
  // };
  return (
    <div
      className="page-container"
      style={{ paddingLeft: isExpanded ? '273px' : '170px' }}>
      {/* <h1>Setting</h1>
      <button onClick={() => handleLogOut()}>log out</button>
      <div onClick={() => openModalNewUser()}>new user modal</div> */}
      <div style={styles.selectSettings}>
        <h1 style={styles.title}>Settings:</h1>
        <SettingsList />
      </div>
    </div>
  );
};

const styles = {
  selectSettings: {},
  title: {
    fontWeight: 600,
    fontSize: '30px',
    color: '#fff',
    marginBottom: '50px',
  },
  listSettings: {
    width: '145px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '16px',
  },
  itemSetting: {
    backgroundColor: 'red',
  },
  btnSetting: { color: '#fff', paddingTop: '4px', paddingBottom: '4px' },
};

export default Setting;
