import { User } from '../schemas';

export class MemberService {
    public static async browse(
        offset = 0,
        count = 10,
    ): Promise<{
        members: User[];
    }> {
        const stubbedUsers: User[] = [
            {
                screenName: 'name a',
                uuid: 'qwe',
                summary: 'sample description a',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'idea',
                lastActive: 'qqq',
            },
            {
                screenName: 'name b',
                uuid: 'qwe',
                summary: 'sample description b',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'technology',
                lastActive: 'qqq',
            },
            {
                screenName: 'name c',
                uuid: 'qwe',
                summary: 'sample description c',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'marketing',
                lastActive: 'qqq',
            },
        ];

        return { members: stubbedUsers };
    }

    public static async add(
        offset = 0,
        count = 10,
    ): Promise<{
        members: User[];
    }> {
        const stubbedUsers: User[] = [
            {
                screenName: 'name a',
                uuid: 'qwe',
                summary: 'sample description a',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'idea',
                lastActive: 'qqq',
            },
            {
                screenName: 'name b',
                uuid: 'qwe',
                summary: 'sample description b',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'technology',
                lastActive: 'qqq',
            },
            {
                screenName: 'name c',
                uuid: 'qwe',
                summary: 'sample description c',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'marketing',
                lastActive: 'qqq',
            },
        ];

        return { members: stubbedUsers };
    }
}
