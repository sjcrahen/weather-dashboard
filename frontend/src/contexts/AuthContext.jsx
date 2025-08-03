import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const isValidToken = token => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export const AuthProvider = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    const hasValidToken = storedToken && isValidToken(storedToken);

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(hasValidToken);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
        } else if (isValidToken(token)) {
            setIsAuthenticated(true);
        } else {
            logout();
        }
    }, [token, logout]);

    const login = useCallback(async loginForm => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginForm.username, password: loginForm.password }),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${await response.text()}`);
            }

            const newToken = await response.text();
            localStorage.setItem('token', newToken);
            setToken(newToken);
            return true;
        } catch (error) {
            console.error('Login failed:', error.message || error);
            return false;
        }
    }, []);

    const value = useMemo(
        () => ({
            token,
            login,
            logout,
            isAuthenticated,
        }),
        [token, login, logout, isAuthenticated],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
