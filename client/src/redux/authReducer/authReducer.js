import {
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_REQ,
  SIGNOUT,
} from "./actionTypes";
import { loadData } from "../../utils/localStorage";

let user = loadData("yourStoryUser");
let isAuth = loadData("yourStoryUserIsAuth");

const init = {
  user: user || null,
  isAuth: isAuth || false,
  isError: false,
  isLoading: false,
  errorMessage: "",
};

export const authReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SIGNIN_REQ: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        user: null,
        isAuth: false,
      };
    }

    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload,
      };
    }

    case SIGNIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        user: null,
        errorMessage: payload,
      };
    }

    case SIGNOUT: {
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};
