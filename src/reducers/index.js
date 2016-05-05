import { combineReducers } from 'redux'
import entities from './entities'
import centralizedError from './centralizedError'

const rootReducers = combineReducers({
  entities,
  centralizedError,
})

export default rootReducers
