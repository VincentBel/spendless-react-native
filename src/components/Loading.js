import React, {
  PropTypes,
  StyleSheet,
  ProgressBarAndroid,
  Text,
  View,
} from 'react-native'
import { primaryColor } from '../theme'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    paddingRight: 8, // add a padding right to adjust centering visual effect
  },
})

export default function Loading({
  styleAttr = 'Small',
  style,
  text = '加载中...',
}) {
  return (
    <View style={[styles.root, style]}>
      <View>
        <ProgressBarAndroid
          color={primaryColor}
          indeterminate
          styleAttr={styleAttr}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

Loading.propTypes = {
  styleAttr: PropTypes.oneOf([
    'Horizontal',
    'Normal',
    'Small',
    'Large',
    'Inverse',
    'SmallInverse',
    'LargeInverse',
  ]),
  text: PropTypes.string.isRequired,
  style: PropTypes.number,
}
