import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import './site-header.scss';
import logo from '../../../../public/biophysics-colab-logo.png';

export const SiteHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="site-header">
      <div className="site-header-container">
        <a href={t('home_url')} className="site-header__logo_link">
          <Image
            className="site-header__logo"
            src={logo}
            alt={`${t('publisher_short')} logo`}
            width="104"
            height="40"
          />
        </a>
        <span className="site-header__title">Enhanced Preprints</span>

        <nav className="nav-primary">
          <ul className="nav-primary__list">
            <li className="nav-primary__item">
              <a href={t('home_url')}>Home</a>
            </li>
            <li className="nav-primary__item">
              <a href={t('about_url')}>About</a>
            </li>
          </ul>
        </nav>

        <nav className="nav-secondary">
          <ul className="nav-secondary__list">
            <li className="nav-secondary__item nav-secondary__item--search">
              <a href={t('search_url')} rel="search">Search</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
