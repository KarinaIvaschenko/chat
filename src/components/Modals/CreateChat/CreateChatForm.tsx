import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import { RootState } from '../../../redux/store';
import { closeCreateChatModal } from '../../../redux/modals/slice';
import { createChat } from '../../../redux/chat/slice';
import { setAllChats } from '../../../redux/allChats/allChats';
import { CgClose } from 'react-icons/cg';
import './index.css';

import {
  ENGLISH_FLAG,
  UKRAINE_FLAG,
  POLAND_FLAG,
  FRENCH_FLAG,
  GERMAN_FLAG,
} from '../../MainPage/ChatsBlock/index';
import { tickIcon } from '../../../constants/images';

type FlagType = JSX.Element;

const FLAGS: { [key: string]: FlagType } = {
  English: ENGLISH_FLAG,
  Polski: POLAND_FLAG,
  Français: FRENCH_FLAG,
  Українська: UKRAINE_FLAG,
  Deutsch: GERMAN_FLAG,
};

interface FormData {
  topic: string;
  category: string;
  language: string;
}
interface LanguageData {
  id: string;
  name: string;
}
interface CategoryData {
  id: string;
  name: string;
}

const CreateChatForm: React.FC = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.user);

  const { categories } = useSelector((state: RootState) => state.categories);
  const { languages } = useSelector((state: RootState) => state.languages);

  const [maxCharError, setMaxCharError] = useState(false);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [emptyCategoryError, setEmptyCategoryError] = useState(false);
  const [sameNameError, setSameNameError] = useState(false);

  const [isOpenLang, setIsOpenLang] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  const [activeLang, setActiveLang] = useState<LanguageData>({
    id: languages[0].id,
    name: languages[0].name,
  });
  const [activeCat, setActiveCat] = useState<CategoryData>({
    id: '',
    name: '',
  });

  const closeModal = () => {
    dispatch(closeCreateChatModal());
  };

  const [formData, setFormData] = useState<FormData>({
    topic: '',
    category: '',
    language: '',
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    if (name === 'topic' && value.trim().length === 40) {
      setMaxCharError(true);
    } else {
      setMaxCharError(false);
    }

    if (name === 'topic' && value.trim() !== '') {
      setEmptyInputError(false);
    }

    setFormData({ ...formData, [name]: value });
  };

  const getChats = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const endpoint = 'api/v1/chat-channel/public';
      const url = `${baseUrl}/${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      const data = response.data.data;

      dispatch(setAllChats(data));
    } catch (error) {
      console.error(error);
    }
  };

  const checkSameName = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const endpoint = 'api/v1/chat-channel/public';
      const url = `${baseUrl}/${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      const data = response.data.data;
      const nameArr: any = [];
      for (let i = 0; i < data.length; i++) {
        nameArr.push(data[i].name);
      }
      if (nameArr.indexOf(formData.topic) !== -1) {
        setSameNameError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    checkSameName();
    if (formData.topic.trim() === '') {
      setEmptyInputError(true);
    }
    if (activeCat.name === '') {
      setEmptyCategoryError(true);
    } else {
      setEmptyCategoryError(false);
    }
    if (emptyCategoryError || emptyInputError) return;

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/chat-channel/public/new`;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const requestBody = {
        name: formData.topic,
        categoryId: activeCat.id || categories[categories.length - 1].id,
        languageId: activeLang.id || languages[0].id,
      };

      const response = await axios.post(url, requestBody, { headers });
      if (response.status === 200) {
        dispatch(
          createChat({
            topic: formData.topic,
            category: activeCat.name || categories[categories.length - 1].name,
            language: activeLang.name || languages[0].name,
          }),
        );

        getChats();

        setFormData({ topic: '', category: '', language: '' });
        setMaxCharError(false);
        setEmptyInputError(false);

        dispatch(closeCreateChatModal());
      } else if (response.status === 400) {
        console.log(
          'Failed. Some field of ChatChannelDto don`t fit requirements.',
        );
      } else if (response.status === 404) {
        console.log('Failed. User, ChatCategory, or ChatLanguage not found.');
      } else {
        throw new Error('Failed to create chat');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div>
      <form style={styles.formBlock} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="topicInput">
          Write a short topic
        </label>
        <textarea
          id="topicInput"
          name="topic"
          style={styles.input}
          value={formData.topic}
          onChange={handleChange}
          placeholder="e.g., Burgers Well-Done Is The Way To Go|"
          maxLength={40}
          rows={3}
          cols={40}></textarea>
        {maxCharError && (
          <p style={styles.error}>
            You have reached the maximum number of characters.
          </p>
        )}
        {emptyInputError && (
          <p style={styles.error}>
            You cannot create a chat with an empty input.
          </p>
        )}
        {sameNameError && (
          <p style={styles.error}>
            Oops, chat with the same name already exists. Come up with another
            name.
          </p>
        )}

        <label style={styles.label} htmlFor="categorySelect">
          Category
        </label>
        <div
          className={`select custom-dropdown-container-modal category-dropdown`}
          onClick={() =>
            setIsOpenCategory((isOpenCategory) => !isOpenCategory)
          }>
          <div className={`select custom-dropdown-header-modal`}>
            <img className="dropdown-icon-modal" alt="" />
            <span className="dropdown-icon-modal-flag">
              {activeCat.name ? (
                activeCat.name
              ) : (
                <div className="dorpdown-molad-flag-default">
                  Choose from the list
                </div>
              )}
            </span>
            <div className={`dropdown-triangle-modal `} />
            <button className={`dropdown-close-modal`}>
              <CgClose color={'#ffffff'} size={10} />
            </button>
          </div>
          {isOpenCategory && (
            <div className={`custom-dropdown-options-modal category-options`}>
              {categories.map(
                ({ id, name }) =>
                  name !== 'All chats' && (
                    <div
                      key={id}
                      className={`custom-dropdown-option-modal`}
                      onClick={() => {
                        setActiveCat({
                          id,
                          name,
                        });
                      }}>
                      {formData.language === name && (
                        <div className="tick">
                          <img
                            src={tickIcon}
                            alt="tick"
                            className="tick-icon-modal"
                          />
                        </div>
                      )}
                      {name}
                    </div>
                  ),
              )}
            </div>
          )}
          {emptyCategoryError && !activeCat.name && (
            <p className="dropdown-category-error">
              Don't know category? Сhoose “Other” from the list.
            </p>
          )}
        </div>

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
                    setActiveLang({ id, name });
                  }}>
                  {FLAGS[`${name}`]}
                  {formData.language === name && (
                    <div className="tick">
                      <img
                        src={tickIcon}
                        alt="tick"
                        className="tick-icon-modal"
                      />
                    </div>
                  )}
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.buttonsContainer}>
          <button style={styles.cancelBtn} onClick={() => closeModal()}>
            Cancel
          </button>
          <button style={styles.submitBtn} type="submit">
            Create Chat
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formBlock: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: '360px',
    position: 'relative' as 'relative',
  },
  input: {
    height: '70px',
    weight: '360px',
    backgroundColor: '#313338',
    border: '1px solid #fff',
    borderRadius: '4px',
    margin: '8px 0 16px',
    color: '#fff',
    padding: '6px 10px',
    fontSize: '14px',
    resize: 'none' as 'none',
  },
  label: {
    fontSize: '14px',
    cursor: 'auto',
  },
  select: {
    backgroundColor: '#313338',
    border: '1px solid #fff',
    borderRadius: '4px',
    padding: '10px',
    color: '#fff',
    margin: '12px 0 20px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  buttonsContainer: {
    marginTop: '14px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  cancelBtn: {
    borderRadius: '4px',
    padding: '7px 35px',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '14px',
    cursor: 'pointer',
  },
  submitBtn: {
    borderRadius: '4px',
    padding: '7px 18px',
    backgroundColor: '#2C3FE1',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  error: {
    position: 'absolute' as 'absolute',
    top: '96px',
    color: '#F84848',
    fontSize: '10px',
    marginBottom: '8px',
  },
};

export default CreateChatForm;
