import React from 'react';
import { useDispatch } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';
import { openCreateChatModal } from '../../../../redux/modals/slice';

const AddChat = () => {
  const dispatch = useDispatch();

  const openModalCreateChat = () => {
    dispatch(openCreateChatModal());
  };
  return (
    <div style={style.container}>
      <div style={style.circle} onClick={() => openModalCreateChat()}>
        <AiOutlinePlus color="white" size={18} />
      </div>
      <span style={style.text}>Сreate chat</span>
    </div>
  );
};

const style = {
  container: {
    height: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    borderColor: 'white',
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderRadius: '4px',
    gap: '7px',
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '50px',
    backgroundColor: 'rgb(44, 63, 225)',
    cursor: 'pointer',
  },
  text: {
    fontSize: '16px',
    color: 'white',
    lineHeight: '24px',
  },
};

export default AddChat;
