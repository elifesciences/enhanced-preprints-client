import { ReactNode } from 'react';
import './default.scss';
import { SiteHeaderELife } from '../molecules/site-header/site-header-elife';
import { SiteFooterELife } from '../molecules/site-footer/site-footer-elife';

type Props = {
  children: ReactNode,
};

export const ELifeLayout = ({ children }: Props) => (
  <>
    <div className="grid-container article-page">
      <div className="grid-header">
        <SiteHeaderELife />
      </div>
      {children}
    </div>
    <SiteFooterELife/>
  </>

);
