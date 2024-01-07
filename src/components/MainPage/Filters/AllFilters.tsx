import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { resetFilters } from '../../../redux/filters/slice';

import LanguagesFilters from './Languages/Languages';
import HotOrNot from './HotOrNot/HotOrNot';
import UpdateFilter from './Update/Update';

import './index.css';
import { useCallback } from 'react';

const AllFilters = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state: RootState) => state.filters);

  const handleReset = useCallback(() => {
    dispatch(resetFilters(false));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="filterBlock">
        <LanguagesFilters />
        <UpdateFilter />
        <HotOrNot />
      </div>
      <div className="resetBtn" onClick={handleReset}>
        <CgClose color={active ? '#ffffff' : '#bbbbbb'} size={10} />
      </div>
    </div>
  );
};

export default AllFilters;
