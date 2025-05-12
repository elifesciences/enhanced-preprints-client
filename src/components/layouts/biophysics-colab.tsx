import { ReactNode } from 'react';
import './biophysics-colab.scss';
import Image from 'next/image';
import logo from '../../../public/science-colab-logo.png';
import { SiteHeaderBiophysicsColab } from '../molecules/site-header/site-header-biophysics-colab';

type Props = {
  children: ReactNode,
};

export const BiophysicsColabLayout = ({ children }: Props) => (
  <>
    <div className="grid-container article-page">
      <div className="grid-header">
        <SiteHeaderBiophysicsColab/>
      </div>
      {children}
    </div>
    <footer>
      <p>Part of</p>
      <a href="https://www.sciencecolab.org/">
        <Image
          src={logo}
          alt="Science Colab logo"
          />
      </a>
      <nav>
        <a href="/about">About</a>
      </nav>
    </footer>
  </>
);
