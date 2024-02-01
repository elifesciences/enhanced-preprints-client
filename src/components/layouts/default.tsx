import { ReactNode } from 'react';
import { SiteHeader } from '../molecules/site-header/site-header';
import { SiteFooter } from '../molecules/site-footer/site-footer';
import './default.scss';
import { Brand } from '../../types';

type Props = {
  children: ReactNode,
  brand: Brand,
};

export const DefaultLayout = ({ children, brand }: Props) => {
  const brandStyles = {
    '--color-primary': brand.colors.primary,
  } as React.CSSProperties;
  return <>
    <div className="grid-container article-page" style={brandStyles}>
      <div className="grid-header">
        <SiteHeader />
      </div>
      {children}
    </div>
    <SiteFooter/>
  </>;
};
