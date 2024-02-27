import React from 'react';
import { StaticImageData } from 'next/image';
import logo from '../public/epp_logo.png';

export type Brand = {
  colors: {
    primary: string,
  },
  processUrl?: string,
  assessmentsUrl?: string,
  showElifeMenus: boolean,
  logo?: {
    url: string | StaticImageData,
    height: number,
    width: number,
  },
  translationNamespace?: string,
};

export const defaultBrand = {
  logo: {
    url: logo,
    width: 100,
    height: 40,
  },
  colors: {
    primary: 'grey',
  },
  showElifeMenus: false,
};

export const BrandContext = React.createContext<Brand>(defaultBrand);

// these should be replaced with a stored brand in server
export const elifeBrand = {
  colors: {
    primary: '#087acc',
  },
  processUrl: 'https://elifesciences.org/peer-review-process',
  assessmentsUrl: 'https://elifesciences.org/inside-elife/db24dd46',
  showElifeMenus: true,
  logo: {
    url: 'https://sciety.org/static/images/article-page/elife-logo-sm.svg',
    width: 80,
    height: 30,
  },
  translationNamespace: 'elife',
};
export const biophysicsColabBrand = {
  colors: {
    primary: '#5556A8',
  },
  processUrl: 'https://www.sciencecolab.org/biophysics-colab',
  showElifeMenus: false,
  logo: {
    url: 'https://sciety.org/static/images/home-page/biophysics-colab.png',
    width: 104,
    height: 40,
  },
  translationNamespace: 'biophysics_colab',
};
