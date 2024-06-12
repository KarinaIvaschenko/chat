import { FC } from 'react';
import { stylesModals } from '../stylesModals';
import { ButtonForModal } from '../../../Buttons';
import ModalTemplate from '../ModalTemplate';

interface IDeleteOrLogOut {
  title: string;
  emoji: any;
  closeModal: () => void;
  deleteOrLogOutAccount: () => void;
  text: string;
  name: string;
  email: string;
}

const DeleteOrLogOut: FC<IDeleteOrLogOut> = ({
  title,
  emoji,
  closeModal,
  deleteOrLogOutAccount,
  text,
  name,
  email,
}) => {
  return (
    <ModalTemplate
      style={stylesModals.modalWrapper}
      title={title}
      emoji={emoji}
      text={text}
      closeModal={closeModal}>
      <div style={stylesModals.infoUser}>
        <img style={stylesModals.userImg} src="" alt="" />
        <div style={stylesModals.userContainer}>
          <p style={stylesModals.userName}>{name}</p>
          <p style={stylesModals.userEmail}>{email}</p>
        </div>
      </div>
      <div style={stylesModals.buttonsModal}>
        <ButtonForModal
          text="Cansel"
          onClick={closeModal}
          color="#000"
          backgroundColor="#fff"
        />
        <ButtonForModal
          text="Delete"
          onClick={deleteOrLogOutAccount}
          color="#fff"
          backgroundColor="#f84848"
        />
      </div>
    </ModalTemplate>
  );
};

export default DeleteOrLogOut;
