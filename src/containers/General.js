import React, {
  Component,
  StyleSheet,
  PropTypes,
  Text,
  View,
} from 'react-native'
import { FloatingActionButton } from '../components'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
  },
})

export default class General extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this._openCreateBill = this._openCreateBill.bind(this)
  }

  _openCreateBill() {
    this.props.navigator.push({ createBill: true })
  }

  render() {
    return (
      <View style={styles.root}>
        <Text>总览</Text>
        <FloatingActionButton iconName="add" onPress={this._openCreateBill} />
      </View>
    )
  }
}
