import Image from 'next/image';
import logo from '../../../../public/science-colab-logo.png';
import linkedinLogo from '../../../../public/linkedin-logo.png';
import twitterLogo from '../../../../public/twitter-logo.png';
import scietyLogo from '../../../../public/sciety-logo.png';
import './biophysics-colab-site-footer.scss';

export const BiophysicsColabSiteFooter = () => (
  <div className="biophysics-colab-site-footer">
    <footer className="footer">
      <div className="footer-column">
        <div>
          <p className="secondary-text">Part of</p>
          <a href="https://www.sciencecolab.org/">
            <Image
              src={logo}
              alt="Science Colab logo"
              className="science-colab-logo"
            />
          </a>
        </div>
        <nav className="footer-action">
          <ul>
            <li><a href="https://www.sciencecolab.org/about">About</a></li>
            <li><a href="https://www.sciencecolab.org/privacy-notice">Privacy Notice</a></li>
            <li><a href="https://www.sciencecolab.org/press-releases">For the Press</a></li>
            <li><a href="https://www.sciencecolab.org/terms-and-conditions">Terms and Conditions</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-column">
        <div>
          <p className="footer-action">Contact:</p>
          <a href="mailto:enquiries@sciencecolab.org" className="contact-link">
            enquiries@sciencecolab.org
          </a>
        </div>
        <div className="socials">
          <a href="https://www.linkedin.com/company/sciencecolab/">
            <Image src={linkedinLogo} alt="Science colab on Linkedin" />
          </a>
          <a href="https://twitter.com/BiophysicsColab">
            <Image src={twitterLogo} alt="Biophysics colab on Twitter" />
          </a>
          <a href="https://sciety.org/groups/biophysics-colab">
            <Image src={scietyLogo} alt="Biophysics colab on Sciety" />
          </a>
        </div>
        <p className="secondary-text">
          Subject to a{' '}
          <a href="https://creativecommons.org/licenses/by/4.0">
            Creative Commons Attribution license
          </a>
          , except where otherwise noted.
        </p>
        <p className="secondary-text">© 2025 Science Colab</p>
      </div>
    </footer>
  </div>
);
