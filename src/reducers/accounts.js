import { CALL_AUTH_API, Schemas } from '../middleware/api'
import union from 'lodash/union'

const ACCOUNTS_REQUEST = 'ACCOUNTS_REQUEST'
const ACCOUNTS_SUCCESS = 'ACCOUNTS_SUCCESS'
const ACCOUNTS_FAILURE = 'ACCOUNTS_FAILURE'

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

const itemsDefaultState = {
  isFetching: false,
  ids: null,
}

function itemsReducers(state = itemsDefaultState, action) {
  switch (action.type) {
    case ACCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case ACCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.result,
      }
    case ACCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, [action.response.result]),
      }
    default:
      return state
  }
}

export default function reducer(state = {
  create: createDefaultState,
  items: itemsDefaultState,
}, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST:
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        create: createReducer(state.create, action),
      }
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        create: createReducer(state.create, action),
        items: itemsReducers(state.items, action),
      }
    case ACCOUNTS_REQUEST:
    case ACCOUNTS_SUCCESS:
    case ACCOUNTS_FAILURE:
      return {
        ...state,
        items: itemsReducers(state.items, action),
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

function fetchAccounts() {
  return {
    [CALL_AUTH_API]: {
      types: [ACCOUNTS_REQUEST, ACCOUNTS_SUCCESS, ACCOUNTS_FAILURE],
      endpoint: 'accounts',
      schema: Schemas.ACCOUNT_ARRAY,
    },
  }
}

export function loadAccounts() {
  return (dispatch, getState) => {
    const ids = getState().accounts.items.ids
    if (ids) {
      return null
    }
    return dispatch(fetchAccounts())
  }
}
