import './button.scss';
import { classNameVariant } from '../../../utils/class-name-variant';

export const buttonIconNames: Array<string> = ['download', 'share', 'citation', 'follow'];
export const buttonVariants: Array<string> = ['action'];

type ButtonProps = {
  iconName?: typeof buttonIconNames[number],
  variant?: typeof buttonVariants[number],
  text: string,
  url: string,
};

export const Button = ({
  text, iconName, url, variant,
}: ButtonProps): JSX.Element => (
  <a className={`button${classNameVariant(iconName, ' button--icon', '-')}${classNameVariant(variant, ' button')}`} href={url}>
    {text}
  </a>
);
