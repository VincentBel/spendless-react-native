import React, { PropTypes } from 'react'
import { View, Text, Switch, StyleSheet, TimePickerAndroid } from 'react-native'
import { connect } from 'react-redux'
import { TextWithIcon, Header, BackIcon } from '../components'
import {
  toggleAlarm as toggleAlarmAction,
  setAlarmTime as setAlarmTimeAction,
} from '../reducers/alarm'

const styles = StyleSheet.create({
  turnOnRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  turnOnText: {
    fontSize: 16,
  },

  setAlarmText: {
    marginTop: 16,
    marginHorizontal: 24,
  },
})

// 设置定时提醒
function SetAlarm({
  navigator,
  turnOn,
  alarmTime,
  toggleAlarm,
  setAlarmTime,
}) {
  return (
    <View>
      <Header
        title="设置提醒"
        leftItem={{
          icon: BackIcon,
          title: '返回',
          layout: 'icon',
          onPress: () => navigator.pop(),
        }}
      />
      <View style={styles.turnOnRoot}>
        <Text style={styles.turnOnText}>开启提醒</Text>
        <Switch
          value={turnOn}
          onValueChange={toggleAlarm}
        />
      </View>
      <TextWithIcon
        disabled={!turnOn}
        iconName="alarm"
        text={alarmTime}
        onPress={async () => {
          try {
            const alarmTimeSpiltIndex = alarmTime.indexOf(':')
            const { action, hour, minute } = await TimePickerAndroid.open({
              hour: Number(alarmTime.substring(0, alarmTimeSpiltIndex)),
              minute: Number(alarmTime.substring(alarmTimeSpiltIndex + 1)),
              is24Hour: true,
            })
            if (action !== TimePickerAndroid.dismissedAction) {
              // Selected hour (0-23), minute (0-59)
              setAlarmTime(`${hour}:${minute}`)
            }
          } catch ({ code, message }) {
            // eslint-disable-next-line no-console
            console.warn('Cannot open time picker', message)
          }
        }}
      />
    </View>
  )
}

SetAlarm.propTypes = {
  navigator: PropTypes.object.isRequired,
  turnOn: PropTypes.bool.isRequired,
  alarmTime: PropTypes.string.isRequired,
  toggleAlarm: PropTypes.func.isRequired,
  setAlarmTime: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {
    alarm: { turnOn, alarmTime },
  } = state
  return {
    turnOn,
    alarmTime,
  }
}

export default connect(mapStateToProps, {
  toggleAlarm: toggleAlarmAction,
  setAlarmTime: setAlarmTimeAction,
})(SetAlarm)
