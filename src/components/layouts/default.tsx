import { ReactNode } from 'react';
import { SiteHeader } from '../molecules/site-header/site-header';
import { SiteFooter } from '../molecules/site-footer/site-footer';
import './default.scss';

type Props = {
  children: ReactNode,
  siteName?: string,
};

export const DefaultLayout = ({ children, siteName }: Props) => (
  <>
    <div className={`grid-container article-page${siteName ? ` article-page-${siteName}` : ''}`}>
      <div className="grid-header">
        <SiteHeader />
      </div>
      {children}
    </div>
    <SiteFooter/>
  </>

);
