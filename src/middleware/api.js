import { Schema, arrayOf, normalize } from 'normalizr'

const userSchema = new Schema('users')
const accountSchema = new Schema('accounts')

const mainCategorySchema = new Schema('mainCategories')
const subCategorySchema = new Schema('subCategories')
mainCategorySchema.define({
  subCategories: arrayOf(subCategorySchema),
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  ACCOUNT: accountSchema,
  ACCOUNT_ARRAY: arrayOf(accountSchema),
  MAIN_CATEGORY: mainCategorySchema,
  MAIN_CATEGORY_ARRAY: arrayOf(mainCategorySchema),
}

// TODO change api server url
const API_ROOT = __DEV__ ? 'http://localhost:3000/' : 'http://the-future-api-server.com/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, options) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, options)
   .catch(err => {
     if (__DEV__) {
       console.log(err)
     }
     return Promise.reject({ message: '您的网络似乎出问题啦，请检查您的网络连接' })
   })
   .then(response =>
     response.json().then(json => ({ json, response }))
   ).then(({ json, response }) => {
     if (!response.ok) {
       if (response.status === 500) {
         return Promise.reject({
           code: 500,
           message: '服务器暂时无法响应您的请求，请刷新网页后重试',
         })
       }
       return Promise.reject(json.error)
     }

     if (json.error) {
       return Promise.reject(json.error)
     }

     if (json.data && json.data.hasOwnProperty('items') && json.data.hasOwnProperty('itemCount')) {
       const { items, itemsPerPage, itemCount } = json.data
       // 说明是多个items
       return Object.assign({}, (schema ? normalize(items, schema) : items), {
         itemsPerPage,
         itemCount,
       })
     }

     return schema ? normalize(json.data, schema) : json.data
   })
}

function callAuthApi(endpoint, schema, options = {}, token) {
  const headers = Object.assign({}, options.headers, {
    Accept: 'application/json',
    'x-access-token': token,
  })
  return callApi(endpoint, schema, Object.assign({}, options, { headers }))
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = '__CALL_API_SYMBOL__'
export const CALL_AUTH_API = '__CALL_AUTH_API_SYMBOL__'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPIType = action[CALL_AUTH_API] ? CALL_AUTH_API // eslint-disable-line no-nested-ternary
   : action[CALL_API] ? CALL_API
   : undefined

  if (callAPIType === undefined) {
    return next(action)
  }

  const callAPI = action[callAPIType]

  let { endpoint } = callAPI
  const { schema, types, options } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[callAPIType]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  const callPromise = callAPIType === CALL_AUTH_API
   ? callAuthApi(endpoint, schema, options, store.getState().auth.token)
   : callApi(endpoint, schema, options)

  return callPromise.then(
   response => next(actionWith({
     response,
     type: successType,
   })),
   error => next(actionWith({
     type: failureType,
     error,
   }))
  )
}
