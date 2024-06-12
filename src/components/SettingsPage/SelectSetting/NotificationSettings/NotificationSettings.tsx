import SelectSettingTitle from '../SelectSettingTitle';

const NotificationSettings = () => {
  return (
    <div>
      <SelectSettingTitle
        title="Choose how to be notified"
        text="Tell us if you want to be notified when you've been invited to a new chat."
      />
    </div>
  );
};

export default NotificationSettings;
