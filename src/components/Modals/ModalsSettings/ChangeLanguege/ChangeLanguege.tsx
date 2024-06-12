import { FC } from 'react';
import { emojiStuckOutTongue } from '../../../../constants/images';
import ModalTemplate from '../ModalTemplate';
import { stylesModals } from '../stylesModals';
import { ButtonForModal } from '../../../Buttons';

interface IChangeLanguege {
  closeModal: () => void;
}

const ChangeLanguege: FC<IChangeLanguege> = ({ closeModal }) => {
  return (
    <ModalTemplate
      style={stylesModals.languageModal}
      title="Change language here"
      emoji={emojiStuckOutTongue}
      closeModal={closeModal}
      text="Choose the language in which you want to chat. You can always change the language here.">
      <div>
        <p style={stylesModals.infoUserText}>Language of communication</p>
      </div>
      <div style={stylesModals.buttonsModal}>
        <ButtonForModal
          text="Cansel"
          onClick={closeModal}
          color="#000"
          backgroundColor="#fff"
        />
        <ButtonForModal
          text="Save"
          onClick={() => {}}
          color="#fff"
          backgroundColor="#2c3fe1"
        />
      </div>
    </ModalTemplate>
  );
};

export default ChangeLanguege;
