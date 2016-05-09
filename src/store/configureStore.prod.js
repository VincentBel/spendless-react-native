import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import rootReducer from '../reducers'

export default function configureStore(onComplete) {
  const store = createStore(
    rootReducer,
    undefined, // no need for initialState
    compose(
      applyMiddleware(thunk, api),
      autoRehydrate()
    )
  )
  persistStore(store, { storage: AsyncStorage }, onComplete)
  return store
}
