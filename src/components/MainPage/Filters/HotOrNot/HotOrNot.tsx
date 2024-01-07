import React, { useCallback, useState } from 'react';
import { AiFillFire } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHotOrNot } from '../../../../redux/filters/slice';
import { RootState } from '../../../../redux/store';

const HotOrNot = () => {
  const dispatch = useDispatch();

  const { hotOrNot } = useSelector((state: RootState) => state.filters);

  const handleActiveBtn = useCallback(() => {
    dispatch(toggleHotOrNot())
  }, [dispatch]);

  return (
    <div style={styles.container} onClick={handleActiveBtn}>
      <AiFillFire color={hotOrNot ? '#2c3fe1' : '#bbbbbb'} size={20} />
      <span style={hotOrNot ? styles.textActive : styles.text}>Hot</span>
    </div>
  );
};

const styles = {
  container: {
    transition: '0.5s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    padding: '0px 8px 0px 6px',
    borderRadius: '4px',
    backgroundColor: '#313338',
  },
  text: {
    fontSize: '12px',
    color: '#bbbbbb',
    transition: '0.5s ease',
  },
  textActive: {
    fontSize: '12px',
    color: '#FFFFFF',
    transition: '0.5s ease',
  },
};

export default HotOrNot;
