import React, {
  createContext, useContext, useState, useEffect, ReactNode,
} from 'react';
import { ConfigFlags } from '../config';

interface FeatureFlagContextValue {
  flags: ConfigFlags;
}

const FeatureFlagContext = createContext<FeatureFlagContextValue | undefined>(undefined);

export const useFeatureFlags = (): FeatureFlagContextValue => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: ConfigFlags;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  initialFlags = {},
}) => {
  const [flags] = useState<ConfigFlags>(initialFlags);

  // Example: Update flags after mount if needed
  useEffect(() => {
    // Fetch or update flags here if necessary
    // setFlags(updatedFlags);
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ flags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
