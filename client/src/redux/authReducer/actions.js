import axios from "axios";
import {
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQ,
  SIGNOUT,
} from "./actionTypes";
import { setData } from "../../utils/localStorage";

export const signinReq = () => {
  return {
    type: SIGNIN_REQ,
  };
};

export const signinSuccess = (payload) => {
  return {
    type: SIGNIN_SUCCESS,
    payload,
  };
};

export const signinFailure = (message) => {
  return {
    type: SIGNIN_FAILURE,
    payload: message,
  };
};

export const signout = () => {
  return {
    type: SIGNOUT,
  };
};

//signin logic
export const signin = (data) => (dispatch) => {
  dispatch(signinReq());
  return axios
    .post(`http://localhost:5000/users/signin`, data)
    .then((res) => {
      // console.log(res);
      setData("mySchoolUser", res.data);
      setData("mySchoolIsAuth", true);
      dispatch(signinSuccess(res.data));
    })
    .catch((err) => {
      //   console.log(err.response);
      if (err.response) {
        dispatch(signinFailure(err.response.data.message));
      } else {
        dispatch(signinFailure("Server Down"));
      }
    });
};

//signup
// export const signup = (data) => (dispatch) => {
//   dispatch(signupReq());
//   return axios
//     .post(`http://localhost:5000/users/signup`, data)
//     .then((res) => {
//       // console.log(res);
//       // setData("yourStoryUser", res.data);
//       // setData("yourStoryUserIsAuth", true);
//       dispatch(signupSuccess(res.data));
//     })
//     .catch((err) => {
//       //   console.log(err.response);
//       dispatch(signupFailure(err.response.data.message));
//     });
// };
