import { JSX } from 'react';
import './button.scss';
import { classNameVariant } from '../../../utils/class-name-variant';

export const buttonIconNames: Array<string> = ['download', 'share', 'citation', 'follow'];
export const buttonVariants: Array<string> = ['action', 'clipboard', 'cite-download'];

type ButtonProps = {
  iconName?: typeof buttonIconNames[number],
  variant?: typeof buttonVariants[number],
  text: string,
  url?: string,
  download?: boolean,
  onClick?: () => void,
};

export const Button = ({
  text, iconName, url, variant, onClick, download,
}: ButtonProps): JSX.Element => (
  <a className={`button${classNameVariant(iconName, ' button--icon', '-')}${classNameVariant(variant, ' button')}`} href={url} onClick={onClick} download={download}>
    {text}
  </a>
);
