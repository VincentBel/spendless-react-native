import { CALL_AUTH_API, Schemas } from '../middleware/api'

const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS'
const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE'

const SELECT_MAIN_CATEGORY = 'SELECT_MAIN_CATEGORY'

const itemsDefaultState = {
  isFetching: false,
  ids: null,
}

function itemsReducers(state = itemsDefaultState, action) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.result,
      }
    case CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}

export default function reducer(state = {
  items: itemsDefaultState,
  selectedMainCategoryId: '',
}, action) {
  switch (action.type) {
    case CATEGORIES_REQUEST:
    case CATEGORIES_SUCCESS:
    case CATEGORIES_FAILURE:
      return {
        ...state,
        items: itemsReducers(action.items, action),
      }
    case SELECT_MAIN_CATEGORY:
      return {
        ...state,
        selectedMainCategoryId: action.categoryId,
      }
    default:
      return state
  }
}

function fetchCategories() {
  return {
    [CALL_AUTH_API]: {
      types: [CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE],
      endpoint: 'categories',
      schema: Schemas.MAIN_CATEGORY_ARRAY,
    },
  }
}

export function loadCategories() {
  return (dispatch, getState) => {
    const ids = getState().categories.items.ids
    if (ids) {
      return null
    }
    return dispatch(fetchCategories())
  }
}

export function selectMainCategory(categoryId) {
  return {
    type: SELECT_MAIN_CATEGORY,
    categoryId,
  }
}
