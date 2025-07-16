import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
      const res = await axios.get('http://localhost:8000/api/user/');
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
      // Get CSRF token
      await axios.get('http://localhost:8000/api/csrf/');
      // Get it from cookies
      const csrfToken = Cookies.get('csrftoken');
      
      await axios.post(
        'http://localhost:8000/api/logout/',
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
