export type Brand = {
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
    colors: {
      primary: '#087acc',
      primaryDark: '#0769b0',
    },
  },
  elife: {
    colors: {
      primary: '#087acc',
      primaryDark: '#0769b0',
    },
  },
  biophysics_colab: {
    colors: {
      primary: '#5556a8',
      primaryDark: '#50519b',
    },
  },
};
