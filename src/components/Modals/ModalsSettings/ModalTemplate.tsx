import { IoMdCloseCircleOutline } from 'react-icons/io';
import { stylesModals } from './stylesModals';
import { FC, ReactNode } from 'react';

interface IModalTemplate {
  style: React.CSSProperties;
  title: string;
  emoji: string;
  closeModal: () => void;
  text: string;
  children: ReactNode;
}
const ModalTemplate: FC<IModalTemplate> = ({
  style,
  title,
  emoji,
  closeModal,
  text,
  children,
}) => {
  return (
    <div style={style}>
      <div style={stylesModals.titleContainer}>
        <div style={stylesModals.titleModalContainer}>
          <h1 style={stylesModals.titleModal}>{title}</h1>
          <img style={stylesModals.titleImg} src={emoji} alt="" />
        </div>
        <button style={stylesModals.closeBtn} onClick={closeModal}>
          <IoMdCloseCircleOutline style={stylesModals.iconClose} />
        </button>
      </div>
      <p style={stylesModals.textModal}>{text}</p>
      {children}
    </div>
  );
};

export default ModalTemplate;
