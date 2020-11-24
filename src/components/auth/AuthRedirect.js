import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

/*
* Users will be redirected here(/authenticate) after signing in with their Google Account.
* This page will save auth code and redirect users back to where they came from.
*/

const AuthRedirect = (props) => {
    const {
        authCode,
        setAuthCode,
    } = props;
    
    const [uri, setUri] = useState(null);
    
    useEffect(() => {
        if(!authCode) {
            setAuthCode();
        }
        setRedirectUriFromStateParam();
        console.log(uri);
    }, [uri, authCode])

    const setRedirectUriFromStateParam = () => {
        let searchParams = decodeURIComponent(window.location.search);
        let redirectExists = searchParams.match(/\?state\=/);
        if(redirectExists) {
            let redirectUri = searchParams.split("?state=")[1].split("&")[0];
            setUri(redirectUri);
        }
    }

    return uri ? <Redirect to={uri} /> : <div>Loading...</div>;
}

export default AuthRedirect;