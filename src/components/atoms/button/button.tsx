import './button.scss';
import { classNameVariant } from '../../../utils/class-name-variant';

type ButtonProps = {
  iconName?: 'download' | 'share' | 'citation' | 'follow',
  variant?: 'action',
  text: string,
  url: string,
};

export const Button = ({
  text, iconName, url, variant,
}: ButtonProps): JSX.Element => (
  <a className={`button${classNameVariant(iconName, ' button--icon button--icon', '-')}${classNameVariant(variant, ' button')}`} href={url}>
    {text}
  </a>
);
