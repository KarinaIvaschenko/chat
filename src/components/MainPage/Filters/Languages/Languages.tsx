import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { earth, tickIcon, earthActive } from '../../../../constants/images';
import { setLanguages, setActive } from '../../../../redux/filters/slice';
import { itemsLang } from './constants';
import './index.css';
import { CgClose } from 'react-icons/cg';

const stockLanguage = '64b29bb9a268b5150b670003';

const LanguagesFilters = () => {
  const dispatch = useDispatch();

  const { languages } = useSelector((state: RootState) => state.languages);
  const { currentLanguage } = useSelector((state: RootState) => state.filters);

  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = useCallback((language: string) => {
    dispatch(setLanguages(language));
    dispatch(setActive(true))
    setIsOpen(false);
  }, [dispatch]);

  const handleLanguageReset = useCallback(() => {
    dispatch(setLanguages(stockLanguage));
    dispatch(setActive(false));
    setIsOpen(false);
  }, [dispatch]);

  const selectedLanguage = useMemo(() => {
    return itemsLang.find(
      (item) => item.id === currentLanguage,
    )
  }, [currentLanguage]);

  const isFilterActive = useMemo(() => {
    return currentLanguage !== stockLanguage
  }, [currentLanguage])
  return (
    <div className={`select custom-dropdown-container ${isFilterActive ? 'active' : ''}`}>
      <div
        className={`select custom-dropdown-header ${isOpen ? 'open' : ''} ${isFilterActive ? 'active' : ''}`}
        onClick={() => setIsOpen(isOpen => !isOpen)}>
        <img
          src={
            isFilterActive ? earthActive : earth
          }
          alt="planet"
          className="dropdown-icon"
        />
        <span>
          Language of communication:
          {selectedLanguage ? selectedLanguage.name : ''}
        </span>
        <div className={`dropdown-triangle ${isOpen ? 'open' : ''}`} />
        <button className={`dropdown-close ${isFilterActive ? 'show' : ''}`} onClick={handleLanguageReset}>
        <CgClose color={isFilterActive ? '#ffffff' : '#bbbbbb'} size={10} />
        </button>

      </div>
      {isOpen && (
        <div className={`custom-dropdown-options ${isFilterActive ? 'active' : ''}`}>
          {languages.map((item) => (
            <div
              key={item.id}
              className={`custom-dropdown-option ${currentLanguage === item.id ? 'selected' : ''
                } ${isFilterActive ? 'active' : ''}`}
              onClick={() => handleLanguageChange(item.id)}>
              {currentLanguage === item.id && (
                <div className="tick">
                  <img src={tickIcon} alt="tick" className="tick-icon" />
                </div>
              )}
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagesFilters;
