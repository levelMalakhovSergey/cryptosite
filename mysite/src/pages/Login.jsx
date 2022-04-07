
import React, {useContext} from 'react';
import {AuthContext} from "../context";
import GoogleLogin from "react-google-login";
import {refreshTokenSetup} from "../utils/refreshTokenSetup";
import {Navigate, useNavigate} from "react-router-dom";



const clientId = "672938067510-hqkcsj6nllovs9c8l4m31lq38jm5fbl2.apps.googleusercontent.com"

const Login = () => {
    const navigate = useNavigate()
    const onSuccess = (res) => {
        console.log("current User  " + res)
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        refreshTokenSetup(res)
        navigate("/table", { replace: true })
    }
    const onFailure = (res) => {

        console.log("Failure " + res)
    }
    const {setIsAuth} = useContext(AuthContext)
    return (

        <div style={{width: "800px", margin: "0 auto"}}>
            <div style={{display: 'flex', justifyContent: "center", alignItems:'center', margin: "0 auto"}}>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{marginTop: '100px'}}
                    isSignedIn={true}
                />
            </div>
        </div>
    );
};

export default Login;