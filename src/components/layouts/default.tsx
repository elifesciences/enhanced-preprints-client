import { type JSX, type ReactNode } from 'react';
import { SiteFooter } from '../molecules/site-footer/site-footer';
import { SiteHeader } from '../molecules/site-header/site-header';
import './default.scss';

type Props = {
  children: ReactNode,
};

export const DefaultLayout = ({ children }: Props): JSX.Element => (
  <>
    <div className="grid-container article-page">
      <div className="grid-header">
        <SiteHeader />
      </div>
      {children}
    </div>
    <SiteFooter/>
  </>

);
