/* eslint-disable import/no-import-module-exports */
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import middleware from './middlewares';
import rootSaga from './sagas';
import reducers from './reducers';

import {reactotronEnhancer} from './middlewares/devTools';

import LoadAsyncStore from './loadAsyncStore';

const composeEnhancers = compose;

const isProduction = process.env.NODE_ENV === 'production';

const configureStore = preloadedState => {
    const store = createStore(
        reducers,
        preloadedState,
        isProduction ? composeEnhancers(
            applyMiddleware(
                ...middleware
            )
        ) : composeEnhancers(
            applyMiddleware(
                ...middleware
            ),
            reactotronEnhancer
        )
    );

    return store;
};

const store = configureStore();
const [sagaMiddleware] = middleware;
let sagaTask = sagaMiddleware.run(rootSaga);

if (module.hot && !isProduction) {
    module.hot.accept('./reducers', () => {
        // eslint-disable-next-line
        const nextReducers = require('./reducers').default;
        store.replaceReducer(nextReducers);
    });

    module.hot.accept('./sagas', () => {
        sagaTask.cancel();
        sagaTask = sagaMiddleware.run(rootSaga);
    });
}

export default LoadAsyncStore(store);
