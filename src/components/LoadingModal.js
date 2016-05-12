import React, { PropTypes } from 'react'
import { StyleSheet, Modal, View } from 'react-native'
import Loading from './Loading'

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loading: {
    backgroundColor: 'white',
    paddingVertical: 36,
    marginHorizontal: 48,
    borderRadius: 2,
    elevation: 2,
  },
})

export default function LoadingModal({
  visible,
  text,
}) {
  return (
    <Modal visible={visible} onRequestClose={() => {}}>
      <View style={styles.loadingContainer}>
        <Loading text={text} style={styles.loading} />
      </View>
    </Modal>
  )
}

LoadingModal.propTypes = {
  visible: PropTypes.bool,
  text: PropTypes.string,
}
