import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
const API_URL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [userIsLoged, setUserIsLoged] = useState(false)
  const [userData, setUserData] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [postalCode, setPostalCode] = useState(localStorage.getItem('postalCode'))
  const [CPValues, setCPValues] = useState([])

  const getUserData = () => {
    axios.get(`${API_URL}/api/page/getUserData?email=${email}`)
    .then(res => {
      setUserData(res.data)
      setPostalCode(res.data.postal_code)
      localStorage.setItem('postalCode', res.data.postal_code)
    })
    .catch(e => console.error(e))
  }

  const getCPValues = () => {
    axios.get(`${API_URL}/api/page/getCPValues`)
    .then(res => setCPValues(res.data))
    .catch(e => console.error(e))
  }

  const calculateShipping = (volume, cp, cpData) => {
    if (!cpData || cpData.length === 0 || !cp) return null;
    console.log(cp)
    const numericCP = Number(cp); // Convertir a número explícitamente

    // 1. Filtrar las filas que corresponden al rango del CP
    const rowsForCP = cpData.filter(row => 
      numericCP >= Number(row.cp_start) && numericCP <= Number(row.cp_end)
    );

    if (rowsForCP.length === 0) return null;

    // 2. Calcular peso aforado
    const volumetricWeight = (volume * 3.5) / 10000;
    
    // 3. Buscar el tramo de peso dentro de las filas filtradas
    let shippingRow = rowsForCP.find(row => 
      volumetricWeight >= row.min_weight && volumetricWeight <= row.max_weight
    );
    console.log(shippingRow)

    // 4. Lógica de exceso (solo sobre las filas de ese CP)
    if (!shippingRow) {
      const sortedData = [...rowsForCP].sort((a, b) => b.max_weight - a.max_weight);
      const lastRow = sortedData[0];

      if (volumetricWeight > lastRow.max_weight) {
        const excess = volumetricWeight - lastRow.max_weight;
        const totalValue = lastRow.value + (excess * lastRow.excess_value);
        return { 
          total: totalValue, 
          time: lastRow.delivery_time, 
          isExcess: true,
          volumetricWeight 
        };
      }
      return null;
    }

    return { 
      total: shippingRow.value, 
      time: shippingRow.delivery_time, 
      isExcess: false,
      volumetricWeight 
    };
  };

  useEffect(() => {
    getCPValues()
  }, [])

  useEffect(() => {
    if (token && email) {
      setUserIsLoged(true)
      getUserData()
    } else {
      setUserIsLoged(false)
    }
  }, [token])

  useEffect(() => {
    if (email) {
      setUserIsLoged(true)
      getUserData()
    } else {
      setUserIsLoged(false)
    }
  }, [email])

  return (
    <AuthContext.Provider value={{ userIsLoged, setUserIsLoged, userData, setUserData, getUserData, setToken, token, setEmail, email, postalCode, CPValues, calculateShipping}}>
      {children}
    </AuthContext.Provider>
  )
}
