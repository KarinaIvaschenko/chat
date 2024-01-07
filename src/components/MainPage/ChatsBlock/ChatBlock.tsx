import React from 'react';
import { itemsLang, itemsCategories } from './constans';
import { BsThreeDotsVertical } from 'react-icons/bs';

import {
  ENGLISH_FLAG,
  UKRAINE_FLAG,
  POLAND_FLAG,
  FRENCH_FLAG,
  GERMAN_FLAG,
} from './index';

type FlagType = JSX.Element;

const FLAGS: { [key: string]: FlagType } = {
  English: ENGLISH_FLAG,
  Polski: POLAND_FLAG,
  Français: FRENCH_FLAG,
  Українська: UKRAINE_FLAG,
  Deutsch: GERMAN_FLAG,
};

interface ChatBlockProps {
  topic: string;
  category: string;
  language: string;
}

const ChatBlock: React.FC<ChatBlockProps> = ({ topic, category, language }) => {
  const languageName =
    itemsLang.find((item) => item.id === language)?.name || '';
  const flagImage = FLAGS[languageName] || null;

  const categoryName =
    itemsCategories.find((item) => item.id === category)?.name || 'Other';

  return (
    <div>
      <div style={styles.chatBlock}>
        <div style={styles.header}>
          <p>{categoryName}</p>

          <div style={styles.dots}>
            <BsThreeDotsVertical color="#979DED" size={20} />
          </div>
        </div>

        <div style={styles.blockContent}>
          <h4 style={styles.title}>{topic}</h4>

          <div style={styles.bottomContainer}>
            <div style={styles.btnJoin}>Join</div>
            <div style={styles.info}>
              {flagImage && <div style={styles.flagContainer}>{flagImage}</div>}
              <span style={styles.time}>Be first to talk!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  chatBlock: {
    height: '240px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: '#313338',
    borderRadius: '4px',
  },
  dots: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '40px',
    width: '100%',
    padding: '4px 12px',
    fontSize: '12px',
    lineHeight: '30px',
    color: '#fff',

    background: 'linear-gradient(90deg, #66166D 0%,#2C3FE1  100%)',
  },
  blockContent: {
    height: '100%',

    padding: '32px 12px 12px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontFamily: '',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alightContent: 'center',
  },
  btnJoin: {
    display: 'flex',
    justifyContent: 'center',

    padding: '10px 20px',
    backgroundColor: '#2c3fe1',
    fontSize: '14px',
    color: '#fff',

    borderRadius: '4px',
    cursor: 'pointer',
  },
  info: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '15px',
  },
  time: {
    fontSize: '11px',
    color: '#fff',
  },
  flagContainer: {
    display: 'inline-block',
    width: '30px',
    height: '20px',
    marginLeft: '10px',
  },
};

export default ChatBlock;
