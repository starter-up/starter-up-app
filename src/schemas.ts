export interface BaseModel {
    id: number;
    createdAt: Date;
    deletedAt?: Date;
    updatedAt: Date;
    uuid: string;
}

export type UserType = 'idea' | 'design' | 'sales' | 'marketing' | 'technology';
