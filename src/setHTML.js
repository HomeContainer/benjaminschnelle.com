import classes from './classes.scss';

const setHTML = () => {
  const root = document.getElementById('root');
  root.innerHTML = 'Hey man!';
  root.className = classes.title;
};

export default setHTML;
