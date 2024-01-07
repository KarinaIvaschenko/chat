import React, { useState } from 'react';
import { tickIcon } from '../../../../constants/images';
import { HiClock } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setUpdate, setActive } from '../../../../redux/filters/slice';
import { CgClose } from 'react-icons/cg';

import '../Languages/index.css';
import './index.css';

const UpdateFilter = () => {
  const dispatch = useDispatch();

  const { currentUpdate } = useSelector((state: RootState) => state.filters);

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleUpdateItemChange = (item: string) => {
    dispatch(setUpdate(item));
    dispatch(setActive(true));
    setIsOpen(false);
    setIsActive(true);
  };
  const handleLanguageReset = () => {
    dispatch(setUpdate(null));
    dispatch(setActive(false));
    setIsOpen(false);
    setIsActive(false);
  };

  const updateItems = ['First new', 'First old'];

  return (
    <div
      className={`select custom-dropdown-container ${
        currentUpdate ? 'active' : ''
      }`}>
      <div
        className={`select custom-dropdown-header custom-dropdown-header-update ${
          isOpen ? 'open' : ''
        } ${currentUpdate ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdown-icon-clock">
          <HiClock
            size={20}
            color={currentUpdate !== null ? '#2c3fe1' : '#bbbbbb'}
          />
        </div>

        <span className={`text ${currentUpdate !== null ? 'active' : ''}`}>
          Update{currentUpdate !== null ? ':' : ''}{' '}
          {currentUpdate?.toLocaleLowerCase()}
        </span>
        <div className={`dropdown-triangle ${isOpen ? 'open' : ''}`} />
        <button
          className={`dropdown-close ${currentUpdate !== null ? 'show' : ''}`}
          onClick={() => handleLanguageReset()}>
          <CgClose color="#ffffff" size={10} />
        </button>
      </div>
      {isOpen && (
        <div
          className={`custom-dropdown-options ${
            currentUpdate ? 'active' : ''
          }`}>
          {updateItems.map((item, index) => (
            <div
              key={item}
              className={`custom-dropdown-option ${
                currentUpdate === item ? 'selected' : ''
              }`}
              onClick={() => handleUpdateItemChange(item)}>
              {currentUpdate === item && (
                <div className="tick">
                  <img src={tickIcon} alt="tick" className="tick-icon" />
                </div>
              )}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateFilter;
