import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, AuthContext } from '../contexts/auth';

// Mock accounts.json with the provided content
jest.mock('../../storage/account.json', () => ({
    SomeUser_name: {
        name: 'SomeName',
        password: 'TopSecret1234!',
        favouriteFruit: 'some fruit',
        favouriteMovie: 'The Room',
        favouriteNumber: 'BN<1234>'
    },
    dummytree: {
        password: 'test1',
        favouriteFruit: 'Mango',
        favouriteMovie: 'V for Vendetta',
        favouriteNumber: 'The last prime number'
    }
}));

describe('AuthProvider', () => {
    it('should login successfully with correct credentials', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        await act(async () => {
            await result.current.login('SomeUser_name', 'TopSecret1234!');
        });

        expect(result.current.user).toEqual({
            name: 'SomeName',
            favouriteFruit: 'some fruit',
            favouriteMovie: 'The Room',
            favouriteNumber: 'BN<1234>',
        });
    });

    it('should reject login with invalid credentials', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        let error;
        await act(async () => {
            try {
                await result.current.login('SomeUser_name', 'wrongPassword');
            } catch (e) {
                error = e;
            }
        });

        expect(error).toBe('INVALID USER');
        expect(result.current.user).toBeUndefined();
    });

    it('should reject login with non-existing username', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        let error;
        await act(async () => {
            try {
                await result.current.login('nonExistingUser', 'somePassword');
            } catch (e) {
                error = e;
            }
        });

        expect(error).toBe('INVALID USER');
        expect(result.current.user).toBeUndefined();
    });

    it('should logout successfully', () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBeUndefined();
    });
});
