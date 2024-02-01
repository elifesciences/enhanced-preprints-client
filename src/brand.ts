import React from 'react';
import { StaticImageData } from 'next/image';
import logo from '../public/epp_logo.png';


export type Brand = {
  colors: {
    primary: string,
  },
  publisherShort?: string,
  publisherLong?: string,
  processUrl?: string,
  showElifeMenus: boolean,
  logo?: {
    url: string | StaticImageData,
    height: number,
    width: number,
  }
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
