import React, { PropTypes } from 'react'
import { StyleSheet, Text, View, DatePickerAndroid, TimePickerAndroid } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import SlTouchable from './SlTouchable'
import Icon from './Icon'
import IconTextInput from './IconTextInput'
import TextWithIcon from './TextWithIcon'
import RaisedButton from './RaisedButton'
import { errorColor } from '../theme'

function getErrorText(field) {
  return field.touched ? field.error : null
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 24,
    marginHorizontal: 24,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  fieldTextError: {
    color: errorColor,
  },
  dateTime: {
    backgroundColor: '#eee',
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
})

function CreateBillForm({ navigator, submitting, handleSubmit }) {
  return (
    <View>
      <Field
        name="amount"
        component={amount =>
          <IconTextInput
            {...amount}
            defaultValue="0"
            iconName="attach-money"
            keyboardType="numeric"
            placeholder="金额"
            errorText={getErrorText(amount)}
          />
        }
      />
      <Field
        name="subCategory"
        component={subCategory => {
          const errorText = getErrorText(subCategory)
          return (
            <TextWithIcon
              iconName="view-list"
              iconColor={errorText ? errorColor : null}
              text={errorText || subCategory.value.name || '选择类别'}
              textStyle={errorText ? styles.fieldTextError : null}
              onPress={() => {
                navigator.push({
                  selectCategory: true,
                  onSelectSubCategory: sub => subCategory.onChange(sub),
                })
              }}
            />
          )
        }}
      />
      <Field
        name="account"
        component={account => {
          const errorText = getErrorText(account)
          return (
            <TextWithIcon
              iconName="account-balance-wallet"
              iconColor={errorText ? errorColor : null}
              text={errorText || account.value.name || '选择账户'}
              textStyle={errorText ? styles.fieldTextError : null}
              onPress={() => {
                navigator.push({
                  selectAccount: true,
                  onSelectAccount: selectedAccount => account.onChange(selectedAccount),
                })
              }}
            />
          )
        }}
      />
      <Field
        name="date"
        defaultValue={new Date()}
        component={({ value: date, onChange }) =>
          <View style={styles.field}>
            <Icon name="access-time" size={24} />
            <SlTouchable
              onPress={async () => {
                try {
                  const { action, year, month, day } = await DatePickerAndroid.open({
                    date,
                  })
                  if (action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    onChange(new Date(
                      year, month, day, date.getHours(), date.getMinutes()
                    ))
                  }
                } catch ({ code, message }) {
                  console.warn('Cannot open date picker', message)
                }
              }}
            >
              <View style={styles.dateTime}>
                <Text>
                  {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
                </Text>
              </View>
            </SlTouchable>
            <SlTouchable
              onPress={async () => {
                try {
                  const { action, hour, minute } = await TimePickerAndroid.open({
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    is24Hour: true,
                  })
                  if (action !== TimePickerAndroid.dismissedAction) {
                    // Selected hour (0-23), minute (0-59)
                    onChange(new Date(
                      date.getFullYear(), date.getMonth(), date.getDate(), hour, minute
                    ))
                  }
                } catch ({ code, message }) {
                  console.warn('Cannot open time picker', message)
                }
              }}
            >
              <View style={styles.dateTime}>
                <Text>{`${date.getHours()} : ${date.getMinutes()}`}</Text>
              </View>
            </SlTouchable>
          </View>
        }
      />
      <Field
        name="remark"
        component={remark =>
          <IconTextInput
            {...remark}
            defaultValue="0"
            iconName="short-text"
            placeholder="备注..."
            errorText={getErrorText(remark)}
          />
        }
      />
      <RaisedButton
        text={submitting ? '保存中...' : '保存'}
        disabled={submitting}
        style={styles.addButton}
        onPress={handleSubmit}
      />
    </View>
  )
}

CreateBillForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  navigator: PropTypes.object.isRequired,
}

function validate(values) {
  const errors = {}
  if (!values.subCategory) {
    errors.subCategory = '请选择类别'
  }
  if (!values.account) {
    errors.account = '请选择账户'
  }
  if (!values.amount) {
    errors.amount = '请输入金额'
  } else if (isNaN(values.amount)) {
    errors.amount = '金额必须是数字'
  }
  return errors
}

export default reduxForm({
  form: 'createAccount',
  validate,
})(CreateBillForm)
