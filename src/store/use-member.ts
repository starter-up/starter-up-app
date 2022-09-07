import { normalize, schema } from 'normalizr';
import { useContext } from 'react';

import { Member, MemberService } from '../services';
import { StoreContext } from './store-context';

const MemberSchema = new schema.Entity(
    'member',
    {},
    {
        idAttribute: 'uuid',
    },
);

const MemberListSchema = [MemberSchema];

export function useMemberService() {
    const { dispatch } = useContext(StoreContext);

    async function browseMembers(): Promise<void> {
        const users = await MemberService.browse();
        const normalized = normalize(users, MemberListSchema);
        dispatch({
            data: normalized,
            type: 'member:set',
        });
    }

    async function addMember(member: Member): Promise<void> {
        const user = await MemberService.add(member);
        const normalized = normalize([user], MemberListSchema);
        dispatch({
            data: normalized,
            type: 'member:add',
        });
    }
    return {
        browseMembers,
        addMember,
    };
}
