import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { ProjectMember, ProjectModel } from '../../services';
import { Pill } from '..';

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
        max-height: 60px;
        font-family: ${CONSTANTS.FONT.header}, calibri;
        overflow-y: hidden;
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

interface ProjectListItemProps {
    project: ProjectModel;
}

interface MembersNeeded {
    [key: string]: number;
}

export const ProjectListItem: React.FC<ProjectListItemProps> = (props) => {
    const { name, description, members, updatedAt } = props.project;
    const [membersNeeded, setMembersNeeded] = useState<MembersNeeded>({});

    useEffect(() => {
        const cache = members.reduce(
            (acc: MembersNeeded, { userUuid, userType }: ProjectMember) => {
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
                                <Pill key={index}>
                                    {type} x {count}
                                </Pill>
                            );
                        },
                    )}
                </MembersWrapper>
                <div>{updatedAt.toISOString()}</div>
            </BottomWrapper>
        </Wrapper>
    );
};
