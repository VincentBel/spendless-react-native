import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import entities from './entities'
import accounts from './accounts'
import bills from './bills'
import categories from './categories'
import centralizedError from './centralizedError'
import alarm from './alarm'

const rootReducers = combineReducers({
  alarm,
  auth,
  entities,
  form: formReducer,
  accounts,
  bills,
  categories,
  centralizedError,
})

export default rootReducers
