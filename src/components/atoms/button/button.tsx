import styles from './button.module.scss';

type ButtonProps = {
  iconName: string,
  text: string,
  url: string,
};

export const Button = ({ text, iconName, url }: ButtonProps): JSX.Element => (
  <a className={`${styles['button-icon']} ${styles.button} ${styles[iconName]}`} href={url}>
    {text}
  </a>
);
