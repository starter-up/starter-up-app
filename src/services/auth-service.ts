import { User, UserType } from '../schemas';

export class AuthService {
    public static async authenticateFirebase(firebaseToken: string): Promise<{
        token: string;
        user: User;
    }> {
        const stubbedType: UserType = 'technology';
        const stubbedUser = {
            screenName: 'screen-name',
            type: stubbedType,
        };

        return { token: 'temp-token', user: stubbedUser };
    }
}
