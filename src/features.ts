import { createContext } from 'react';

export type FeaturesData = {
  showElifeTerms: boolean,
};

export const FeaturesContext = createContext<FeaturesData>({
  showElifeTerms: true,
});
