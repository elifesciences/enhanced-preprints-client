import { ReactNode } from 'react';
import './biophysics-colab.scss';
import { SiteHeaderBiophysicsColab } from '../molecules/site-header/site-header-biophysics-colab';
import { BiophysicsColabSiteFooter } from '../molecules/site-footer/biophysics-colab-site-footer';

type Props = {
  children: ReactNode;
};

export const BiophysicsColabLayout = ({ children }: Props) => (
  <>
    <div className="grid-container article-page">
      <div className="grid-header">
        <SiteHeaderBiophysicsColab />
      </div>
      {children}
    </div>
    <BiophysicsColabSiteFooter />
  </>
);
