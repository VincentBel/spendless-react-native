import React, {
  StyleSheet,
  PropTypes,
  View,
} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import IconTextInput from './IconTextInput'
import IconPicker from './IconPicker'
import RaisedButton from './RaisedButton'
import { types } from '../helpers/accounts'

function getErrorText(field) {
  return field.touched ? field.error : null
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 24,
    marginHorizontal: 24,
  },
})

function CreateAccountForm({ submitting, handleSubmit }) {
  return (
    <View>
      <Field
        name="name"
        component={name =>
          <IconTextInput
            {...name}
            iconName="person"
            placeholder="账户名称"
            errorText={getErrorText(name)}
          />
        }
      />
      <Field
        name="type"
        component={type =>
          <IconPicker
            iconName="equalizer"
            selectedValue={type.value}
            onValueChange={type.onChange}
            mode="dialog"
            prompt="选择账户类型"
            errorText={getErrorText(type)}
          >
            {types.map(({ type: value, label }) => (
              <IconPicker.Item key={value} label={label} value={value} />
            ))}
          </IconPicker>
        }
      />
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
      <RaisedButton
        text={submitting ? '添加账户中...' : '添加账户'}
        disabled={submitting}
        style={styles.addButton}
        onPress={handleSubmit}
      />
    </View>
  )
}

CreateAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = '不能为空'
  }
  if (!values.type) {
    errors.type = '请选择一个类型'
  }
  if (!values.amount) {
    errors.amount = '不能为空'
  } else if (isNaN(values.amount)) {
    errors.amount = '必须是数字'
  }
  return errors
}

export default reduxForm({
  form: 'createAccount',
  validate,
})(CreateAccountForm)
