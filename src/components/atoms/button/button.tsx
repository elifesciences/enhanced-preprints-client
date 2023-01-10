import './button.scss';
import { classVariant } from '../../../utils/class-variant';

type ButtonProps = {
  iconName?: string,
  variant?: string,
  text: string,
  url: string,
};

export const Button = ({
  text, iconName, url, variant,
}: ButtonProps): JSX.Element => (
  <a className={`button${classVariant(iconName, ' button--icon button--icon', '-')}${classVariant(variant, ' button')}`} href={url}>
    {text}
  </a>
);
