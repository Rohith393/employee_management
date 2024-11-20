import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const Authcontextprovder = ({ children }) => {
    const [isauthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Initialize auth state from localStorage on component mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedUser = localStorage.getItem('user');
        
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logininfo = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        // Store in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logoutinfo = () => {
        setIsAuthenticated(false);
        setUser(null);
        // Clear localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isauthenticated, logininfo, logoutinfo, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
