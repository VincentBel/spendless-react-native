import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { FloatingActionButton } from '../components'

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export default class Account extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this._openCreateAccount = this._openCreateAccount.bind(this)
  }

  _openCreateAccount() {
    this.props.navigator.push({ createAccount: true })
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>账户</Text>
        <FloatingActionButton iconName="add" onPress={this._openCreateAccount} />
      </View>
    )
  }
}
