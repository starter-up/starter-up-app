import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import { AuthContext } from '../../contexts';
import { GoogleIcon } from '../';

const Background = styled.div`
    min-height: 100vh;
    background-position: center;
    background-size: cover;
`;

const SignInArea = styled.div`
    background-color: white;
    min-height: 100vh;
    width: 30vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GoogleIconContainer = styled.div`
    padding-right: 20px;
    width: 10%;
`;

const GoogleButton = styled(Button)`
    && {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
`;

export const Login: React.FC = () => {
    const { firebaseLogin } = useContext(AuthContext);

    return (
        <Background>
            <SignInArea>
                <GoogleButton icon secondary onClick={firebaseLogin}>
                    <GoogleIconContainer>
                        <GoogleIcon />
                    </GoogleIconContainer>
                    Sign in with Google
                </GoogleButton>
            </SignInArea>
        </Background>
    );
};
