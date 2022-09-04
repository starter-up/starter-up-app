import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Header, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

import { CONSTANTS } from '../constants';
import { AuthContext } from '../contexts';

const LinkLabel = styled(NavLink)`
    color: rgba(255, 255, 255, 0.9);
    padding: 4px 0;
    margin: 14px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    &:hover {
        color: #fff;
    }
    &.active {
        border-bottom: 2px #fff solid;
    }

    @media only screen and (max-width: ${CONSTANTS.RESPONSIVE.mobileMax}px) {
        display: block;
        color: rgba(26, 17, 51, 0.8);
        font-weight: normal;
        font-size: 18px;
        padding: 10px 0;
        margin: 14px 0;
        &.active {
            font-weight: bold;
            color: rgba(26, 17, 51, 0.8);
        }
        &:hover {
            color: rgba(26, 17, 51, 0.8);
        }
    }
`;

const LogoutLabel = styled(NavLink)`
    color: rgba(255, 255, 255, 0.9);
    padding: 4px 14px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    &:hover {
        color: #fff;
    }
`;

const NavbarContainer = styled(Menu)`
    && {
        background-color: ${CONSTANTS.COLORS.blue};
        display: flex;
        align-items: center;
        padding: 10px;
        justify-content: right;
        .ui.header {
            font-family: ${CONSTANTS.FONT.header};
        }
    }
`;

const NavBarPlaceholder = styled.div`
    position: relative;
    height: 40px;
`;

export const NavigationBar = () => {
    const userContext = useContext(AuthContext);
    const { logout } = userContext;

    return (
        <>
            <NavBarPlaceholder />
            <NavbarContainer fixed="top">
                <Header>
                    <LinkLabel to="/projects" activeClassName="active">
                        Projects
                    </LinkLabel>
                    <LinkLabel to="/members" activeClassName="active">
                        Members
                    </LinkLabel>
                    <LogoutLabel
                        to="/"
                        onClick={logout}
                        activeClassName="active"
                    >
                        Logout
                    </LogoutLabel>
                </Header>
            </NavbarContainer>
        </>
    );
};
