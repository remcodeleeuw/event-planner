import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleware = [
  thunk, 
  logger
]

export const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;