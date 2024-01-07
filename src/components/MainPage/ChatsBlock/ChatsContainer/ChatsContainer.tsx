import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../../../redux/store';
import ChatBlock from '../ChatBlock';
import AddChat from './AddChat';
import './ChatsContainer.css';
import GoToTop from './GoToTop';

const ChatsContainer = () => {
  const { allChats, searchingChats, searchText } = useSelector(
    (state: RootState) => state.allChats,
  );
  const { currentLanguage, activeCategory, currentUpdate } = useSelector(
    (state: RootState) => state.filters,
  );

  const [filteredChats, setFilteredChats] = useState(allChats);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [pageSize, setPageSize] = useState(15);
  const handleClick = () => {
    setPageSize((pageSize) => pageSize + 16);
  };

  useEffect(() => {
    let newFilteredChats = allChats;

    if (activeCategory === '64eccc5d2519e44fdf531cf1') {
      newFilteredChats = allChats.filter((chat) => {
        return chat.languageId === currentLanguage;
      });
    } else {
      newFilteredChats = allChats.filter((chat) => {
        return (
          chat.languageId === currentLanguage &&
          chat.categoryId === activeCategory
        );
      });
    }

    if (currentUpdate === 'First new') {
      newFilteredChats.sort((a, b) => {
        const dateA = moment(a.creationDate);
        const dateB = moment(b.creationDate);
        return dateB.isAfter(dateA) ? 1 : dateA.isAfter(dateB) ? -1 : 0;
      });
    }

    setFilteredChats(newFilteredChats);
  }, [currentLanguage, activeCategory, allChats, currentUpdate]);

  const filteredChatsToRender = searchText ? searchingChats : filteredChats;

  return (
    <div>
      <div className="chats-container">
        {filteredChatsToRender.slice(0, pageSize).map((chat, index) => {
          return (
            <ChatBlock
              topic={chat.name}
              language={chat.languageId}
              category={chat.categoryId}
              key={index}
            />
          );
        })}
        <AddChat />
      </div>

      {filteredChats.length > 16 && (
        <div className="buttons-container">
          <div className="bottom-buttons">
            {filteredChatsToRender.length > pageSize + 1 && (
              <div className="show-more-container">
                <button className="show-more-button" onClick={handleClick}>
                  Show more
                </button>
              </div>
            )}
            <GoToTop handleScroll={scrollToTop} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatsContainer;
