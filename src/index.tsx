import 'semantic-ui-css/semantic.min.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { BasePage } from './components';
import { AuthProvider } from './contexts';
import { Store } from './store';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Element with id 'root' not found; Terminating");
}

const root = createRoot(rootElement);

root.render(
    <Router>
        <Store>
            <Switch>
                <AuthProvider>
                    <BasePage />
                </AuthProvider>
            </Switch>
        </Store>
    </Router>,
);
