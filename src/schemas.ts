export type UserType = 'idea' | 'design' | 'sales' | 'marketing' | 'technology';

export interface IdeaMember {
    userUuid: string | null;
    userType: UserType;
}

export interface User {
    uuid: string;
    screenName?: string;
    summary?: string;
    email: string;
    linkedIn?: string;
    type?: UserType;
    lastActive?: string;
}

export interface Idea {
    name: string;
    creatorUuid: string;
    description: string;
    createdAt: string;
    members: IdeaMember[];
    updatedAt: string;
}
