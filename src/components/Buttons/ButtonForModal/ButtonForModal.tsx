import { FC } from 'react';

interface IButtonForModal {
  text: string;
  onClick: () => void;
  color: string;
  backgroundColor: string;
}

const ButtonForModal: FC<IButtonForModal> = ({
  text,
  onClick,
  color,
  backgroundColor,
}) => {
  return (
    <button
      style={{ ...styles.btn, color: color, backgroundColor: backgroundColor }}
      onClick={onClick}>
      {text}
    </button>
  );
};

const styles = {
  btn: {
    width: 232,
    height: 56,
    textAlign: 'center' as 'center',
    fontSize: 16,
    lineHeight: '150%',
    borderRadius: 4,
  },
};

export default ButtonForModal;
