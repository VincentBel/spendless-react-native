import React, { Component, PropTypes } from 'react'
import { StyleSheet, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { RegisterForm, Title, LoadingModal } from '../components'
import { register } from '../reducers/auth'
import { primaryColor } from '../theme'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: undefined,
    height: undefined,
    paddingBottom: 64,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loginLink: {
    alignSelf: 'flex-end',
    color: primaryColor,
    marginRight: 24,
    marginTop: 16,
  },
})

class Register extends Component {
  static propTypes = {
    isRegistering: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(values) {
    this.props.register(values)
  }

  render() {
    const { isRegistering } = this.props
    return (
      <Image
        style={styles.root}
        source={require('./img/register-bg.jpg')}
      >
        <Title>注册</Title>
        <RegisterForm onSubmit={this.submit} />
        <Text style={styles.loginLink}>已有账号? 立即登录</Text>
        <LoadingModal
          visible={isRegistering}
          text="注册中..."
        />
      </Image>
    )
  }
}

function mapStateToProps(state) {
  return {
    isRegistering: state.auth.isRegistering,
  }
}

export default connect(mapStateToProps, { register })(Register)
