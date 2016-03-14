import React, { Component } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import App from './containers/App'

const store = configureStore()

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default Root
