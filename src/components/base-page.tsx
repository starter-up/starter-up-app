import React, { FunctionComponent, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthContext } from '../contexts';
import { IdeaList, Intro, NavigationBar } from './';

const PublicPages: FunctionComponent<{}> = () => {
    return (
        <Switch>
            <Route component={Intro} />
        </Switch>
    );
};

const PrivatePages: FunctionComponent<{}> = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return null;
    }
    console.log('qweeee');
    return (
        <Switch>
            <Route exact path="/ideas" component={IdeaList} />
            <Route
                path="/"
                render={(): JSX.Element => {
                    console.log('redirecting aaa')
                    return <Redirect to="/ideas" />;
                }}
            />
            <Route render={() => <div>Not found</div>} />
        </Switch>
    );
};

export const BasePage: FunctionComponent<{}> = () => {
    const { user, isInitializing } = useContext(AuthContext);

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
