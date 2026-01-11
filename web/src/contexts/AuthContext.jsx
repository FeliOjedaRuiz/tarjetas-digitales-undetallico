import { createContext, useState, useContext } from "react";
import usersService from "../services/users";

export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // 1. SOLUCIÓN: Inicializamos el estado leyendo el localStorage DIRECTAMENTE.
  // Así el usuario ya existe desde el primer milisegundo y React no se queja.
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("current-user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Como ya leímos el usuario arriba, 'loading' puede empezar en false directamente.
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await usersService.login(credentials);
      if (response.token) {
        localStorage.setItem("user-access-token", response.token);
        
        // Guardamos también los datos del usuario para persistencia
        // Ajustamos según si tu backend devuelve el user dentro de un objeto o directo
        const userData = response.user || response; 
        localStorage.setItem("current-user", JSON.stringify(userData));
        
        setUser(userData);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user-access-token");
    localStorage.removeItem("current-user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};