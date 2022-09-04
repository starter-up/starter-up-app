import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { User } from '../../schemas';
import { Pill } from '../';

const Wrapper = styled.div`
    padding: 20px;
    border: 2px solid #00000021;
    margin: 10px 0;
    border-radius: 10px;
    font-family: ${CONSTANTS.FONT.header}, calibri;
`;

const Title = styled(Header)`
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

const BottomWrapper = styled.div`
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

interface MemberListItemProps {
    member: User;
}

export const MemberListItem: React.FC<MemberListItemProps> = (props) => {
    const { screenName, summary, type, lastActive } = props.member;

    return (
        <Wrapper>
            <Title>{screenName}</Title>
            <Description>{summary}</Description>
            <BottomWrapper>
                <Pill>{type}</Pill>
                <div>{lastActive}</div>
            </BottomWrapper>
        </Wrapper>
    );
};
