import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    // Try to get auth data from localStorage
    const token = localStorage.getItem('token');
    const user = {
      id: localStorage.getItem('user_id'),
      name: localStorage.getItem('user_name'),
      email: localStorage.getItem('user_email'),
    };

    return token ? { token, user } : null;
  });

  useEffect(() => {
    if (authData) {
      // Store token and user details in localStorage
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user_id', authData.user.id);
      localStorage.setItem('user_name', authData.user.name);
      localStorage.setItem('user_email', authData.user.email);
    } else {
      // Clear localStorage if no auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
