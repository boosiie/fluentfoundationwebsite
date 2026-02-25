import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  refreshProfile: async () => {},
  hasRole: () => false,
});

const STORAGE_KEY = 'ff_auth';

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (parsed.token) {
        setToken(parsed.token);
        setUser(parsed.user ?? null);
      }
    } catch (err) {
      console.warn('Failed to parse stored auth state', err);
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  const persist = useCallback((nextToken, nextUser) => {
    if (!nextToken) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token: nextToken, user: nextUser ?? null })
    );
  }, []);

  const handleLogin = useCallback(async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error('Invalid email or password');
    }
    const payload = await response.json();
    setToken(payload.token);
    setUser({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
    });
    persist(payload.token, {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
    });
    return payload;
  }, [persist]);

  const handleRegister = useCallback(async (input) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      const message = (await response.json().catch(() => ({}))).message ?? 'Registration failed';
      throw new Error(message);
    }
    return response.json();
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser(null);
    persist(null, null);
  }, [persist]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      handleLogout();
      return;
    }
    const payload = await response.json();
    setUser(payload);
    persist(token, payload);
  }, [token, handleLogout, persist]);

  const hasRole = useCallback((roles) => {
    if (!user || !user.role) return false;
    if (!Array.isArray(roles)) return user.role === roles;
    return roles.includes(user.role);
  }, [user]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    refreshProfile,
    hasRole,
  }), [user, token, loading, handleLogin, handleLogout, handleRegister, refreshProfile, hasRole]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
