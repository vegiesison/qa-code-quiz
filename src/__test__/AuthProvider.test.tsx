import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { AuthProvider, AuthContext } from '../contexts/auth';
import accounts from '../../storage/account.json'; // Import the mocked accounts data

jest.mock('../../storage/account.json', () => ({
    SomeUser_name: {
        name: 'SomeName',
        password: 'TopSecret1234!',
        favouriteFruit: 'some fruit',
        favouriteMovie: 'The Room',
        favouriteNumber: 'BN<1234>'
    },
    dummytree: {
        name: 'SomeName2',
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

        const { password, ...expectedUser } = accounts.SomeUser_name;
        expect(result.current.user).toEqual(expectedUser);
    });

    it('should reject login with invalid credentials', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        let error: Error | null = null;
        await act(async () => {
            try {
                await result.current.login('SomeUser_name', 'wrongPassword');
            } catch (e) {
                error = e;
            }
        });

        expect(error).not.toBeNull();
        expect(error!.message).toBe('INVALID USER');
        expect(result.current.user).toBeUndefined();
    });

    it('should reject login with non-existing username', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        let error: Error | null = null;
        await act(async () => {
            try {
                await result.current.login('nonExistingUser', 'somePassword');
            } catch (e) {
                error = e;
            }
        });

        expect(error).not.toBeNull();
        expect(error!.message).toBe('INVALID USER');
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

    it('should maintain user state across re-renders', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result, rerender } = renderHook(() => React.useContext(AuthContext), { wrapper });

        await act(async () => {
            await result.current.login('SomeUser_name', 'TopSecret1234!');
        });

        rerender();

        const { password, ...expectedUser } = accounts.SomeUser_name;
        expect(result.current.user).toEqual(expectedUser);
    });

    it('should handle login with empty username', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        let error: Error | null = null;
        await act(async () => {
            try {
                await result.current.login('', 'somePassword');
            } catch (e) {
                error = e;
            }
        });

        expect(error).not.toBeNull();
        expect(error!.message).toBe('INVALID USER');
        expect(result.current.user).toBeUndefined();
    });

    it('should handle login with empty password', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        let error: Error | null = null;
        await act(async () => {
            try {
                await result.current.login('SomeUser_name', '');
            } catch (e) {
                error = e;
            }
        });

        expect(error).not.toBeNull();
        expect(error!.message).toBe('INVALID USER');
        expect(result.current.user).toBeUndefined();
    });

    it('should ensure user object does not include password after login', async () => {
        const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
        const { result } = renderHook(() => React.useContext(AuthContext), { wrapper });

        await act(async () => {
            await result.current.login('SomeUser_name', 'TopSecret1234!');
        });

        expect(result.current.user).not.toHaveProperty('password');
    });
});
