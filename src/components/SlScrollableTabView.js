import React from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { primaryColor } from '../theme'

export default function SlScrollableTabView({ children, ...otherProps }) {
  return (
    <ScrollableTabView
      tabBarUnderlineColor={primaryColor}
      tabBarBackgroundColor="white"
      tabBarActiveTextColor={primaryColor}
      tabBarInactiveTextColor="black"
      {...otherProps}
    >
      {children}
    </ScrollableTabView>
  )
}
