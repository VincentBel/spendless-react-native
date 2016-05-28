import React, { PropTypes } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { RaisedButton, TextWithIcon } from '../components'
import { errorColor } from '../theme'

const styles = StyleSheet.create({
  sectionTitle: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  logoutButton: {
    backgroundColor: errorColor,
    marginTop: 48,
    marginHorizontal: 16,
  },
})

function Me({ navigator, username, email }) {
  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>账户</Text>
      <TextWithIcon touchable={false} iconName="person" text={username} />
      <TextWithIcon touchable={false} iconName="email" text={email} />
      <Text style={styles.sectionTitle}>设置</Text>
      <TextWithIcon
        iconName="import-export"
        text="导出数据"
      />
      <TextWithIcon
        iconName="alarm"
        text="记账提醒"
        onPress={() => {
          navigator.push({ setAlarm: true })
        }}
      />
      <RaisedButton style={styles.logoutButton} text="退出登录" />
    </ScrollView>
  )
}

Me.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  const {
    auth: { username, email },
  } = state
  return {
    username,
    email,
  }
}

export default connect(mapStateToProps)(Me)
