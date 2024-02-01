import React from 'react';

export type Brand = {
  colors: {
    primary: string,
  },
  publisherShort?: string,
  publisherLong?: string,
  processUrl?: string,
  showElifeMenus: boolean,
  logoUrl?: string,
  logo?: {
    url: string,
    height: number,
    width: number,
  }
};

export const defaultBrand = {
  colors: {
    primary: 'grey',
  },
  showElifeMenus: false,
};

export const BrandContext = React.createContext<Brand>(defaultBrand);
