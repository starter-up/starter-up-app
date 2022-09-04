/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
    name: string;
}

export class AuthService {
    public static async authenticateFirebase(firebaseToken: string): Promise<{
        token: string;
        user: User;
    }> {
        return { token: 'temp-token', user: { name: 'temp-name' } };
    }
}
