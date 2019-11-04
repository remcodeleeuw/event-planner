import axios from 'axios';
import store from 'store';
import logger from "../../util/log";
import authTypes from "./auth.types";

const API_USER = process.env.NODE_ENV !== 'production'
  ? "http://localhost:5000/api/user"
  : "https://event-planner-api.herokuapp.com/api/user"


export const createUser = userToCreate => {
  return async function () {
    try {
      await axios.post(`${API_USER}`, { user: userToCreate })
    } catch (error) {
      console.log(error)
    }
  }
};

export const loginUser = user => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${API_USER}/login`, user);
      const dataToSave = {
        token: data.token,
        userId: data.user._id
      }
      store.set('user', dataToSave);
      logger.log({
        message: "User logged in",
        level: 'info',
        userId: data.user._id
      })
      dispatch(handleLoginUser())
    } catch (error) {
      logger.log({
        level: 'error',
        message: "User error while login",
        error
      })
    }
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
        url: `${API_USER}/logout`
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
