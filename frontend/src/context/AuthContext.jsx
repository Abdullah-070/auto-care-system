import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('customer_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/user/profile')
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem('customer_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('customer_token', res.data.token);
    const profile = await api.get('/user/profile');
    setUser(profile.data);
    return profile.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('customer_token', res.data.token);
    const profile = await api.get('/user/profile');
    setUser(profile.data);
    return profile.data;
  };

  const logout = () => {
    localStorage.removeItem('customer_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
