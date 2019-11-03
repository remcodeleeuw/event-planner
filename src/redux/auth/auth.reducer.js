import authTypes from "./auth.types";

const INITIAL_STATE = {
  loggedIn: false
}

export function authReducer(state = INITIAL_STATE, action) {
  const { type } = action;
  switch (type) {
    case authTypes.SIGN_IN:
      return applyLogin(state)
    case authTypes.LOGOUT:
      return applyLogout(state)
    default: return state;
  }
}

function applyLogin(state) {
  return {
    ...state,
    loggedIn: true
  }
}

function applyLogout(state) {
  return {
    ...state,
    loggedIn: false
  }
}