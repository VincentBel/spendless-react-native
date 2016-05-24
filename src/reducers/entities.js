import merge from 'lodash/merge'

export default function reducer(state = {
  accounts: {},
  bills: {},
  mainCategories: {},
  subCategories: {},
}, action = {}) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}
