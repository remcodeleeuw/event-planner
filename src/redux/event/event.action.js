import axios from 'axios';
import store from 'store';

import eventTypes from './event.types';


const API_EVENT = process.env.NODE_ENV !== 'production'
  ? "http://localhost:5000/api/event"
  : "https://event-planner-api.herokuapp.com/api/event";

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
      const { data } = await axios.get(`${API_EVENT}/user/${userId}`);
      dispatch(handleFetchEvent(data))
    } catch (error) {
      console.log(error)
    }
  }
};

export const fetchEvent = id => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_EVENT}/${id}`);
      await dispatch(handleFetchEventById(data))
    } catch (error) {
      console.log(error);
    }
  }
}

export const createEvent = (event) => {
  return async function (dispatch) {
    try {
      await axios.post(API_EVENT, {
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
      await axios.delete(`${API_EVENT}/${id}`);
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
      const { data } = await axios.get(`${API_EVENT}/${eventId}/attending/${userId}`);
      await dispatch(handleCheckIfAttending(data));
      dispatch(handleLoading())
    } catch (error) {
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
    const user = store.get('user')
    await axios.put(`${API_EVENT}/${eventId}/attending`, {
      attendee: {
        user: user.userId,
        attending
      }
    })
    dispatch(fetchEvent(eventId))
  }
}