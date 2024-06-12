import { FC, ReactNode } from 'react';

interface IButtonWhite {
  onClick: () => void;
  disabled: boolean;
  icon: ReactNode;
  text: string;
}

const ButtonWhite: FC<IButtonWhite> = ({ onClick, disabled, icon, text }) => {
  return (
    <button style={styles.btnWhite} onClick={onClick} disabled={disabled}>
      <div style={styles.btnIcon}>{icon}</div>
      <p style={styles.btnText}>{text}</p>
    </button>
  );
};

const styles = {
  btnWhite: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 113,
    height: 32,
    paddingTop: 6,
    paddingBottom: 6,
  },
  btnIcon: { display: 'flex', alignSelf: 'center', marginRight: 4 },
  btnText: {
    fontSize: 12,
    lineHeight: '167%',
  },
};
export default ButtonWhite;
