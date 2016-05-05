const RESET_CENTRALIZED_ERROR = 'RESET_CENTRALIZED_ERROR'

export default function reducer(state = null, action = {}) {
  const { type, error, customizeErrorHandling } = action

  if (type === RESET_CENTRALIZED_ERROR) {
    return null
  } else if (!customizeErrorHandling && error) {
    // 只有在没有声明自行处理错误 并且 有错误时, 才记录错误
    return error
  }

  return state
}

// Resets the currently visible error message.
export function resetCentralizedError() {
  return {
    type: RESET_CENTRALIZED_ERROR,
  }
}
