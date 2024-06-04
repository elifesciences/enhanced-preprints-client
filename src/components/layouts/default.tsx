import { ReactNode, useContext } from 'react';
import { SiteHeader } from '../molecules/site-header/site-header';
import { SiteFooter } from '../molecules/site-footer/site-footer';
import './default.scss';
import { BrandContext } from '../../brand';

type Props = {
  children: ReactNode,
};

export const DefaultLayout = ({ children }: Props) => {
  const brand = useContext(BrandContext);
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
