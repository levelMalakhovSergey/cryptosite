import {useGoogleLogout} from "react-google-login";

import React, {useContext} from 'react';

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuth} from "../redux/Actions/actionCreator";

const clientId = "672938067510-hqkcsj6nllovs9c8l4m31lq38jm5fbl2.apps.googleusercontent.com";
const MyuseLogoutHook = () => {
    let navigate = useNavigate()
    const  dispatch = useDispatch()
    const onLogoutSuccess = (res) => {
        console.log("logout succes")
    }
    const onFailure = () => {console.log("handle failure cases")}
    const myLogout = () => {

        navigate('./login', { replace: true })
        dispatch(setAuth(false))
        localStorage.removeItem('auth')
        signOut()
    }
    const {signOut} = useGoogleLogout({
        clientId , onFailure, onLogoutSuccess
    })
    return (
        <button className='googleButton' onClick={ myLogout}>
            Sign Out
        </button>
    );
};

export default MyuseLogoutHook;