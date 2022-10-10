import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './site-header.module.scss';

const Overlay = (): JSX.Element => createPortal(<div className={styles['overlay']} id="overlayMainMenu"></div>, document.getElementsByTagName('BODY')[0]);

export const SiteHeader = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={styles['site-header']}>
      <div className={styles['site-header-container']}>
        <img
          className={styles['site-header__logo']}
          src="/elife-logo.svg"
          alt="eLife logo"
          width="88"
          height="35"
        />

        <header className="site-header" id="siteHeader">
          <div className="site-header__title{{#borderVariant}}-border{{/borderVariant}} clearfix" role="banner">
            <div className="site-header__skip_to_content">
              <a href="#maincontent" className="site-header__skip_to_content__link button button--default">Skip to Content</a>
            </div>
            <a href="{{homePagePath}}" className="site-header__logo_link">
              <picture className="site-header__logo_link_image">
                <source srcSet="../img/patterns/organisms/elife-logo-xs.svg" type="image/svg+xml"/>
                <img src="/img/patterns/organisms/elife-logo-xs@1x.png{{/assetRewrite}}" alt="eLife logo" className="site-header__logo_link"/>
              </picture>
              <span className="visuallyhidden">eLife home page</span>
            </a>
          </div>
        </header>
        {showMenu &&
            <>
              <Overlay/>
              <div className="main-menu main-menu--js main-menu--shown" id="mainMenu" data-behaviour="MainMenu" tabIndex={0} aria-expanded="true" data-behaviour-initialised="true">
                <nav className="main-menu__container" role="navigation">
                  <button className="main-menu__close_control" id="mainMenuCloseControl" onClick={() => setShowMenu(false)}>Close</button>
                  <h3 className="list-heading">Menu</h3>
                  <ul className="main-menu__list">
                    <li className="main-menu__list_item">
                      <a href="/subjects" className="main-menu__list_link">Research categories</a>
                    </li>
                    <li className="main-menu__list_item">
                      <a href="https://reviewer.elifesciences.org/author-guide/editorial-process" className="main-menu__list_link">Author guide</a>
                    </li>
                    <li className="main-menu__list_item">
                      <a href="https://reviewer.elifesciences.org/reviewer-guide/review-process" className="main-menu__list_link">Reviewer guide</a>
                    </li>
                    <li className="main-menu__list_item">
                      <a href="/about" className="main-menu__list_link">About</a>
                    </li>
                    <li className="main-menu__list_item">
                      <a href="/inside-elife" className="main-menu__list_link">Inside eLife</a>
                    </li>
                    <li className="main-menu__list_item">
                      <a href="/community" className="main-menu__list_link">Community</a>
                    </li>
                    <li className="main-menu__list_item">
                      <a href="/labs" className="main-menu__list_link">Innovation</a>
                    </li>
                  </ul>
                  <a href="#siteHeader" className="to-top-link">Back to top</a>
                </nav>
              </div>
            </>
        }
        <nav className={styles['nav-primary']}>
          <ul className={styles['nav-primary__list']}>
            <li className={`${styles['nav-primary__item']} ${styles['nav-primary__item--first']}`}>
              <a href="#mainMenu" onClick={() => setShowMenu(true)}>Menu</a>
            </li>
            <li className={styles['nav-primary__item']}>
              <a href="#">Home</a>
            </li>
            <li className={styles['nav-primary__item']}>
              <a href="#">Magazine</a>
            </li>
            <li className={styles['nav-primary__item']}>
              <a href="#">Community</a>
            </li>
            <li className={styles['nav-primary__item']}>
              <a href="#">About</a>
            </li>
          </ul>
        </nav>

        <nav className={styles['nav-secondary']}>
          <ul className={styles['nav-secondary__list']}>
            <li className={`${styles['nav-secondary__item']} ${styles['nav-secondary__item--search']}`}>
              <a href="#" rel="search">Search</a>
            </li>
            <li className={`${styles['nav-secondary__item']} ${styles['nav-secondary__item--alert']}`}>
              <a href="#">Alerts</a>
            </li>
            <li className={styles['nav-secondary__item']}>
              <a href="#" className={`${styles['block-button']} ${styles['block-button__variant-one']}`}>Submit your research</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
