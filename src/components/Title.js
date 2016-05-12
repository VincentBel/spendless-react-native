import React, { PropTypes } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
    fontSize: 22,
  },
})

export default function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

Title.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
}
