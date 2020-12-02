import { AUTH_CODE, REFRESH_TOKEN } from "../types/authTypes";

export const setRefreshToken = (refreshToken) => {
    return (dispatch, getState) => {
        dispatch({ type: REFRESH_TOKEN, refreshToken});
    }
}

export const setAuthCode = () => {
    return (dispatch, getState) => {
        let searchParams = decodeURIComponent(window.location.search);
        let codeExists = searchParams.match(/code\=/);
        if(codeExists) {
            let code = searchParams.split('code=')[1].split('&')[0];
            dispatch({ type: AUTH_CODE, authCode: code});
        }
    }
}

export const setRedirectUri = () => {
    return (dispatch, getState) => {
        let redirectUri = window.location.pathname;       
        dispatch({ type: "REDIRECT_URI", redirectUri});
    }
}
