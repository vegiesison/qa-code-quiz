import React, { createContext, useState } from 'react';
import accounts from '../../storage/account.json';

interface User {
    name: string;
    favouriteFruit: string;
    favouriteMovie: string;
    favouriteNumber: string;
}

interface AuthContextType {
    user: User | undefined;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    login: async () => { },
    logout: () => { },
});

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    const login = async (username: string, password: string) => {
        console.warn({ username, password }); // Log the credentials for debugging
        const account = (accounts as Record<string, any>)[username];
        if (account && account.password === password) {
            const { password, ...userWithoutPassword } = account;
            setUser(userWithoutPassword);
        } else {
            throw new Error('INVALID USER');
        }
    };

    const logout = () => {
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
