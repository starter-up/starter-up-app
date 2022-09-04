import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { User } from '../../schemas';
import { MemberService } from '../../services';
import { MemberListItem } from './member-list-item';

const Background = styled.div`
    padding: 50px 20% 10px;
    background-color: ${CONSTANTS.COLORS.white};
    min-height: 100vh;
`;

export const MemberList: React.FC = () => {
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        const promise = async () => {
            const { members: retrieved } = await MemberService.browse();
            setMembers(retrieved);
        };
        promise();
    }, []);

    return (
        <Background>
            {members.length > 0 &&
                members.map((member, index) => {
                    return <MemberListItem key={index} member={member} />;
                })}
        </Background>
    );
};
