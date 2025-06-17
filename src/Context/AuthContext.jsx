import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return '';
};

export const AuthProvider = ({ children }) => {
  const [userIsLoged, setUserIsLoged] = useState(false);
  const [userData, setUserData] = useState({
    name: getCookie('name') || '',
    username: getCookie('username') || '',
    dni: getCookie('dni') || '',
    address: getCookie('address') || '',
    postalCode: getCookie('postalCode') || '',
    phone: getCookie('phone') || '',
    email: getCookie('email') || '',
  });

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
    <AuthContext.Provider value={{ userIsLoged, setUserIsLoged, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}
