import React, { PropTypes } from 'react'
import { StyleSheet, Text, Picker, View } from 'react-native'
import Icon from './Icon'
import { errorColor } from '../theme'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  icon: {
    paddingHorizontal: 8,
    textAlign: 'center',
    top: 10,
  },
  pickerWrapper: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: errorColor,
    marginLeft: 4,
    top: -8,
  },
})

export default function IconPicker({
  iconName,
  iconSize = 24,
  errorText,
  style,
  children,
  ...otherProps,
}) {
  return (
    <View style={[styles.root, style]}>
      <Icon size={iconSize} name={iconName} style={styles.icon} />
      <View style={styles.pickerWrapper}>
        <Picker {...otherProps}>
          {children}
        </Picker>
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
    </View>
  )
}

IconPicker.Item = Picker.Item

IconPicker.propTypes = {
  children: PropTypes.node,
  style: PropTypes.number,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  errorText: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}
