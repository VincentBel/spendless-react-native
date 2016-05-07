import React, {
  StyleSheet,
  PropTypes,
  View,
  TouchableNativeFeedback,
} from 'react-native'
import Icon from './Icon'
import { accentColor } from '../theme'

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  wrapper: {
    borderRadius: 28,
    width: 56,
    height: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: accentColor,
  },
})

export default function FloatingActionButton({ onPress, iconName, style }) {
  return (
    <View style={[styles.root, style]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('white')}
        onPress={onPress}
      >
        <View style={styles.wrapper} elevation={5}>
          <Icon name={iconName} color="white" size={24} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

FloatingActionButton.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}
