import React, { useState } from 'react';
import accounts from '../../storage/account.json';
import { Account, Accounts } from '../types/accounts';

interface AuthAPI {
    user?: {
        name: string;
        favouriteFruit: string;
        favouriteMovie: string;
        favouriteNumber: string;
    };
    login: (username: string, password: string) => Promise<Account>;
    logout: () => void;
}


const AuthContext = React.createContext<AuthAPI>({
    login: () => Promise.resolve({} as Account), // Use type assertion if necessary
    logout: () => { },
});

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<AuthAPI['user']>();

    const login = (username: string, password: string) => {
        console.warn({ username, password });
        const account = (accounts as Accounts)[username];
        if (account && account.password === password) {
            const { password, ...userData } = account;
            setUser(userData);
            return Promise.resolve(account);
        } else {
            return Promise.reject("INVALID USER");
        }
    };

    const logout = () => {
        setUser(undefined);
    };

    const api = {
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
