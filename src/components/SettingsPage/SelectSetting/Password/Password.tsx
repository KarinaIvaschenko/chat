import { FC } from 'react';
import SelectSettingTitle from '../SelectSettingTitle';
import { ButtonWhite } from '../../../Buttons';
import { HiPencil } from 'react-icons/hi';
import { settingsStyles } from '../settingsStyles';

interface IPassword {
  password: string;
}
const Password: FC<IPassword> = ({ password }) => {
  const userInfoString = localStorage.getItem('user');
  let userInfo;

  if (userInfoString) {
    userInfo = JSON.parse(userInfoString);
  }

  return (
    <div>
      <SelectSettingTitle
        title="Here your email and password"
        text={`Signed in as ${userInfo.email}`}
      />
      <div style={settingsStyles.editWrapper}>
        <div style={settingsStyles.editContainer}>
          <div>
            <p style={settingsStyles.editInfo}>{password}</p>
            <p style={settingsStyles.editText}>Password</p>
          </div>
          <ButtonWhite
            onClick={() => {}}
            disabled={false}
            icon={<HiPencil style={settingsStyles.btnIcon} />}
            text="Edit"
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
