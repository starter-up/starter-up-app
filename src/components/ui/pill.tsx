import React from 'react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';

const PillWrapper = styled.div`
    background-color: ${CONSTANTS.COLORS.red};
    color: ${CONSTANTS.COLORS.white};
    border-radius: 30px;
    padding: 2px 10px;
    margin-right: 5px;
`;

interface PillProps {
    children: React.ReactNode;
}

export const Pill: React.FC<PillProps> = (props) => {
    const { children } = props;

    return <PillWrapper>{children}</PillWrapper>;
};
