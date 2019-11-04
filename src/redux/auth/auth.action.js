import axios from 'axios';
import store from 'store';

import authTypes from "./auth.types";

const API = process.env.NODE_ENV !== 'production' ? "http://localhost:5000/api/user" : "https://event-planner-api.herokuapp.com/api/user"


export const createUser = userToCreate => {
  return async function () {
    try {
      await axios.post(`${API}`, { user: userToCreate })
    } catch (error) {
      console.log(error)
    }
  }
};

export const loginUser = user => {
  return async function (dispatch) {
    console.log(process.env.NODE_ENV)
    try {
      const { data } = await axios.post(`${API}/login`, user);
      const dataToSave = {
        token: data.token,
        userId: data.user._id
      }
      store.set('user', dataToSave);
      console.log(dataToSave)
      dispatch(handleLoginUser())
    } catch (error) { console.log(error) }
  }
};

const handleLoginUser = () => {
  return {
    type: authTypes.SIGN_IN,
  }
}
const handleLogout = () => {
  return {
    type: authTypes.LOGOUT
  }
}
export const logout = () => {
  return async function (dispatch) {
    try {
      const user = store.get('user')
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        url: `${API}/logout`
      }
      await axios(options);
      store.remove("user");
      dispatch(handleLogout())
    } catch (error) {
      console.log(error)
    }
  }
}


export const checkIfUserSignedIn = user => {
  return async function (dispatch) {
    await dispatch(handleLoginUser(user));
  }
}
