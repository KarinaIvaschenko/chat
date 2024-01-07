import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { setIsExpanded } from '../../redux/size/slice';

import {
  logo,
  hideNavBar,
  shortLogo,
  showNavBar,
  vector,
} from '../../constants/images';

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { isExpanded } = useSelector((state: RootState) => state.size);

  const handleToggleExpand = () => {
    dispatch(setIsExpanded(!isExpanded));
  };

  return (
    <div
      style={{
        ...styles.navBarBlock,
        width: isExpanded ? '231px' : '117px',
        padding: isExpanded ? '24px 13px 10px 38px' : '24px 47px 10px 25px',
      }}>
      <div style={styles.logoContainer}>
        <div style={styles.arrow} onClick={handleToggleExpand}>
          <img src={isExpanded ? hideNavBar : showNavBar} alt="arrow" />
        </div>

        {isExpanded ? (
          <div style={{ paddingLeft: '7px' }}>
            <img src={logo} alt="logo" />
          </div>
        ) : (
          <div style={{ paddingLeft: '7px' }}>
            <img src={shortLogo} alt="logo" />
          </div>
        )}

        {isExpanded && (
          <div style={styles.vector}>
            <img src={vector} alt="vector" />
          </div>
        )}

        <ul style={styles.menuList}>
          <Link to="/main">
            <li
              className={`menuItem ${!isExpanded && 'menuItemShort'} ${
                location.pathname === '/main' && 'menuItemActive'
              } `}>
              {isExpanded ? (
                <>
                  <img
                    className={`allChatsItem ${
                      location.pathname === '/main' && 'allChatsItemActive'
                    }`}
                    alt="myChats"
                  />
                  <span>All Chats</span>
                </>
              ) : (
                <>
                  <img
                    className={`allChatsItemBig ${
                      location.pathname === '/main' && 'allChatsItemActive'
                    }`}
                    alt="myChats"
                  />
                  <span className="tooltip">All Chats</span>
                </>
              )}
            </li>
          </Link>

          <Link to="/active-chats">
            <li
              className={`menuItem ${!isExpanded && 'menuItemShort'} ${
                location.pathname === '/active-chats' && 'menuItemActive'
              } `}>
              {isExpanded ? (
                <>
                  <img
                    className={`activeChatsItem ${
                      location.pathname === '/active-chats' &&
                      'activeChatsItemActive'
                    }`}
                    alt="myChats"
                  />
                  <span>Active Chats</span>
                </>
              ) : (
                <>
                  <img
                    className={`activeChatsItemBig ${
                      location.pathname === '/active-chats' &&
                      'activeChatsItemActive'
                    }`}
                    alt="myChats"
                  />
                  <span className="tooltip">Active Chats</span>
                </>
              )}
            </li>
          </Link>

          <Link to="/private-messages">
            <li
              className={`menuItem ${!isExpanded && 'menuItemShort'}   ${
                location.pathname === '/private-messages' && 'menuItemActive'
              } `}>
              {isExpanded ? (
                <>
                  <img
                    className={`privateChatsItem ${
                      location.pathname === '/private-messages' &&
                      'privateChatsItemActive '
                    }`}
                    alt="myChats"
                  />
                  <span>Private messages</span>
                </>
              ) : (
                <>
                  <img
                    className={`privateChatsItemBig ${
                      location.pathname === '/private-messages' &&
                      'privateChatsItemActive '
                    }`}
                    alt="myChats"
                  />
                  <span className="tooltip">Private messages</span>
                </>
              )}
            </li>
          </Link>

          <Link to="/my-created-chats">
            <li
              className={`menuItem ${!isExpanded && 'menuItemShort'}  ${
                location.pathname === '/my-created-chats' && 'menuItemActive'
              } `}>
              {isExpanded ? (
                <>
                  <img
                    className={`myChatsItem ${
                      location.pathname === '/my-created-chats' &&
                      'myChatsItemActive'
                    }`}
                    alt="myChats"
                  />
                  <span>My Created Chats</span>
                </>
              ) : (
                <>
                  <img
                    className={`myChatsItemBig ${isExpanded && 'bigImage'} ${
                      location.pathname === '/my-created-chats' &&
                      'myChatsItemActive'
                    }`}
                    alt="myChats"
                  />
                  <span className="tooltip">My Created Chats</span>
                </>
              )}
            </li>
          </Link>
        </ul>
      </div>

      <Link to="/setting">
        <div
          className={`menuItem ${!isExpanded && 'menuItemShort'} ${
            location.pathname === '/setting' && 'menuItemActive'
          } `}>
          {isExpanded ? (
            <>
              <img
                className={`settingItem ${
                  location.pathname === '/setting' && 'settingItemActive'
                }`}
                alt="setting"
              />
              <span>Settings</span>
            </>
          ) : (
            <>
              <img
                className={`settingItemBig ${
                  location.pathname === '/setting' && 'settingItemActive'
                }`}
                alt="setting"
              />
              <span className="tooltip">Settings</span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

const styles = {
  navBarBlock: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    padding: '24px 13px 10px 38px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: '#313338',
    transition: 'width 0.3s ease',
  },
  logoContainer: {
    marginBottom: 'auto',
  },
  arrow: {
    position: 'absolute' as 'absolute',
    right: -8,
    top: 330,
    cursor: 'pointer',
  },
  vector: {
    position: 'absolute' as 'absolute',
    top: 79.5,
    left: 0,
  },
  menuList: {
    listStyle: 'none',
    marginTop: '37px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '26px',
  },
};

export default NavBar;
