import styles from './button.module.scss';

type ButtonProps = {
  iconName: string,
  text: string,
};

export const Button = ({ text, iconName }: ButtonProps): JSX.Element => (
  <div className={styles.button}>
    <span className={`material-icons ${styles['button-icon']}`}>{iconName}</span>
    {text}
  </div>
);
