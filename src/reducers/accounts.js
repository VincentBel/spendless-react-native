import { CALL_AUTH_API, Schemas } from '../middleware/api'

const CREATE_ACCOUNT_REQUEST = 'CREATE_ACCOUNT_REQUEST'
const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS'
const CREATE_ACCOUNT_FAILURE = 'CREATE_ACCOUNT_FAILURE'

const createDefaultState = {
  id: '',
  isCreating: false,
}

function createReducer(state = createDefaultState, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isCreating: true,
      }
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        id: action.response.result,
      }
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isCreating: false,
      }
    default:
      return state
  }
}

export default function reducer(state = {
  create: createDefaultState,
}, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
    case CREATE_ACCOUNT_SUCCESS:
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        create: createReducer(state.create, action),
      }
    default:
      return state
  }
}

export function createAccount(accountInfo) {
  return {
    [CALL_AUTH_API]: {
      types: [CREATE_ACCOUNT_REQUEST, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_FAILURE],
      endpoint: 'accounts',
      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountInfo),
      },
      schema: Schemas.ACCOUNT,
    },
  }
}
