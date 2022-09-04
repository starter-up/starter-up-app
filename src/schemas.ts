export type UserType = 'idea' | 'design' | 'sales' | 'marketing' | 'technology';

export interface User {
    screenName: string;
    type: UserType;
}
