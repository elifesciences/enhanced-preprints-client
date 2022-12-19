import './button.scss';

type ButtonProps = {
  iconName: string,
  text: string,
  url: string,
};

export const Button = ({ text, iconName, url }: ButtonProps): JSX.Element => (
  <a className={`button-icon button ${iconName}`} href={url}>
    {text}
  </a>
);
