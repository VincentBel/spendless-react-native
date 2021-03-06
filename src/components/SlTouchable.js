import React, { PropTypes } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { rippleColor as defaultRippleColor } from '../theme'


// Custom Touchable Component
function SlTouchable({ disabled, children, onPress, rippleColor = defaultRippleColor }) {
  return (
    <TouchableNativeFeedback
      disabled={disabled}
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(rippleColor)}
    >
      {children}
    </TouchableNativeFeedback>
  )
}

SlTouchable.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onPress: PropTypes.func,
  rippleColor: PropTypes.string,
}

export default SlTouchable
