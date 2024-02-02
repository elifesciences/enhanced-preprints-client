import React from 'react';
import { StaticImageData } from 'next/image';
import logo from '../public/epp_logo.png';

export type Brand = {
  colors: {
    primary: string,
  },
  publisherShort: string,
  publisherLong: string,
  processUrl?: string,
  showElifeMenus: boolean,
  logo?: {
    url: string | StaticImageData,
    height: number,
    width: number,
  },
  translation?: {
    [key: string]: string,
  }
};

export const defaultBrand = {
  publisherShort: 'EPP',
  publisherLong: 'Enhanced Preprints Platform',
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
  publisherShort: 'eLife',
  publisherLong: 'eLife Sciences Publications Limited',
  showElifeMenus: true,
  logo: {
    url: 'https://sciety.org/static/images/article-page/elife-logo-sm.svg',
    width: 80,
    height: 30,
  },
};
export const biophysicsColabBrand = {
  colors: {
    primary: '#5556A8',
  },
  processUrl: 'https://www.sciencecolab.org/biophysics-colab',
  publisherShort: 'Biophysics Colab',
  publisherLong: 'Biophysics Colab',
  showElifeMenus: false,
  logo: {
    url: 'https://sciety.org/static/images/home-page/biophysics-colab.png',
    width: 104,
    height: 40,
  },
};
