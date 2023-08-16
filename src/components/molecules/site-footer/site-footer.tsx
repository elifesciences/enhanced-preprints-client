import { JSX } from 'react';
import { FooterMain } from '../../atoms/footer-main/footer-main';
import { Investors } from '../../atoms/investors/investors';
import { SignUp } from '../../atoms/sign-up/sign-up';

export const SiteFooter = (): JSX.Element => (
  <><SignUp /><Investors /><FooterMain /></>
);
