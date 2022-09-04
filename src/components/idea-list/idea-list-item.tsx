import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { Idea, IdeaMember } from '../../schemas';

const Wrapper = styled.div`
    padding: 20px;
    border: 2px solid #00000021;
    margin: 10px 0;
    border-radius: 10px;
    font-family: ${CONSTANTS.FONT.header}, calibri;
`;

const IdeaTitle = styled(Header)`
    &&&& {
        font-size: 2em;
        color: ${CONSTANTS.COLORS.blue};
        font-family: ${CONSTANTS.FONT.header}, calibri;
    }
`;

const Description = styled.div`
    && {
        font-family: ${CONSTANTS.FONT.header}, calibri;
    }
`;

const MembersWrapper = styled.div`
    display: flex;
`;

const BottomWrapper = styled.div`
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

const MembersNeededWrapper = styled.div`
    background-color: ${CONSTANTS.COLORS.red};
    color: ${CONSTANTS.COLORS.white};
    border-radius: 30px;
    padding: 2px 10px;
    margin-right: 5px;
`;

interface IdeaListItemProps {
    idea: Idea;
}

interface MembersNeeded {
    [key: string]: number;
}

export const IdeaListItem: React.FC<IdeaListItemProps> = (props) => {
    const { name, description, members, updatedAt } = props.idea;
    const [membersNeeded, setMembersNeeded] = useState<MembersNeeded>({});

    useEffect(() => {
        const cache = members.reduce(
            (acc: MembersNeeded, { userUuid, userType }: IdeaMember) => {
                if (userUuid) {
                    return acc;
                }
                acc[userType] = acc[userType] ? acc[userType] + 1 : 1;
                return acc;
            },
            {},
        );
        setMembersNeeded(cache);
    }, []);

    return (
        <Wrapper>
            <IdeaTitle>{name}</IdeaTitle>
            <Description>{description}</Description>
            <BottomWrapper>
                <MembersWrapper>
                    {Object.entries(membersNeeded).map(
                        ([type, count], index) => {
                            return (
                                <MembersNeededWrapper key={index}>
                                    {type} x {count}
                                </MembersNeededWrapper>
                            );
                        },
                    )}
                </MembersWrapper>
                <div>{updatedAt}</div>
            </BottomWrapper>
        </Wrapper>
    );
};
