import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'

import { Header, SlScrollableTabView } from '../components'
import General from './General'
import Chart from './Chart'
import Account from './Account'
import Me from './Me'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
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
        <Header title="Spendless" />
        <SlScrollableTabView>
          <General tabLabel="总览" navigator={navigator} />
          <Chart tabLabel="报表" />
          <Account tabLabel="账户" navigator={navigator} />
          <Me tabLabel="我" navigator={navigator} />
        </SlScrollableTabView>
      </View>
    )
  }
}

export default MainScreen
