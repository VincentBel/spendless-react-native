import React, {
  Component,
  PropTypes,
  StyleSheet,
  BackAndroid,
  Navigator,
} from 'react-native'
import { connect } from 'react-redux'
import MainScreen from './MainScreen'
import CreateBill from './CreateBill'
import CreateAccount from './CreateAccount'
import Category from './Category'
import Register from './Register'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

class AppNavigator extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }
  static childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this._handlers = []
    this.renderScene = this.renderScene.bind(this)
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
    if (!this.props.isLoggedIn) {
      return <Register />
    }
    if (route.selectCategory) {
      return <Category />
    }
    if (route.createBill) {
      return <CreateBill navigator={navigator} />
    }
    if (route.createAccount) {
      return <CreateAccount navigator={navigator} />
    }
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

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.auth.token,
  }
}

export default connect(mapStateToProps)(AppNavigator)
