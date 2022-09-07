import React, { createContext, useReducer } from 'react';

import { initialStoreState, RootReducer } from './reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const StoreContext = createContext<any>({
    dispatch: () => {
        throw new Error('dispatch not implemented');
    },
    store: {},
});

interface StoreProps {
    children: React.ReactNode;
}

export const Store: React.FC<StoreProps> = ({ children }) => {
    const [store, dispatch] = useReducer(RootReducer, initialStoreState());
    const dataContextApi = {
        dispatch,
        store,
    };

    return (
        <StoreContext.Provider value={dataContextApi}>
            {children}
        </StoreContext.Provider>
    );
};
