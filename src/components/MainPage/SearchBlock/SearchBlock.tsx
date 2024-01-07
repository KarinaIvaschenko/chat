import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters } from '../../../redux/filters/slice';
import { setFilteredChats } from '../../../redux/allChats/allChats';
import { setSearchText } from '../../../redux/allChats/allChats';
import { RootState } from '../../../redux/store';

import './style.css';
import './index.css';

const SearchBlock = () => {
  const dispatch = useDispatch();
  const { allChats, searchText } = useSelector(
    (state: RootState) => state.allChats,
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = event.target.value;

      dispatch(setSearchText(searchText));

      performSearch(searchText);
    },
    [dispatch],
  );

  const performSearch = (searchText: string) => {
    dispatch(resetFilters(false));

    const filteredChats = allChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    dispatch(setFilteredChats(filteredChats));
  };

  const handleSearch = (searchTarget: any) => {
    console.log(searchTarget);
  };
  return (
    <div className="searchContainer">
      <input
        className="inputBlock"
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={handleChange}
        maxLength={100}
      />
      <button
        className="searchButton"
        onClick={() => {
          handleSearch(searchText);
        }}
      />
    </div>
  );
};

// const style = {
//   searchContainer: {
//     display: 'flex'
//   },
//   inputBlock: {
//     backgroundColor: '#313338',
//     height: '36px',
//     width: '100%',
//     color: '#bbbbb',
//     borderRadius: '4px',
//     fontSize: '14px',
//     paddingLeft: '12px',
//     marginTop: '23px',
//   },
//   searchButton: {
//     width: '30px',
//     height: '30px',
//     backgroundColor: '#FFF',
//     marginTop: '25px',
//     position: 'relative'
//   }
// };

export default SearchBlock;
