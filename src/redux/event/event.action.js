import axios from 'axios';

import eventTypes from './event.types';

const API = "http://localhost:5000/api/event"
export const handleFetchEvent = events => {
  return {
    type: eventTypes.FETCH_EVENTS,
    payload: events
  }
};

const handleFetchEventById = event => {
  return {
    type: eventTypes.FETCH_EVENT_BY_ID,
    payload: event
  }
}

export const fetchEvents = userId => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API}/user/${userId}`);
      dispatch(handleFetchEvent(data))
    } catch (error) {
      console.log(error)
    }
  }
};

export const fetchEvent = id => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      await dispatch(handleFetchEventById(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const createEvent = (event) => {
  return async function (dispatch) {
    try {
      await axios.post(API, {
        event
      });
      dispatch(fetchEvents());
    } catch (error) {
      console.log(error)
    }
  }
};

export const deleteEvent = id => {
  return async function (dispatch) {
    try {
      await axios.delete(`${API}/${id}`);
      dispatch(fetchEvents());
    } catch (error) {
      console.log(error);
    }
  }
}

export const checkIfAttending = (userId, eventId) => {
  return async function (dispatch) {
    dispatch(handleLoading())
    try {
      const { data } = await axios.get(`${API}/${eventId}/attending/${userId}`);
      await dispatch(handleCheckIfAttending(data));
      dispatch(handleLoading())
    } catch (error) {
      console.log("hee")
      console.log(error)
    }
  }
}

const handleCheckIfAttending = attending => {
  return {
    type: eventTypes.ATTENDING_CHECK,
    payload: attending
  }
}

const handleLoading = () => {
  return {
    type: eventTypes.LOADING
  }
}

export const setAttending = (eventId, attending) => {
  return async function (dispatch) {
    const user = JSON.parse(localStorage.getItem('user'));
    await axios.put(`${API}/${eventId}/attending`, {
      attendee: {
        user: user.userId,
        attending
      }
    })
    dispatch(fetchEvent(eventId))
  }
}