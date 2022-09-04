export type UserType = 'idea' | 'design' | 'sales' | 'marketing' | 'technology';

export interface IdeaMember {
    userUuid: string | null;
    userType: UserType;
}

export interface User {
    uuid: string;
    screenName: string;
    type: UserType;
}

export interface Idea {
    name: string;
    creatorUuid: string;
    description: string;
    createdAt: string;
    members: IdeaMember[];
    updatedAt: string;
}
