import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas/index';

import AuthReducers from './reducers/AuthReducers';
import MoviesReducers from './reducers/MoviesReducers';
import FavoritesReducers from './reducers/FavoritesReducers';

const reducer = combineReducers({
    auth: AuthReducers,
    movies: MoviesReducers,
    favorites: FavoritesReducers,
});
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
console.log(store.getState());
sagaMiddleware.run(rootSaga)


export default store;