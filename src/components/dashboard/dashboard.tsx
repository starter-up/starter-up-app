import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    min-height: 100vh;
    background-position: center;
    background-size: cover;
`;

export const Dashboard: React.FC = () => {
    return <Background>Dashboard</Background>;
};
