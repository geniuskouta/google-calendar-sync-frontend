import React, { useState, useEffect } from 'react';

const AuthRedirect = (props) => {
    const {
        authCode,
        setAuthCode,
        RedirectAfterAuthenticated
    } = props;
    
    const [uri, setUri] = useState(null);
    
    useEffect(() => {
        if(!authCode) {
            setAuthCode();
        }
        setRedirectUri();
    }, [authCode])

    const setRedirectUri = () => {
        let searchParams = decodeURIComponent(window.location.search);
        let redirectExists = searchParams.match(/\?state\=/);
        if(redirectExists) {
            let redirectUri = searchParams.split("?state=")[1].split("&")[0];
            setUri(redirectUri);
        }
    }

    return (
        <RedirectAfterAuthenticated uri={uri} />
    );
}

export default AuthRedirect;