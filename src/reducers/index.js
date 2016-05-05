import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import entities from './entities'
import centralizedError from './centralizedError'

const rootReducers = combineReducers({
  auth,
  entities,
  form: formReducer,
  centralizedError,
})

export default rootReducers
