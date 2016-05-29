import { CALL_AUTH_API, Schemas } from '../middleware/api'
import union from 'lodash/union'

const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS'
const CATEGORIES_FAILURE = 'CATEGORIES_FAILURE'

const CREATE_MAIN_CATEGORY_REQUEST = 'CREATE_MAIN_CATEGORY_REQUEST'
const CREATE_MAIN_CATEGORY_SUCCESS = 'CREATE_MAIN_CATEGORY_SUCCESS'
const CREATE_MAIN_CATEGORY_FAILURE = 'CREATE_MAIN_CATEGORY_FAILURE'

const SELECT_MAIN_CATEGORY = 'SELECT_MAIN_CATEGORY'

const createDefaultState = {
  isCreating: false,
  id: '',
}

function createMainReducer(state = createDefaultState, action) {
  switch (action.type) {
    case CREATE_MAIN_CATEGORY_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case CREATE_MAIN_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.response.result,
      }
    case CREATE_MAIN_CATEGORY_FAILURE:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}

const itemsDefaultState = {
  isFetching: false,
  ids: null,
}

function itemsReducer(state = itemsDefaultState, action) {
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
    case CREATE_MAIN_CATEGORY_SUCCESS:
      return {
        ...state,
        ids: union(state.ids, [action.response.result]),
      }
    default:
      return state
  }
}

export default function reducer(state = {
  items: itemsDefaultState,
  createMain: createDefaultState,
  selectedMainCategoryId: '',
}, action) {
  switch (action.type) {
    case CREATE_MAIN_CATEGORY_REQUEST:
    case CREATE_MAIN_CATEGORY_FAILURE:
      return {
        ...state,
        createMain: createMainReducer(state.createMain, action),
      }
    case CREATE_MAIN_CATEGORY_SUCCESS:
      return {
        ...state,
        createMain: createMainReducer(state.createMain, action),
        items: itemsReducer(state.items, action),
      }
    case CATEGORIES_REQUEST:
    case CATEGORIES_SUCCESS:
    case CATEGORIES_FAILURE:
      return {
        ...state,
        items: itemsReducer(state.items, action),
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


export function createMainCategory(mainCategoryInfo) {
  return {
    [CALL_AUTH_API]: {
      types: [
        CREATE_MAIN_CATEGORY_REQUEST,
        CREATE_MAIN_CATEGORY_SUCCESS,
        CREATE_MAIN_CATEGORY_FAILURE,
      ],
      endpoint: 'categories',
      options: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mainCategoryInfo),
      },
      schema: Schemas.MAIN_CATEGORY,
    },
  }
}
