import React, { useState } from 'react';
import accounts from '../../storage/account.json'; // Importing JSON data
import { Accounts, Account } from '../types/accounts'; // Adjust path as needed

// Type assertion to match the expected type
const typedAccounts: Accounts = accounts;

interface AuthAPI {
    user?: {
        name?: string;
        favouriteFruit: string;
        favouriteMovie: string;
        favouriteNumber: string;
    };
    login: (username: string, password: string) => Promise<Account>;
    logout: () => void;
}

const defaultAuthAPI: AuthAPI = {
    login: () => Promise.reject("Login function is not implemented"), // Default implementation
    logout: () => { }
};

const AuthContext = React.createContext<AuthAPI>(defaultAuthAPI);

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<{ name?: string; favouriteFruit: string; favouriteMovie: string; favouriteNumber: string } | undefined>(undefined);

    const login = (username: string, password: string): Promise<Account> => {
        console.warn({ username, password });
        const account = typedAccounts[username];
        if (account && account.password === password) {
            setUser(account);
            return Promise.resolve(account);
        } else {
            return Promise.reject("INVALID USER");
        }
    };

    const logout = () => {
        setUser(undefined);
    };

    const api: AuthAPI = {
        user,
        logout,
        login
    };

    return (
        <AuthContext.Provider value={api}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
