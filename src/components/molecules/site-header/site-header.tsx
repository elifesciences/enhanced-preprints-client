import Image from 'next/image';
import './site-header.scss';
import logo from '../../../../public/elife-logo.svg';

export const SiteHeader = () => {
  return (
    <div className="site-header">
      <div className="site-header-container">
        <a href="/" className="site-header__logo_link">
          <Image
            className="site-header__logo"
            src={logo}
            alt="eLife logo"
            width="80"
            height="30"
          />
        </a>
        <span className="site-header__title">Enhanced Preprints</span>

        <nav className="nav-primary">
          <ul className="nav-primary__list">
            <li className="nav-primary__item">
              <a href="https://elifesciences.org/">Home</a>
            </li>
            <li className="nav-primary__item">
              <a href="https://elifesciences.org/about">About</a>
            </li>
          </ul>
        </nav>

        <nav className="nav-secondary">
          <ul className="nav-secondary__list">
            <li className="nav-secondary__item nav-secondary__item--search">
              <a href="https://elifesciences.org/search" rel="search">Search</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
