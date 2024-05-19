import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const ServiciosContext = createContext();

// Crea un proveedor de contexto
export const ServiciosProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);

  const agregarServicio = (nuevoServicio) => {
    setServicios([...servicios, nuevoServicio]);
  };

  const obtenerServicios = () => {
    return servicios;
  };

  return (
    <ServiciosContext.Provider value={{ servicios, agregarServicio, obtenerServicios }}>
      {children}
    </ServiciosContext.Provider>
  );
};

// Hook para usar el contexto de servicios
export const useServicios = () => useContext(ServiciosContext);
