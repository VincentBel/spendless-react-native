import React, {
  StyleSheet,
  PropTypes,
  View,
} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import IconTextInput from './IconTextInput'
import RaisedButton from './RaisedButton'

function getErrorText(field) {
  return field.touched ? field.error : null
}

const styles = StyleSheet.create({
  registerButton: {
    marginTop: 24,
    marginHorizontal: 24,
  },
})

function RegisterForm({ submitting, handleSubmit }) {
  return (
    <View>
      <Field
        name="username"
        component={username =>
          <IconTextInput
            {...username}
            iconName="person"
            placeholder="用户名"
            errorText={getErrorText(username)}
          />
        }
      />
      <Field
        name="email"
        component={email =>
          <IconTextInput
            {...email}
            iconName="email"
            placeholder="邮箱地址"
            errorText={getErrorText(email)}
          />
        }
      />
      <Field
        name="password"
        component={password =>
          <IconTextInput
            {...password}
            type="password"
            iconName="lock-outline"
            placeholder="密码"
            errorText={getErrorText(password)}
          />
        }
      />
      <RaisedButton
        text={submitting ? '注册中...' : '注册'}
        disabled={submitting}
        style={styles.registerButton}
        onPress={handleSubmit}
      />
    </View>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

function validate(values) {
  const errors = {}
  if (!values.username) {
    errors.username = '不能为空'
  } else if (values.username.length > 16) {
    errors.username = '不能多于16个字符'
  }
  if (!values.email) {
    errors.email = '不能为空'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '邮箱格式不正确'
  }
  if (!values.password) {
    errors.password = '不能为空'
  } else if (values.password.length < 6) {
    errors.password = '至少包含6个字符'
  }
  return errors
}

export default reduxForm({
  form: 'register',
  validate,
})(RegisterForm)
