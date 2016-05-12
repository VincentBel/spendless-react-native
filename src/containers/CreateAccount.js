import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { CreateAccountForm, LoadingModal } from '../components'
import { createAccount } from '../reducers/accounts'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
})

class CreateAccount extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    accountName: PropTypes.string,
    isCreating: PropTypes.bool.isRequired,
    created: PropTypes.bool.isRequired,
    createAccount: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.created) {
      nextProps.navigator.pop()
      ToastAndroid.show(`成功创建账户: ${nextProps.accountName}`, ToastAndroid.LONG)
    }
  }

  submit(values) {
    this.props.createAccount(values)
  }


  render() {
    const { isCreating } = this.props
    return (
      <View style={styles.root}>
        <CreateAccountForm onSubmit={this.submit} />
        <LoadingModal
          visible={isCreating}
          text="创建账户中..."
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const {
    entities: { accounts },
    accounts: {
      create: { isCreating, id },
    },
  } = state
  const accountName = (id && accounts[id]) ? accounts[id].name : ''
  return {
    accountName,
    isCreating,
    created: !!id,
  }
}

export default connect(mapStateToProps, { createAccount })(CreateAccount)
