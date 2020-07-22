import * as actiontypes from "./types";

export const setUser = (user) => {
  return {
    type: actiontypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
