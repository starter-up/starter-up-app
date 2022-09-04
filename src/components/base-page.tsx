import React, { FunctionComponent, useContext } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { AuthContext } from '../contexts';
import { Login, NavigationBar } from './';

const UserRoute = (args: RouteProps): JSX.Element => {
    const { user } = useContext(AuthContext);

    if (user) {
        return <Route component={args.component} />;
    } else {
        return <Redirect to={{ pathname: '/' }} />;
    }
};

const PublicPages: FunctionComponent<{}> = () => {
    return (
        <Switch>
            <Route component={Login} />
        </Switch>
    );
};

const PrivatePages: FunctionComponent<{}> = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return null;
    }

    return (
        <Switch>
            <UserRoute path="/" component={Login} />
        </Switch>
    );
};

export const BasePage: FunctionComponent<{}> = () => {
    const { user, isInitializing } = useContext(AuthContext);
    console.log('qwe', user, isInitializing)
    if (isInitializing) {
        return <div>loading</div>;
    }

    if (!user) {
        return <PublicPages />;
    }

    return (
        <>
            <NavigationBar />
            <PrivatePages />
        </>
    );
};
