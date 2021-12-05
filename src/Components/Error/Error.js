import style from './Error.module.css';

const InputError = ({ children }) => {
  if (!children) {
    return null;
  }

  return <div className={style.error}>{children}</div>;
};

export default InputError;