import React from "react";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers';
import rootSaga from '../sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

const Store=({children}:any)=>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default Store;