import Image from 'next/image';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import './site-header.scss';
import { BrandContext } from '../../../brand';

const Overlay = ({ closeOverlay }: { closeOverlay: () => void }) => createPortal(<div onClick={() => closeOverlay()} className="overlay" id="overlayMainMenu"></div>, document.getElementsByTagName('BODY')[0]);

export const SiteHeader = () => {
  const brand = useContext(BrandContext);
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="site-header">
      <div className="site-header-container">
        <a href="/" className="site-header__logo_link">
          { brand.logo &&
            <Image
              className="site-header__logo"
              src={brand.logo.url}
              alt={`${brand.journal} logo`}
              width={brand.logo.width}
              height={brand.logo.height}
            />
          }
        </a>
        <span className="site-header__title">Enhanced Preprints</span>

        {brand.showElifeMenus && showMenu &&
        <>
          <Overlay closeOverlay={() => setShowMenu(false)}/>
          <div className="wrapper main-menu--js main-menu--shown" id="mainMenu" data-behaviour="MainMenu" tabIndex={0} aria-expanded="true" data-behaviour-initialised="true">
            <div className="main-menu__title">
              {brand.logo &&
                <Image
                  src={brand.logo.url}
                  alt={`${brand.journal} logo`}
                  width={brand.logo.width}
                  height={brand.logo.height}
                />}
              <button className="main-menu__close_control" id="mainMenuCloseControl" onClick={() => setShowMenu(false)}>Close</button>
            </div>
            <nav className="main-menu__container" role="navigation">
              <ul className="main-menu__list">
                <li className="main-menu__list_item hidden-wide">
                  <a href="https://elifesciences.org/" className="main-menu__list_link">Home</a>
                </li>
                <li className="main-menu__list_item hidden-wide">
                  <a href="https://elifesciences.org/magazine" className="main-menu__list_link">Magazine</a>
                </li>
                <li className="main-menu__list_item hidden-wide">
                  <a href="https://elifesciences.org/community" className="main-menu__list_link">Community</a>
                </li>
                <li className="main-menu__list_item hidden-wide">
                  <a href="https://elifesciences.org/about" className="main-menu__list_link">About</a>
                </li>
                <li className="main-menu__list_item">
                  <a href="https://elifesciences.org/subjects" className="main-menu__list_link">Research categories</a>
                </li>
                <li className="main-menu__list_item end-of-group">
                  <a href="https://elifesciences.org/inside-elife" className="main-menu__list_link">Inside eLife</a>
                </li>
                <li className="main-menu__list_item hidden-wide">
                  <a href="https://elifesciences.org/search" className="main-menu__list_link">Search</a>
                </li>
                <li className="main-menu__list_item hidden-wide end-of-group">
                  <a href="https://elifesciences.org/content-alerts" className="main-menu__list_link">Subscribe to alerts</a>
                </li>
                <li className="main-menu__list_item hidden-wide">
                  <a href="https://elifesciences.org/submit-your-research" className="main-menu__list_link">Submit your research</a>
                </li>
                <li className="main-menu__list_item">
                  <a href="https://reviewer.elifesciences.org/author-guide/editorial-process" className="main-menu__list_link">Author guide</a>
                </li>
                <li className="main-menu__list_item">
                  <a href="https://reviewer.elifesciences.org/reviewer-guide/review-process" className="main-menu__list_link">Reviewer guide</a>
                </li>
              </ul>
              <a href="#siteHeader" className="to-top-link">Back to top</a>
            </nav>
          </div>
        </>
        }
        <nav className="nav-primary">
          <ul className="nav-primary__list">
            {brand.showElifeMenus && (<>
              <li className="nav-primary__item nav-primary__item--first">
                <a href="#mainMenu" onClick={() => setShowMenu(true)}>Menu</a>
              </li>
            </>)}
            <li className="nav-primary__item">
              <a href="https://elifesciences.org/">Home</a>
            </li>

            {brand.showElifeMenus && (<>
              <li className="nav-primary__item">
                <a href="https://elifesciences.org/magazine">Magazine</a>
              </li>
              <li className="nav-primary__item">
                <a href="https://elifesciences.org/community">Community</a>
              </li>
              </>)}
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
            {brand.showElifeMenus && (<>
              <li className="nav-secondary__item nav-secondary__item--alert">
                <a href="https://elifesciences.org/content-alerts">Alerts</a>
              </li>
              <li className="nav-secondary__item">
                <a href="https://elifesciences.org/submit-your-research" className="block-button block-button__variant-one">Submit your research</a>
              </li>
            </>)}
          </ul>
        </nav>
      </div>
    </div>
  );
};
