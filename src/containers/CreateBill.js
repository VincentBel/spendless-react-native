import React, { Component, PropTypes } from 'react'
import { View, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Header, BackIcon, CreateBillForm } from '../components'
import { createBill } from '../reducers/bills'

class CreateBill extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    isCreating: PropTypes.bool.isRequired,
    created: PropTypes.bool.isRequired,
    createBill: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.created) {
      nextProps.navigator.pop()
      ToastAndroid.show('成功记录一条账单~', ToastAndroid.LONG)
    }
  }

  submit(values) {
    this.props.createBill(values)
  }


  render() {
    const { navigator } = this.props
    return (
      <View>
        <Header
          title="记一笔"
          leftItem={{
            icon: BackIcon,
            title: '返回',
            layout: 'icon',
            onPress: () => navigator.pop(),
          }}
        />
        <CreateBillForm
          navigator={navigator}
          onSubmit={this.submit}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  const {
    bills: {
      create: { isCreating, id },
    },
  } = state
  return {
    isCreating,
    created: !!id,
  }
}

export default connect(mapStateToProps, { createBill })(CreateBill)
