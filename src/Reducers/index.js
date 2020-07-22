import * as actiontypes from "../actions/types";
import { combineReducers } from "redux";

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actiontypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case actiontypes.CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
});

export default rootReducer;
