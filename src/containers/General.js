import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
  },
})

export default class General extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>总览</Text>
      </View>
    )
  }
}
