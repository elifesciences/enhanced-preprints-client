import { ReactNode } from 'react';
import './biophysics-colab.scss';
import Image from 'next/image';
import logo from '../../../public/science-colab-logo.png';
import linkedinLogo from '../../../public/linkedin-logo.png';
import twitterLogo from '../../../public/twitter-logo.png';
import scietyLogo from '../../../public/sciety-logo.png';
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
    <footer className='footer-wrapper'>
      <section>
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
      </section>
      <section>
        <p>Contact:</p>
        <a href="mailto:enquiries@sciencecolab.org">enquiries@sciencecolab.org</a>
        <div className="socials">
          <a href="https://www.linkedin.com/company/sciencecolab/">
            <Image
              src={linkedinLogo}
              alt="Science colab on Linkedin"
              />
          </a>
          <a href="https://twitter.com/BiophysicsColab">
            <Image
              src={twitterLogo}
              alt="Biophysics colab on Twitter"
              />
          </a>
          <a href="https://sciety.org/groups/biophysics-colab">
            <Image
              src={scietyLogo}
              alt="Biophysics colab on Sciety"
              />
          </a>
        </div>
        <p>
          Subject to a <a href="https://creativecommons.org/licenses/by/4.0">Creative Commons Attribution license</a>, except where otherwise noted.
        </p>
        <p>© 2025 Science Colab</p>
      </section>
    </footer>
  </>
);
