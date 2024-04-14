import React, { createContext, useState, ReactNode } from "react";

interface LoaderContextType {
  loader: boolean | null;
  showLoader: () => void;
  hideLoader: () => void;
}

const defaultContext: LoaderContextType = {
  loader: null,
  showLoader: () => { },
  hideLoader: () => { },
};

export const LoaderContext = createContext<LoaderContextType>(defaultContext);

interface LoaderContextProviderProps {
  children: ReactNode;
}

export function LoaderContextProvider(props: LoaderContextProviderProps) {
  const [activeLoader, setActiveLoader] = useState<boolean | null>(null);

  const showLoaderHandler = () => {
    setActiveLoader(true);
  };

  const hideLoaderHandler = () => {
    setActiveLoader(false);
  };

  const contextValue: LoaderContextType = {
    loader: activeLoader,
    showLoader: showLoaderHandler,
    hideLoader: hideLoaderHandler,
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {props.children}
    </LoaderContext.Provider>
  );
}

export default LoaderContext;
