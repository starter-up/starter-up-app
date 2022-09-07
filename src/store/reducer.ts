import { Reducer } from 'react';

import { MemberModel, ProjectModel } from '../services';

export interface NormalEntity<T> {
    byUUID: {
        [key: string]: T;
    };
    all: string[];
}

export interface QueryInProgress {
    [key: string]: boolean;
}

export interface NormalEntities {
    members: NormalEntity<MemberModel>;
    projects: NormalEntity<ProjectModel>;
}

export interface DataStoreAction {
    type: string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    data: any;
    meta?: any;
    /* eslint-enable @typescript-eslint/no-explicit-any */
}

export function initialStoreEntity<T>(): NormalEntity<T> {
    return {
        all: [],
        byUUID: {},
    };
}

export interface DataStoreState {
    entities: NormalEntities;
}

export function initialStoreState(): DataStoreState {
    return {
        entities: {
            members: initialStoreEntity<MemberModel>(),
            projects: initialStoreEntity<ProjectModel>(),
        },
    };
}

type EntityNames = 'member' | 'project';

function genericEntityReducer<T>(entityName: EntityNames) {
    return (
        state: NormalEntity<T>,
        action: DataStoreAction,
    ): NormalEntity<T> => {
        switch (action.type) {
            case `${entityName}:set`:
                return {
                    all: [...new Set(state.all.concat(action.data.result))],
                    byUUID: {
                        ...state.byUUID,
                        ...action.data.entities[entityName],
                    },
                };
            case `${entityName}:reset`:
                return initialStoreEntity<T>();

            case `${entityName}:add`:
                return {
                    all: [...new Set(state.all.concat(action.data.result))],
                    byUUID: {
                        ...state.byUUID,
                        ...action.data.entities[entityName],
                    },
                };

            case `${entityName}:edit`:
                return {
                    ...state,
                    byUUID: {
                        ...state.byUUID,
                        ...action.data.entities[entityName],
                    },
                };

            case `${entityName}:delete`: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [action.data]: val, ...byUUID } = state.byUUID;
                const uuidIdx = state.all.indexOf(action.data);
                const all = state.all
                    .slice(0, uuidIdx)
                    .concat(state.all.slice(uuidIdx + 1));
                return {
                    all,
                    byUUID,
                };
            }

            default:
                return state;
        }
    };
}

const userEntityReducer = genericEntityReducer<MemberModel>('member');
const projectEntityReducer = genericEntityReducer<ProjectModel>('project');

export const RootReducer: Reducer<DataStoreState, DataStoreAction> = (
    state: DataStoreState = initialStoreState(),
    action: DataStoreAction,
): DataStoreState => {
    if (action.type === 'clearall') {
        return initialStoreState();
    }

    return {
        entities: {
            members: userEntityReducer(state.entities.members, action),
            projects: projectEntityReducer(state.entities.projects, action),
        },
    };
};
