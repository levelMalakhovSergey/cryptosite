import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import MyuseLogoutHook from "../../hooks/MyuseLogoutHook";
import {AuthContext} from "../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    let navigate = useNavigate()
    const logout = () => {
    setIsAuth(false)
        if (localStorage.getItem('auth'))
        {
            localStorage.removeItem('auth')
        }
    }
    return (

            isAuth &&
                <div className="navbar">
                <Button onClick={() => logout()}>Exit Account</Button>
                <MyuseLogoutHook/>
                </div>
    );
};

export default Navbar;