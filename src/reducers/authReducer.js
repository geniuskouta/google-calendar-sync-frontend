import { AUTH_CODE, REFRESH_TOKEN, REDIRECT_URI } from "../types/authTypes";

const initialState = {
    redirectUri: null,
    authCode: null,
    refreshToken: null
};

export const authReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case AUTH_CODE:
      newState.authCode = action.authCode;
      return newState;
    case REFRESH_TOKEN:
      newState.refreshToken = action.refreshToken;
      return newState;
    case REDIRECT_URI:
      newState.redirectUri = action.redirectUri;
      return newState;
    default:
      return newState;
  }
};
