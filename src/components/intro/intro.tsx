import React, { useCallback, useContext } from 'react';
import Particles from 'react-tsparticles';
import { Button, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { loadFull } from 'tsparticles';

import { CONSTANTS } from '../../constants';
import { AuthContext } from '../../contexts';
import { GoogleIcon } from '..';

const Background = styled.div`
    min-height: 100vh;
    background-position: center;
    background-size: cover;
    font-size: 2vw;
    font-family: ${CONSTANTS.FONT.header}, sans-serif;
    padding: 50px 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: linear-gradient(
        to bottom,
        #3373dd,
        ${CONSTANTS.COLORS.blue}
    );
`;

const GoogleIconContainer = styled.div`
    padding-right: 20px;
    width: 10%;
`;

const GoogleButton = styled(Button)`
    &&&&& {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: ${CONSTANTS.COLORS.white};
        border-radius: 20px;
        box-shadow: 0em 0px 5px 5px #00000025;
    }
`;

const Logo = styled(Header)`
    &&&&& {
        color: ${CONSTANTS.COLORS.white};
        font-size: 6em;
        text-shadow: 0px 5px 5px #00000021;
    }
`;

const SubHeader = styled(Header)`
    &&&& {
        color: ${CONSTANTS.COLORS.white};
        font-size: 3em;
        text-shadow: 0px 5px 5px #00000021;
    }
`;

const GoogleButtonWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
`;

export const Intro: React.FC = () => {
    const { firebaseLogin } = useContext(AuthContext);
    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    const particlesOptions = {
        detectRetina: false,
        fpsLimit: 30,
        particles: {
            color: {
                value: CONSTANTS.COLORS.white,
            },
            number: {
                density: {
                    enable: true,
                    area: 1080,
                },
                limit: 0,
                value: 400,
            },
            opacity: {
                animation: {
                    enable: true,
                    minimumValue: 0.05,
                    speed: 0.25,
                    sync: false,
                },
                random: {
                    enable: true,
                    minimumValue: 0.05,
                },
                value: 0.5,
            },
            shape: {
                type: 'circle',
            },
            size: {
                random: {
                    enable: true,
                    minimumValue: 0.5,
                },
                value: 2,
            },
        },
    };

    return (
        <Background>
            <Logo>VIND</Logo>
            <SubHeader>
                Finding the perfect team for your idea has never been easier
            </SubHeader>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesOptions}
            />
            <GoogleButtonWrapper>
                <GoogleButton icon onClick={firebaseLogin}>
                    <GoogleIconContainer>
                        <GoogleIcon />
                    </GoogleIconContainer>
                    Login or Join with Google
                </GoogleButton>
            </GoogleButtonWrapper>
        </Background>
    );
};
