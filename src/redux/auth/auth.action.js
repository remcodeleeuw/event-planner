import axios from 'axios';

import authTypes from "./auth.types";
const API = "https://event-planner-api.herokuapp.com/api/user"


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
    try {
      const { data } = await axios.post(`${API}/login`, user);
      const dataToSave = {
        token: data.token,
        userId: data.user._id
      }
      localStorage.setItem("user", JSON.stringify(dataToSave));
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
      const user = JSON.parse(localStorage.getItem("user"));
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        url: `${API}/logout`
      }
      await axios(options);
      localStorage.removeItem("user");
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