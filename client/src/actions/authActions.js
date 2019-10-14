import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // Redirect to Login on Successful Registration
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

    // Set Token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set Token to Auth Header
      setAuthToken(token);
      // Decode Token to Get User Data
      const decoded = jwt_decode(token);
      // Set Current User
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged in User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User Loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove Token From localStorage
  localStorage.removeItem("jwtToken");
  // Remove Auth Header for Future Requests
  setAuthToken(false);
  // Set Current User to Empty Object {} Which Will Set isAuthenticated to False
  dispatch(setCurrentUser({}));
};