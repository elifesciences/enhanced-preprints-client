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
      <p>Contact:</p>
      <a href="mailto:enquiries@sciencecolab.org">enquiries@sciencecolab.org</a>
      <div className="socials"></div>
      <p>
        Subject to a <a href="https://creativecommons.org/licenses/by/4.0">Creative Commons Attribution license</a>, except where otherwise noted.
      </p>
      <p>© 2025 Science Colab</p>
    </footer>
  </>
);
