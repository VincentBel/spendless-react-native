import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import Icon from './Icon'
import { primaryColor, errorColor } from '../theme'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  icon: {
    paddingHorizontal: 8,
    textAlign: 'center',
    top: 20,
  },
  inputArea: {
    flex: 1,
  },
  textInput: {

  },
  errorText: {
    fontSize: 12,
    color: errorColor,
    marginLeft: 4,
    top: -4,
  },
})

export default class IconTextInput extends Component {

  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
    this._handleOnFocus = this._handleOnFocus.bind(this)
    this._handleOnBlur = this._handleOnBlur.bind(this)
  }

  _handleOnFocus() {
    this.setState({ focused: true })
    if (this.props.onFocus) this.props.onFocus()
  }

  _handleOnBlur() {
    this.setState({ focused: false })
    if (this.props.onBlur) this.props.onBlur()
  }

  render() {
    const { iconName, iconSize, errorText, ...otherProps } = this.props
    const { focused } = this.state
    const stateColor = errorText ? errorColor :
      focused ? primaryColor :
      null
    const placeholderTextColor = errorText ? errorColor : null
    return (
      <View style={[styles.root, errorText && styles.rootError]}>
        <Icon size={iconSize} name={iconName} style={styles.icon} color={stateColor} />
        <View style={styles.inputArea}>
          <TextInput
            {...otherProps}
            style={styles.textInput}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={stateColor}
            onFocus={this._handleOnFocus}
            onBlur={this._handleOnBlur}
          />
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
      </View>
    )
  }
}

IconTextInput.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  errorText: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

IconTextInput.defaultProps = {
  iconSize: 24,
}
