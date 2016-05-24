import { CALL_AUTH_API, Schemas } from '../middleware/api'

const CREATE_BILL_REQUEST = 'CREATE_BILL_REQUEST'
const CREATE_BILL_SUCCESS = 'CREATE_BILL_SUCCESS'
const CREATE_BILL_FAILURE = 'CREATE_BILL_FAILURE'

const createDefaultState = {
  id: '',
  isCreating: false,
}

function createReducer(state = createDefaultState, action) {
  switch (action.type) {
    case CREATE_BILL_REQUEST:
      return {
        ...state,
        isCreating: true,
      }
    case CREATE_BILL_SUCCESS:
      return {
        ...state,
        isCreating: false,
        id: action.response.result,
      }
    case CREATE_BILL_FAILURE:
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
    case CREATE_BILL_REQUEST:
    case CREATE_BILL_SUCCESS:
    case CREATE_BILL_FAILURE:
      return {
        ...state,
        create: createReducer(state.create, action),
      }
    default:
      return state
  }
}

export function createBill(billInfo) {
  const data = {
    amount: billInfo.amount,
    date: billInfo.date || new Date(),
    remark: billInfo.remark,
    accountId: billInfo.account.id,
    subCategoryId: billInfo.subCategory.id,
  }
  return {
    [CALL_AUTH_API]: {
      types: [CREATE_BILL_REQUEST, CREATE_BILL_SUCCESS, CREATE_BILL_FAILURE],
      endpoint: 'bills',
      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      schema: Schemas.BILL,
    },
  }
}
