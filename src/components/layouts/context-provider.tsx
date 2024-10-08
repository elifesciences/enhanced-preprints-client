import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type Props = {
  siteName?: string,
  children: ReactNode,
};

interface ContextProps {
  storedSiteName?: string;
  storeSiteName: (value: string) => void;
}

const CreatedContext = createContext<ContextProps | undefined>(undefined);

export const ContextProvider = ({ siteName, children }: Props) => {
  const [storedSiteName, storeSiteName] = useState(siteName);
  return (
    <CreatedContext.Provider value={{ storedSiteName, storeSiteName }}>
      {children}
    </CreatedContext.Provider>
  );
};

export const useCreatedContext = () => {
  const context = useContext(CreatedContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
