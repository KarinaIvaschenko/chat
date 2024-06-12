import { FC } from 'react';

interface ISelectSettingTitle {
  title: string;
  text: string;
}

const SelectSettingTitle: FC<ISelectSettingTitle> = ({ title, text }) => {
  return (
    <div>
      <h2 style={styles.settingTitle}>{title}</h2>
      <p style={styles.settingText}>{text}</p>
    </div>
  );
};

const styles = {
  settingTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: '150%',
    color: '#fff',
    marginBottom: 8,
  },
  settingText: {
    color: '#b6b6b6',
    fontSize: 12,
    lineHeight: '167%',
    marginBottom: 44,
  },
};

export default SelectSettingTitle;
