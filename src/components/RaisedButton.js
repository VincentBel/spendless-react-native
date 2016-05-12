import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { primaryColor, rippleColor, disabledTextColor, disabledBackgroundColor } from '../theme'

const styles = StyleSheet.create({
  button: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    margin: 6,
    borderRadius: 2,
    elevation: 2,
    backgroundColor: primaryColor,
  },
  raised: {
    elevation: 4,
  },
  disabled: {
    backgroundColor: disabledBackgroundColor,
    elevation: 0,
  },
  text: {
    position: 'relative',
    top: 2,
    color: 'white',
  },
  textDisabled: {
    color: disabledTextColor,
  },
})

export default class RaisedButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  constructor(props) {
    super(props)
    this.state = {
      raised: false,
    }
    this._handlePressIn = this._handlePressIn.bind(this)
    this._handlePressOut = this._handlePressOut.bind(this)
  }

  _handlePressIn() {
    this.setState({ raised: true })
  }

  _handlePressOut() {
    this.setState({ raised: false })
  }

  render() {
    const {
      disabled,
      onPress,
      onLongPress,
      text,
      style,
    } = this.props
    const { raised } = this.state
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(rippleColor)}
        disabled={disabled}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={this._handlePressIn}
        onPressOut={this._handlePressOut}
      >
        <View
          style={[
            styles.button,
            style,
            raised && styles.raised,
            disabled && styles.disabled,
          ]}
        >
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
