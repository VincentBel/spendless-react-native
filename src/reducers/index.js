import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import entities from './entities'
import centralizedError from './centralizedError'

const rootReducers = combineReducers({
  entities,
  form: formReducer,
  centralizedError,
})

export default rootReducers
