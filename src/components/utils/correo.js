import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const AuthContext = createContext();

// Crea un proveedor de contexto
export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
