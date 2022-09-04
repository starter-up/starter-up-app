import { Idea } from '../schemas';

export class IdeaService {
    public static async browse(
        offset = 0,
        count = 10,
    ): Promise<{
        ideas: Idea[];
    }> {
        const stubbedIdeas: Idea[] = [
            {
                name: 'idea name a',
                creatorUuid: 'qwe',
                description: 'sample description a',
                createdAt: 'qwe',
                updatedAt: 'january 20, 2020',
                members: [
                    { userUuid: null, userType: 'technology' },
                    { userUuid: null, userType: 'design' },
                    { userUuid: null, userType: 'design' },
                    { userUuid: null, userType: 'design' },
                ],
            },
            {
                name: 'idea name b',
                creatorUuid: 'qwe',
                description: 'sample description b',
                createdAt: 'qwe',
                updatedAt: 'january 20, 2021',
                members: [
                    { userUuid: null, userType: 'design' },
                    { userUuid: null, userType: 'technology' },
                ],
            },
        ];

        return { ideas: stubbedIdeas };
    }
}
