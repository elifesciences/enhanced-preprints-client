import { FooterMain } from '../../atoms/footer-main/footer-main';
import { Investors } from '../../atoms/investors/investors';
import { SignUp } from '../../atoms/sign-up/sign-up';
import styles from './footer.module.scss';

export const Footer = (): JSX.Element => (
  <><SignUp /><Investors /><FooterMain /></>
);
