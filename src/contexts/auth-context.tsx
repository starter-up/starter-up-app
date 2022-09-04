import axios, { AxiosInstance } from 'axios';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    User as FirebaseUser,
} from 'firebase/auth';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { AuthService, Axios, FirebaseService, User } from '../services';

export interface UserAuthContext {
    token: string;
    user: User | null;
    firebaseLogin: () => void;
    logout: () => Promise<void>;
    isInitializing: boolean;
}

if (!process.env.API_HOST) {
    throw new Error('API_HOST env not found');
}

const instance: AxiosInstance = axios.create({
    baseURL: `${process.env.API_HOST}/api`,
});

export const atkaRequest = instance;

export default instance;

export const AuthContext = createContext<UserAuthContext>({
    token: '',
    user: null,
    firebaseLogin: () => undefined,
    logout: async () => undefined,
    isInitializing: true,
});

interface Props {
    children?: JSX.Element;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const atkaToken = useRef<string | null>(null);
    const history = useHistory();
    const firebaseApp = new FirebaseService().app;
    const auth = getAuth(firebaseApp);

    const backendAuth = async (idToken: string) => {
        try {
            const { token: apiToken, user } =
                await AuthService.authenticateFirebase(idToken);
            setToken(apiToken);
            setUser(user);
        } catch (e) {
            setToken('');
            setUser(null);
            setIsInitializing(false);
            atkaToken.current = null;
        }
    };

    const firebaseLogin = async () => {
        const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

        if (!user) {
            throw new Error('no user in firebase auth');
        }

        const idToken = await user.getIdToken();

        if (!idToken) {
            throw new Error('no idToken in firebase auth');
        }

        await backendAuth(idToken);
    };

    const logout = async () => {
        await auth.signOut();
        Axios.cancellAlRequests();
        setUser(null);
        setToken('');
        return history.push('/');
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (profile: FirebaseUser | null) => {
            if (!profile) {
                setIsInitializing(false);
                return;
            }
            const { currentUser } = auth;
            if (!currentUser) {
                setIsInitializing(false);
                return;
            }

            const idToken = await currentUser.getIdToken();

            await backendAuth(idToken);
            setIsInitializing(false);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                firebaseLogin,
                logout,
                isInitializing,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
