import { StaticImageData } from 'next/image';
import logo from './images/epp-logo.png';
import elifeLogo from './images/elife-logo.svg';
import biophysicsColabLogo from './images/biophysics-colab-logo.png';

export type Brand = {
  logo: string | StaticImageData,
  colors: {
    primary: string,
    primaryDark: string,
  }
};

export type Brands = {
  [key: string]: Brand
};

export const brands: Brands = {
  default: {
    logo,
    colors: {
      primary: '#087acc',
      primaryDark: '#0769b0',
    },
  },
  elife: {
    logo: elifeLogo,
    colors: {
      primary: '#087acc',
      primaryDark: '#0769b0',
    },
  },
  biophysics_colab: {
    logo: biophysicsColabLogo,
    colors: {
      primary: '#5556a8',
      primaryDark: '#50519b',
    },
  },
  science_core: {
    logo: 'https://sciencecoreorg.wpcomstaging.com/wp-content/uploads/2024/07/Original-Logo-1024x501.png',
    colors: {
      primary: '#181830',
      primaryDark: '#181830',
    },
  },
};
