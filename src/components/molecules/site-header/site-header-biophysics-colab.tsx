import Image from 'next/image';
import './site-header.scss';
import logo from '../../../../public/biophysics-colab-logo.png';

export const SiteHeaderBiophysicsColab = () => (
  <div className="site-header">
    <div className="site-header-container">
      <a href="/" className="site-header__logo_link">
        <Image
          className="site-header__logo"
          src={logo}
          alt="Biophysics Colab logo"
          width="104"
          height="40"
        />
      </a>
      <span className="site-header__title">Enhanced Preprints</span>

      <nav className="nav-primary">
        <ul className="nav-primary__list">
          <li className="nav-primary__item">
            <a href="/">Home</a>
          </li>
          <li className="nav-primary__item">
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
