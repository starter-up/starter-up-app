import { BaseModel } from '../schemas';
import { UserType } from '.';

export interface ProjectMember {
    userUuid: string | null;
    userType: UserType;
}

export interface Project {
    name: string;
    creatorUuid: string;
    description: string;
    members: ProjectMember[];
}

export interface ProjectModel extends BaseModel, Project {}

export class ProjectService {
    public static async browse(
        offset = 0,
        count = 10,
    ): Promise<ProjectModel[]> {
        const stubbedIdeas: ProjectModel[] = [
            {
                id: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                uuid: 'qwe',
                name: 'idea name a',
                creatorUuid: 'qwe',
                description: 'sample description a',
                members: [
                    { userUuid: null, userType: 'technology' },
                    { userUuid: null, userType: 'design' },
                    { userUuid: null, userType: 'design' },
                    { userUuid: null, userType: 'design' },
                ],
            },
            {
                id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                uuid: 'qwe1',
                name: 'idea name b',
                creatorUuid: 'qwe',
                description: 'sample description b',
                members: [
                    { userUuid: null, userType: 'design' },
                    { userUuid: null, userType: 'technology' },
                ],
            },
        ];

        return stubbedIdeas;
    }
}
