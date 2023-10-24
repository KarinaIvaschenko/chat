import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CgClose } from 'react-icons/cg';
import { RootState } from '../../../redux/store';
import { closeNewUserModal } from '../../../redux/modals/slice';
import { welcome } from '../../../constants/images';
import {
  ENGLISH_FLAG,
  FRENCH_FLAG,
  GERMAN_FLAG,
  POLAND_FLAG,
  UKRAINE_FLAG,
} from '../../MainPage/ChatsBlock';
import './index.css';

const NewUser: React.FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState(1);

  type FlagType = JSX.Element;
  interface LanguageData {
    id: string;
    name: string;
  }

  const [activeCat, setActiveCat] = useState<any>({
    'Video games': false,
    Software: false,
    News: false,
    Education: false,
    Movies: false,
    Fashion: false,
    Relationships: false,
    Psychology: false,
    Finance: false,
    Books: false,
    Art: false,
    Music: false,
    Science: false,
    Food: false,
    Travel: false,
  });

  const FLAGS: { [key: string]: FlagType } = {
    English: ENGLISH_FLAG,
    Polski: POLAND_FLAG,
    Français: FRENCH_FLAG,
    Українська: UKRAINE_FLAG,
    Deutsch: GERMAN_FLAG,
  };

  const { languages } = useSelector((state: RootState) => state.languages);
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [activeLang, setActiveLang] = useState<LanguageData>({
    id: languages[0].id,
    name: languages[0].name,
  });

  const { categories } = useSelector((state: RootState) => state.categories);

  const closeModal = () => {
    dispatch(closeNewUserModal());
  };

  return (
    <div className="modalBlock">
      <div className="new-modal-container">
        <div>
          <img src={welcome} alt="welcome" width={210} height={440} />
        </div>
        {page === 1 && (
          <div className="new-modal-greeting">
            <div>
              <h3 className="new-modal-title">{name},</h3>
              <h3 className="new-modal-title">welcome to Oktotalk!</h3>
              <p className="new-modal-subtitle">
                We are so happy that you are here! Join any chat or create your
                own and invite friends!
              </p>
            </div>

            <button
              className="new-modal-button-container"
              onClick={() => setPage(2)}>
              Next
              <div className="new-modal-button-arrow"></div>
            </button>
          </div>
        )}
        {page === 2 && (
          <div className="new-modal-language">
            <div>
              <h3 className="new-modal-title">Choose Language</h3>
              <p className="new-modal-subtitle">
                Choose the language in which you want to chat. You can always
                change the language in the Settings.
              </p>
            </div>

            <div>
              <label
                style={styles.label}
                htmlFor="languageSelect"
                className="language-label">
                Language of communication
              </label>
              <div
                className={`select custom-dropdown-container-modal language-dropdown`}
                onClick={() => setIsOpenLang((isOpenLang) => !isOpenLang)}>
                <div className={`select custom-dropdown-header-modal`}>
                  <img className="dropdown-icon-modal" alt="" />
                  <span>
                    <span className="dropdown-icon-modal-flag">
                      {FLAGS[`${activeLang.name}`]}
                    </span>{' '}
                    {activeLang.name}
                  </span>
                  <div className={`dropdown-triangle-modal `} />
                  <button className={`dropdown-close-modal`}>
                    <CgClose color={'#ffffff'} size={10} />
                  </button>
                </div>
                {isOpenLang && (
                  <div className={`custom-dropdown-options-modal`}>
                    {languages.map(({ id, name }) => (
                      <div
                        key={id}
                        className={`custom-dropdown-option-modal ${
                          name === activeLang.name ? 'active' : ''
                        } `}
                        onClick={() => {
                          setActiveLang({
                            id,
                            name,
                          });
                        }}>
                        {FLAGS[`${name}`]}
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              className="new-modal-button-container"
              onClick={() => setPage(3)}>
              Next
              <div className="new-modal-button-arrow"></div>
            </button>
          </div>
        )}
        {page === 3 && (
          <div className="new-modal-categories">
            <div>
              <h3 className="new-modal-title">Highlight interests</h3>
              <p className="new-modal-subtitle">
                This will help us understand what you most want to talk about.
                You can always change it in the Settings.
              </p>
            </div>

            <div className="new-modal-categories-container">
              {categories.map(
                ({ id, name }) =>
                  name !== 'All chats' &&
                  name !== 'Other' && (
                    <div
                      key={id}
                      onClick={() => {
                        setActiveCat({
                          ...activeCat,
                          [`${name}`]: !activeCat[`${name}`],
                        });
                      }}
                      className={`new-modal-option-modal ${
                        activeCat[`${name}`] ? 'actived' : ''
                      }`}>
                      {name}
                    </div>
                  ),
              )}
            </div>

            <button
              className="new-modal-button-container"
              onClick={() => closeModal()}>
              Thank you, go to chat! :{')'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  label: {
    fontSize: '14px',
    cursor: 'auto',
  },
  container: {
    width: '640px',
    height: '440px',
    margin: 'auto',
    position: 'absolute' as 'absolute',
    left: '0px',
    right: '0px',
    top: '20%',

    display: 'flex',
    color: '#fff',
    backgroundColor: '#313338',
  },
  content: {
    position: 'relative' as 'relative',
    padding: '40px 16px',

    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
  },
  h3: {
    fontSize: '30px',
    fontWeight: 600,
  },
  welcomeText: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    paddingTop: '24px',
  },
  btn: {
    color: '#fff',
    borderRadius: '4px',
    backgroundColor: '#2C3FE1',
    width: '400px',
    padding: '10px 20px',
  },
  btnClose: {
    cursor: 'pointer',
    zIndex: 10,
    position: 'absolute' as 'absolute',
    right: '12px',
    top: '12px',
    fontSize: '28px',
    color: '#bbbbbb',
  },
};

export default NewUser;
