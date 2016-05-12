import React, { PropTypes } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { rippleColor as defaultRippleColor } from '../theme'


// Custom Touchable Component
function SlTouchable({ children, onPress, rippleColor = defaultRippleColor }) {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(rippleColor)}
    >
      {children}
    </TouchableNativeFeedback>
  )
}

SlTouchable.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  rippleColor: PropTypes.string,
}

export default SlTouchable
