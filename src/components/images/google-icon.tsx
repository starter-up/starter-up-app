import React from 'react';
import styled from 'styled-components';

import GoogleIconSrc from './google-icon.png';

export const GoogleImg = styled.img`
    width: 18px;
`;

export const GoogleIcon = () => {
    return <GoogleImg src={GoogleIconSrc} alt="google-icon" />;
};
