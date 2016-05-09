/**
 * Author: VincentBel
 * Date: 16/5/9
 */

import React, {
  PropTypes,
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { Icon, SlTouchable } from '../components'

const styles = StyleSheet.create({
  category: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
})

export default class CreateBill extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this._openCategorySelection = this._openCategorySelection.bind(this)
  }

  _openCategorySelection() {
    this.props.navigator.push({ selectCategory: true })
  }

  render() {
    return (
      <View>
        <SlTouchable onPress={this._openCategorySelection}>
          <View style={styles.category}>
            <Icon name="view-list" size={24} />
            <Text>选择类别</Text>
          </View>
        </SlTouchable>
      </View>
    )
  }
}
