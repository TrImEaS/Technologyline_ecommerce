import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userIsLoged, setUserIsLoged] = useState(false);
  const [userData, setUserData] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  // const getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) {
  //     return decodeURIComponent(parts.pop().split(';').shift());
  //   }
  //   return '';
  // };

  const getUserData = () => {
    axios.get(`${API_URL}/api/page/getUserData?email=${email}`)
    .then(res => setUserData(res.data))
    .catch(e => console.error(e))
  }

  useEffect(() => {
    if (token && email) {
      setUserIsLoged(true);
    }
    else {
      setUserIsLoged(false);
    }
  }, [token]);

  useEffect(() => {
    if (email) {
      setUserIsLoged(true)
      getUserData()
    } else {
      setUserIsLoged(false)
    }
  }, [email])

  return (
    <AuthContext.Provider value={{ userIsLoged, setUserIsLoged, userData, setUserData, getUserData, setToken, token, setEmail, email }}>
      {children}
    </AuthContext.Provider>
  )
}
