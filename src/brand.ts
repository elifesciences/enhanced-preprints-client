import React from 'react';
import { StaticImageData } from 'next/image';
import eppLogo from '../public/epp_logo.png';
import asteraLogo from '../public/astera_logo.png';

export type Brand = {
  colors: {
    primary: string,
  },
  journal?: string,
  publisher?: string,
  appUrlPrefix?: string,
  processUrl?: string,
  assessmentsUrl?: string,
  showElifeMenus?: boolean,
  logo?: {
    url: string | StaticImageData,
    height: number,
    width: number,
  },
  twitterHandle?: string,
  translationNamespace?: string,
};

export const defaultBrand = {
  publisher: 'Enhanced Preprints Platform',
  logo: {
    url: eppLogo,
    width: 100,
    height: 40,
  },
  colors: {
    primary: 'grey',
  },
};

export const BrandContext = React.createContext<Brand>(defaultBrand);

// these should be replaced with a stored brand in server
export const elifeBrand: Brand = {
  colors: {
    primary: '#087acc',
  },
  journal: 'eLife',
  publisher: 'eLife Sciences Publications Limited',
  appUrlPrefix: 'https://elifesciences.org/reviewed-preprints/',
  processUrl: 'https://elifesciences.org/peer-review-process',
  assessmentsUrl: 'https://elifesciences.org/inside-elife/db24dd46',
  showElifeMenus: true,
  logo: {
    url: 'https://sciety.org/static/images/article-page/elife-logo-sm.svg',
    width: 80,
    height: 30,
  },
  twitterHandle: '@elife',
  translationNamespace: 'elife',
};
export const biophysicsColabBrand: Brand = {
  colors: {
    primary: '#5556A8',
  },
  journal: 'Biophysics Colab',
  publisher: 'Biophysics Colab',
  processUrl: 'https://www.sciencecolab.org/biophysics-colab',
  logo: {
    url: 'https://sciety.org/static/images/home-page/biophysics-colab.png',
    width: 104,
    height: 40,
  },
  twitterHandle: '@BiophysicsColab',
  translationNamespace: 'biophysics_colab',
};
export const scietyBrand: Brand = {
  colors: {
    primary: 'rgb(206, 72, 26)',
  },
  journal: 'Sciety Preprints',
  publisher: 'Sciety Preprints',
  logo: {
    url: 'https://sciety.org/static/images/sciety-logo-navigation-link-colour-text.svg',
    width: 119,
    height: 36,
  },
  twitterHandle: '@sciety',
};
export const asteraBrand: Brand = {
  colors: {
    primary: 'rgb(224, 173, 56)',
  },
  journal: 'Astera',
  publisher: 'Astera',
  logo: {
    url: asteraLogo,
    width: 142,
    height: 40,
  },
  twitterHandle: '@AsteraInstitute',
};
