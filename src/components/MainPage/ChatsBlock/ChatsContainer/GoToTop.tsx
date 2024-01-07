import { arrowTop } from '../../../../constants/images';

interface ShowMoreProps {
  handleScroll: () => void;
}

const GoToTop = ({ handleScroll }: ShowMoreProps) => {
  return (
    <div onClick={handleScroll} style={styles.container}>
      <img src={arrowTop} alt="go to top arrow" />
    </div>
  );
};

const styles = {
  container: {
    marginTop: '19px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '17px',

    cursor: 'pointer',
  },
  text: {
    color: '#bbbbbb',
    fontSize: '16px',
  },
};

export default GoToTop;
