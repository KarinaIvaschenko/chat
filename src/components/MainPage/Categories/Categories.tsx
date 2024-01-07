import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { setActiveCategory } from '../../../redux/filters/slice';

const Categories = () => {
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const { activeCategory } = useSelector((state: RootState) => state.filters);

  const handleActiveCategory = (id: string) => {
    dispatch(setActiveCategory(id));
  };

  return (
    <div style={styles.categories}>
      <h2 style={styles.title}>Choose category:</h2>

      <div style={styles.itemsBlock}>
        {categories.map((item, index) => (
          <li
            className={`category-item ${
              activeCategory === item.id ? 'category-item-active' : ''
            }`}
            onClick={() => handleActiveCategory(item.id)}
            key={item.id}>
            {item.name}
          </li>
        ))}
      </div>
    </div>
  );
};

const styles = {
  categories: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '40px',
  },
  title: {
    color: '#fff',
    fontSize: '30px',
    fontWeight: 600,
  },
  itemsBlock: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
  },
};

export default Categories;
