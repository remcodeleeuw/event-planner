import authTypes from "./auth.types";

const INITIAL_STATE = {
  loggedIn: false,
  error: {
    hasError: false
  }
}

export function authReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case authTypes.SIGN_IN:
      return applyLogin(state)
    case authTypes.LOGOUT:
      return applyLogout(state)
    case authTypes.ERROR:
      return applyError(state, payload)
    default: return state;
  }
}

function applyLogin(state) {
  return {
    ...state,
    loggedIn: true,
    error: {
      hasError: false
    }
  }
}

function applyLogout(state) {
  return {
    ...state,
    loggedIn: false,
  }
}

function applyError(state, payload) {
  return {
    ...state,
    error: {
      hasError: true,
      error: payload
    }
  }
}