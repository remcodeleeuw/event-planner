import eventTypes from "./event.types";

const INITIAL_STATE = {
  events: [],
  selectedEvent: {},
  attending: {},
  loading: false
};

export function eventReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action
  switch (type) {
    case eventTypes.FETCH_EVENTS:
      return applyEvents(state, payload);
    case eventTypes.FETCH_EVENT_BY_ID:
      return applyEvent(state, payload)
    case eventTypes.ATTENDING_CHECK:
      return applyAttending(state, payload)
    case eventTypes.LOADING:
      return applyLoading(state, payload)
    default: return state
  }
};

function applyEvents(state, { events }) {
  return {
    ...state,
    events
  }
}

function applyEvent(state, payload) {
  return {
    ...state,
    selectedEvent: {
      ...payload.event
    }
  }
}

function applyAttending(state, payload) {
  return {
    ...state,
    attending: payload.attending
  }
}

function applyLoading(state, payload) {
  return {
    ...state,
    loading: !state.loading
  }
}