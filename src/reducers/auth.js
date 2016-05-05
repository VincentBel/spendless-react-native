import { CALL_API } from '../middleware/api'

const REGISTER_REQUEST = 'REGISTER_REQUEST'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FALUIRE = 'REGISTER_FALUIRE'

export default function reducer(state = {
  isRegistering: false,
  isLoggedIn: false,
  id: '',
  username: '',
  email: '',
  token: '',
}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isRegistering: true,
      }
    case REGISTER_SUCCESS: {
      const { id, username, email, token } = action.response
      return {
        ...state,
        isRegistering: false,
        id,
        email,
        username,
        token,
      }
    }
    case REGISTER_FALUIRE:
      return {
        ...state,
        isRegistering: false,
      }
    default:
      return state
  }
}

export function register(registerInfo) {
  return {
    [CALL_API]: {
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FALUIRE],
      endpoint: 'users',
      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
      },
    },
  }
}
