import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    let valid = storedToken && isValidToken(storedToken);

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(valid);

    useEffect(() => {
        const validateToken = () => {
            if (!token) {
                setIsAuthenticated(false);
            } else if (isValidToken(token)) {
                setIsAuthenticated(true);
            } else {
                logout();
            }
        }
        validateToken();
    }, [token]);

    function isValidToken(token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ username, password }),
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
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
