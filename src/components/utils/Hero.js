import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const HeroContext = createContext();

// Crea un proveedor de contexto para el héroe
export const HeroProvider = ({ children }) => {
    const [heroData, setHeroData] = useState(null);
  
    const setHero = (data) => {
      setHeroData(data);
    };
  
    return (
      <HeroContext.Provider value={{ heroData, setHero }}>
        {children}
      </HeroContext.Provider>
    );
  };

// Hook para usar el contexto del héroe
export const useHero = () => useContext(HeroContext);