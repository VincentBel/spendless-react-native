import React, { PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SlTouchable from './SlTouchable'
import Icon from './Icon'
import { disabledOpacity } from '../theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  disabled: {
    opacity: disabledOpacity,
  },
  text: {
    marginLeft: 8,
  },
})

// text with icon on the left
export default function TextWithIcon({
  touchable = true,
  disabled = false,
  onPress,
  style,
  text,
  textStyle,
  iconColor,
  iconName,
}) {
  const content = (
    <View style={[styles.root, style, disabled && styles.disabled]}>
      <Icon name={iconName} size={24} color={iconColor} />
      <Text style={[styles.text, textStyle]}>
        {text}
      </Text>
    </View>
  )
  if (touchable) {
    return (
      <SlTouchable disabled={disabled} onPress={onPress}>
        {content}
      </SlTouchable>
    )
  }
  return content
}

TextWithIcon.propTypes = {
  touchable: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  style: View.propTypes.style,
  text: PropTypes.string.isRequired,
  textStyle: Text.propTypes.style,
  iconColor: PropTypes.string,
  iconName: PropTypes.string.isRequired,
}
