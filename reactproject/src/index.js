import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import "../node_modules/semantic-ui-css/semantic.min.css";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./stores/index";
import {persistConfig} from "./stores/index";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
const persistedReducer = persistReducer(persistConfig, reducers);
let store=createStore(persistedReducer,applyMiddleware(thunk));
let PersistStore = persistStore(store);

ReactDom.render(
    <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={PersistStore}>
    <App/>
    </PersistGate>
    </BrowserRouter>
    </Provider>,document.getElementById("root"));