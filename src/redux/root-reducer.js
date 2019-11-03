import { combineReducers } from 'redux'
import { eventReducer } from './event/event.reducer'
import { authReducer } from './auth/auth.reducer'
const rootReducer = combineReducers({
  event: eventReducer,
  auth: authReducer
})

export default rootReducer;