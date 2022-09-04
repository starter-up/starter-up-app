import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import firebase from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, User as FirebaseUser } from 'firebase/auth';
import React, {
    createContext,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router';

import { AuthService, Axios, FirebaseService, User } from '../services';

export interface UserAuthContext {
    token: string;
    user: User | null;
    firebaseLogin: () => void;
    logout: () => Promise<void>;
    isInitializing: boolean;
}

const instance: AxiosInstance = axios.create({
    baseURL: `${process.env.THERMA_API_HOST || 'http://localhost:8999'}/api`,
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
    const navigate = useNavigate();

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
        const { user } = await signInWithPopup(
            getAuth(),
            new GoogleAuthProvider(),
        );

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
        await getAuth().signOut();
        Axios.cancellAlRequests();
        setUser(null);
        setToken('');
        return navigate('/');
    };

    useEffect(() => {
        new FirebaseService().app;
        getAuth().onAuthStateChanged(async (profile: FirebaseUser | null) => {
            if (!profile) {
                setIsInitializing(false);
                return;
            }
            const { currentUser } = getAuth();
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
