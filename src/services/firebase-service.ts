import { FirebaseApp, getApp, initializeApp } from 'firebase/app';

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
};

export class FirebaseService {
    public app: FirebaseApp;

    constructor(config: FirebaseConfig = firebaseConfig) {
        this.app = this.getApp(config);
    }

    private getApp(config: FirebaseConfig) {
        let app;
        try {
            app = getApp();
        } catch (e) {
            app = initializeApp(config);
        }
        return app;
    }
}
