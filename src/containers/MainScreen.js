import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ToolbarAndroid } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import General from './General'
import Chart from './Chart'
import Account from './Account'
import Me from './Me'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
  },
  toolbar: {
    height: 56,
    backgroundColor: 'blue',
  },
})

class MainScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  render() {
    const { navigator } = this.props
    return (
      <View style={styles.root}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Spendless"
        />
        <ScrollableTabView>
          <General tabLabel="总览" navigator={navigator} />
          <Chart tabLabel="报表" />
          <Account tabLabel="账户" navigator={navigator} />
          <Me tabLabel="我" />
        </ScrollableTabView>
      </View>
    )
  }
}

export default MainScreen
