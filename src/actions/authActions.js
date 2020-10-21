import { AUTH_CODE, REFRESH_TOKEN } from "../types/authTypes";

export const setRefreshToken = (refreshToken) => {
    return (dispatch, getState) => {
        dispatch({ type: REFRESH_TOKEN, refreshToken});
    }
}

export const setAuthCode = () => {
    return (dispatch, getState) => {
        let code = decodeURIComponent(window.location.search);
        code = code.split('code=')[1].split('&')[0];
        dispatch({ type: AUTH_CODE, authCode: code});
    }
}

export const setRedirectUri = () => {
    return (dispatch, getState) => {
        let redirectUri = window.location.pathname;       
        dispatch({ type: "REDIRECT_URI", redirectUri});
    }
}
