import React, { PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import IconTextInput from './IconTextInput'
import RaisedButton from './RaisedButton'

function getErrorText(field) {
  return field.touched ? field.error : null
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 24,
    marginHorizontal: 24,
  },
})

function CreateCategoryForm({ submitting, handleSubmit }) {
  return (
    <View>
      <Field
        name="name"
        component={name =>
          <IconTextInput
            {...name}
            iconName="short-text"
            placeholder="类别名称"
            errorText={getErrorText(name)}
          />
        }
      />
      <RaisedButton
        text={submitting ? '创建类别中...' : '创建类别'}
        disabled={submitting}
        style={styles.addButton}
        onPress={handleSubmit}
      />
    </View>
  )
}

CreateCategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

function validate(values) {
  const errors = {}
  if (!values.name) {
    errors.name = '不能为空'
  }
  return errors
}

export default reduxForm({
  form: 'createCategory',
  validate,
})(CreateCategoryForm)
