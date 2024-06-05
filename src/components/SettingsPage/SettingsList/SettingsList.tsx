import { useState } from 'react';

const SettingsList = () => {
  const [btnActive, setBtnActive] = useState<number | null>(0);

  const selectSettings = (index: number) => {
    setBtnActive(index);
  };

  const buttons = [
    'My profile',
    'Password',
    'Notifications',
    'Account actions',
  ];
  return (
    <ul style={styles.listSettings}>
      {buttons.map((buttonText, index) => (
        <li key={index}>
          <button
            style={
              btnActive === index
                ? { ...styles.bntActive, ...styles.btnSetting }
                : styles.btnSetting
            }
            onClick={() => selectSettings(index)}>
            {buttonText}
          </button>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  listSettings: {
    width: '145px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '16px',
  },
  bntActive: {
    backgroundColor: '#313339',
    borderRadius: 4,
  },
  btnSetting: {
    color: '#fff',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
};

export default SettingsList;
