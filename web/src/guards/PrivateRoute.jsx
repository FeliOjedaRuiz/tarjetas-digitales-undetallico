// src/guards/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
// Asegúrate de importar AuthContext (no AuthStore)
import { AuthContext } from "../contexts/AuthContext";

function PrivateRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  // 1. Esperamos a que termine de cargar la sesión
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  // 2. Si no hay usuario -> Login
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  } 
  
  // 3. Si se pide rol y el usuario no lo tiene -> Home
  // (Si role es undefined, pasa. Si user.role coincide, pasa)
  if (role && user.role !== role) {
    return <Navigate to="/" replace={true} />;
  }

  // 4. Todo correcto
  return <>{children}</>;
}

export default PrivateRoute;
