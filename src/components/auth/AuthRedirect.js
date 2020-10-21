import React, { useState } from 'react';

const AuthRedirect = (props) => {
    const {
        authCode,
        setAuthCode,
        RedirectAfterAuthenticated
    } = props;
    useState(() => {
        if(!authCode) {
            setAuthCode();
        }
    }, [authCode])

    return (
        <RedirectAfterAuthenticated />
    );
}

export default AuthRedirect;