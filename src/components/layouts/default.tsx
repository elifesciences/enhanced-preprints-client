import { ReactNode } from 'react';
import { SiteHeader } from '../molecules/site-header/site-header';
import { SiteFooter } from '../molecules/site-footer/site-footer';
import './default.scss';

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
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
