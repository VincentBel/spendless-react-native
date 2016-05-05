import React, {
  Component,
  PropTypes,
  StyleSheet,
  StatusBar,
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { resetCentralizedError } from '../reducers/centralizedError'
import AppNavigator from './AppNavigator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class App extends Component {
  static propTypes = {
    centralizedError: PropTypes.shape({
      code: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    }),
    resetCentralizedError: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.centralizedError) {
      // Todo if user press outside of the alert dialog
      // It won't trigger resetCentralizedError
      Alert.alert(
        '错误',
        nextProps.centralizedError.message,
        [{ text: '确定', onPress: () => nextProps.resetCentralizedError() }]
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
        />
        <AppNavigator />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    centralizedError: state.centralizedError,
  }
}

export default connect(mapStateToProps, { resetCentralizedError })(App)
