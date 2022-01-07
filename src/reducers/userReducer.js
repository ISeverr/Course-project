import {createContext} from "react";


export const initialState = {};


export const authReducer = (state, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        ...action.payload
      };
    default: return state
  }
};