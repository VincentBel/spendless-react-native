import React, { PropTypes } from 'react'
import AccountList from './AccountList'

export default function Account({ navigator }) {
  return (
    <AccountList navigator={navigator} />
  )
}

Account.propTypes = {
  navigator: PropTypes.object.isRequired,
}
