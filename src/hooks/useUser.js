import React, { useState, useContext, useCallback } from 'react';
import UserContext from 'context/UserContext';
import LoginService from 'services/login';
import { getProfile } from 'services/userService';
import jwt_decode from "jwt-decode";


export default function useUser() {
    //Token in the context
    const { token, setToken, userInfo, getInfoProfile } = useContext(UserContext);
    const [state, setState] = useState({ loading: false, error: false })

    const login = useCallback(({ username, password }, setStatus) => {
        setState({ loading: true, error: false })
        LoginService({ username, password })
            .then(jwt => {
                window.sessionStorage.setItem('token', jwt);
                setToken(jwt)
                setState({ loading: false, error: false })

            })
            .catch(error => {
                window.sessionStorage.removeItem('token');
                console.log("Error catch login: " + error);
                setStatus({ databaseError: 'Revisa los campos e intentalo de nuevo' })
                setState({ loading: false, error: true })
            })

    }, [setToken])

    //Log out function that removes the token from the session storage
    const logout = useCallback(() => {
        window.sessionStorage.removeItem('token');
        setToken(null);
    }, [setToken])

    const updateProfileInfo = () => {
        getInfoProfile();
    }

    return {
        isLogged: Boolean(token),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        userInfo,
        login,
        logout,
        updateProfileInfo
    }
}