import {compose,legacy_createStore as createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import  createSagaMiddleware from 'redux-saga'

import {rootReducer} from './root-reducer'
import {rootSaga} from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(Boolean)


const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;


const persistConfig = {
  key:'root',
  storage,
  whitelist:['cart']
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer,undefined,composedEnhancers)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)




