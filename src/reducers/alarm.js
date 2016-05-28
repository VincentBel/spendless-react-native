const TOGGLE_ALARM = 'TOGGLE_ALARM'
const SET_ALARM_TIME = 'SET_ALARM_TIME'

export default function reducers(state = {
  turnOn: true,
  alarmTime: '21:30',
}, action) {
  switch (action.type) {
    case TOGGLE_ALARM:
      return {
        ...state,
        turnOn: !state.turnOn,
      }
    case SET_ALARM_TIME:
      return {
        ...state,
        alarmTime: action.alarmTime,
      }
    default:
      return state
  }
}

export function toggleAlarm() {
  return {
    type: TOGGLE_ALARM,
  }
}

export function setAlarmTime(alarmTime) {
  return {
    type: SET_ALARM_TIME,
    alarmTime,
  }
}
