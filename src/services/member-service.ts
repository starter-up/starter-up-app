import { BaseModel } from '../schemas';

export type UserType = 'idea' | 'design' | 'sales' | 'marketing' | 'technology';
export interface Member {
    screenName?: string;
    summary?: string;
    email: string;
    linkedIn?: string;
    type?: UserType;
    lastActive?: string;
}

export interface MemberModel extends BaseModel, Member {}

export class MemberService {
    public static async browse(offset = 0, count = 10): Promise<MemberModel[]> {
        const stubbedUsers: MemberModel[] = [
            {
                id: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                screenName: 'name a',
                uuid: 'qwe',
                summary:
                    'sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a sample description a',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'idea',
                lastActive: 'qqq',
            },
            {
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                screenName: 'name b',
                uuid: 'qwe1',
                summary: 'sample description b',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'technology',
                lastActive: 'qqq',
            },
            {
                id: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                screenName: 'name c',
                uuid: 'qwe2',
                summary: 'sample description c',
                email: 'qwe',
                linkedIn: 'qwe',
                type: 'marketing',
                lastActive: 'qqq',
            },
        ];

        return stubbedUsers;
    }

    public static async add(member: Member): Promise<MemberModel> {
        const stubbedUser = {
            id: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...member,
            uuid: 'qwe',
            lastActive: 'qwe',
        };
        return stubbedUser;
    }
}
