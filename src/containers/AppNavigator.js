import React, {
  Component,
  StyleSheet,
  BackAndroid,
  Navigator,
} from 'react-native'
import MainScreen from './MainScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

class AppNavigator extends Component {
  static childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this._handlers = []
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton)
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener)
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener)
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true
      }
    }

    const { navigator } = this.refs
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop()
      return true
    }
    return false
  }

  renderScene(route, navigator) {
    return <MainScreen navigator={navigator} />
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottomAndroid}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    )
  }
}

export default AppNavigator
