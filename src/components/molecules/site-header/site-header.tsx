import Image from 'next/image';
import styles from './site-header.module.scss';

export const SiteHeader = (): JSX.Element => (
  <div className={styles['site-header']}>
    <div className={styles['site-header-container']}>
      <img
        className={styles['site-header__logo']}
        src="/elife-logo.svg"
          alt="eLife logo"
          width="88"
          height="35"
      />

      <header className="site-header clearfix" id="siteHeader">
        <div className="site-header__title{{#borderVariant}}-border{{/borderVariant}} clearfix" role="banner">
          <div className="site-header__skip_to_content">
            <a href="#maincontent" className="site-header__skip_to_content__link button button--default">Skip to Content</a>
          </div>
          <a href="{{homePagePath}}" className="site-header__logo_link">
            <picture className="site-header__logo_link_image">
              <source srcSet="../img/patterns/organisms/elife-logo-xs.svg" type="image/svg+xml" />
              <img src="/img/patterns/organisms/elife-logo-xs@1x.png{{/assetRewrite}}" alt="eLife logo" className="site-header__logo_link"/>
            </picture>
            <span className="visuallyhidden" >eLife home page</span>
          </a>
        </div>
      </header>

      <nav className={styles['nav-primary']}>
        <ul className={styles['nav-primary__list']}>
          <li className={`${styles["nav-primary__item"]} ${styles["nav-primary__item--first"]}`}>
            <a href="#mainMenu">Menu</a>
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
          <li className={`${styles["nav-secondary__item"]} ${styles["nav-secondary__item--search"]}`}>
            <a href="#" rel="search">Search</a>
          </li>
          <li className={`${styles["nav-secondary__item"]} ${styles["nav-secondary__item--alert"]}`}>
            <a href="#">Alerts</a>
          </li>
          <li className={styles['nav-secondary__item']}>
            <a href="#" className={`${styles["block-button"]} ${styles["block-button__variant-one"]}`}>Submit your research</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
