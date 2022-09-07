import { normalize, schema } from 'normalizr';
import { useContext } from 'react';

import { ProjectService } from '../services';
import { StoreContext } from './store-context';

const ProjectSchema = new schema.Entity(
    'project',
    {},
    {
        idAttribute: 'uuid',
    },
);

const ProjectListSchema = [ProjectSchema];

export function useProjectService() {
    const { dispatch } = useContext(StoreContext);

    async function browseProjects(): Promise<void> {
        const results = await ProjectService.browse();
        const normalized = normalize(results, ProjectListSchema);
        dispatch({
            data: normalized,
            type: 'project:set',
        });
    }

    return {
        browseProjects,
    };
}
