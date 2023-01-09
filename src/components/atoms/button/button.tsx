import './button.scss';

type ButtonProps = {
  iconName?: string,
  variant?: string,
  text: string,
  url: string,
};

export const Button = ({
  text, iconName, url, variant,
}: ButtonProps): JSX.Element => (
  <a className={`button${iconName !== undefined ? ` button--icon button--icon-${iconName}` : ''}${variant !== undefined ? ` button--${variant}` : ''}`} href={url}>
    {text}
  </a>
);
