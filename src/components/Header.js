/**
 * Author: VincentBel
 * Date: 16/5/11
 */

import React, { PropTypes } from 'react'

import { StyleSheet, Platform, View, ToolbarAndroid } from 'react-native'
import { primaryColor, textColor } from '../theme'


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
})

function Header({
  title,
  children,
  leftItem,
  rightItem,
  extraItems,
  foreground = 'dark',
  style,
}) {
  let actions = []
  if (rightItem) {
    const { title: rightItemTitle, icon, layout } = rightItem
    actions.push({
      icon: layout !== 'title' ? icon : undefined,
      title: rightItemTitle,
      show: 'always',
    })
  }

  if (extraItems) {
    actions = actions.concat(extraItems.map(item => ({
      title: item.title,
      show: 'never',
    })))
  }

  const titleTextColor = foreground === 'dark' ?  'white' : textColor
  const backgroundColor = foreground === 'dark' ? primaryColor : 'transparent'

  let content
  if (React.Children.count(children) > 0) {
    content = (
      <View collapsable={false} style={{ flex: 1 }}>
        {children}
      </View>
    )
  }

  function handleActionSelected(position) {
    let items = extraItems || []
    if (rightItem) {
      items = [rightItem, ...items]
    }
    const item = items[position]
    if (item && item.onPress) {
      item.onPress()
    }
  }

  return (
    <View style={[styles.toolbarContainer, { backgroundColor }, style]}>
      <ToolbarAndroid
        navIcon={leftItem && leftItem.icon}
        onIconClicked={leftItem && leftItem.onPress}
        title={title}
        titleColor={titleTextColor}
        subtitleColor={titleTextColor}
        actions={actions}
        onActionSelected={handleActionSelected}
        style={styles.toolbar}
      >
        {content}
      </ToolbarAndroid>
    </View>
  )
}

const itemType = PropTypes.shape({
  title: PropTypes.string,
  icon: PropTypes.number,
  layout: PropTypes.string,
  onPress: PropTypes.func,
})

Header.propTypes = {
  title: PropTypes.string.isRequired,
  leftItem: itemType,
  rightItem: itemType,
  extraItems: PropTypes.arrayOf(itemType),
  foreground: PropTypes.oneOf(['light', 'dark']),
  style: PropTypes.number,
  children: View.propTypes.style,
}

export default Header
