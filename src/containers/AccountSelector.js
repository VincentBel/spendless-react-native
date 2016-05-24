import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import { BackIcon, Header } from '../components'
import AccountList from './AccountList'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch',
  },
})

export default function AccountSelector({ navigator, onSelectAccount }) {
  return (
    <View style={styles.root}>
      <Header
        title="选择类别"
        leftItem={{
          icon: BackIcon,
          title: '返回',
          layout: 'icon',
          onPress: () => navigator.pop(),
        }}
      />
      <AccountList
        navigator={navigator}
        onSelectAccount={account => {
          navigator.pop()
          if (onSelectAccount) {
            onSelectAccount(account)
          }
        }}
      />
    </View>
  )
}

AccountSelector.propTypes = {
  navigator: PropTypes.object.isRequired,
  onSelectAccount: PropTypes.func.isRequired,
}
