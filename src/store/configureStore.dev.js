import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { AsyncStorage } from 'react-native'
import api from '../middleware/api'
import rootReducer from '../reducers'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
})

export default function configureStore(onComplete) {
  const store = createStore(
    rootReducer,
    undefined, // no need for initialState
    compose(
      autoRehydrate(),
      applyMiddleware(thunk, api, logger)
    )
  )
  persistStore(store, { storage: AsyncStorage }, onComplete)

  if (isDebuggingInChrome) {
    window.store = store
  }

  return store
}
