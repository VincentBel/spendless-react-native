import React, {
  Component,
  StyleSheet,
  PropTypes,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { RegisterForm, Title, LoadingModal } from '../components'
import { register } from '../reducers/auth'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: undefined,
    height: undefined,
    paddingBottom: 64,
    flexDirection: 'column',
    justifyContent: 'center',
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
