import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/ViteApiBaseUrl';

// Create the context
const AuthContext = createContext();

// Create a custom hook for easier access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}user/`, {withCredentials: true});
      if (res.data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(res.data);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Get CSRF from response instead of Cookies
      const csrfResponse = await axios.get(`${API_BASE_URL}csrf/`, { withCredentials: true });
      const csrfToken = csrfResponse.data.csrfToken;

      console.log('Sending logout with CSRF:', csrfToken);
      
      await axios.post(
        `${API_BASE_URL}logout/`,
        {},
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
  
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, loading, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
