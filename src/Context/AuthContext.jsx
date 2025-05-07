import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userIsLoged, setUserIsLoged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserIsLoged(true);
    }
    else {
      setUserIsLoged(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userIsLoged, setUserIsLoged }}>
      {children}
    </AuthContext.Provider>
  )
}
