import { useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';

const SESSION_KEY = 'flowops_access_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY));

  const login = useCallback((accessToken) => {
    sessionStorage.setItem(SESSION_KEY, accessToken);
    setToken(accessToken);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
