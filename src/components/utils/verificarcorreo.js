import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const RoleContext = createContext();

// Función para determinar el rol según el dominio del correo electrónico
const getRoleFromEmail = (email) => {
    const domain = email.split('@')[1];
    if (domain === 'gmail.com') {
        console.log(email, 'verify hhses')
        return 'homehero';
    } else if (domain === 'hotmail.com') {
        return 'cliente';
    } else {
        console.log(email, 'verify cl')
        return 'cliente';
    }
};

// Crea un proveedor de contexto
export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    // Función para establecer el rol según el email proporcionado
    const setRoleFromEmail = (email) => {
        const newRole = getRoleFromEmail(email);
        setRole(newRole);
    };

    return (
        <RoleContext.Provider value={{ role, setRoleFromEmail }}>
            {children}
        </RoleContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useRole = () => useContext(RoleContext);
