import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import MyuseLogoutHook from "../../hooks/MyuseLogoutHook";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../redux/Actions/actionCreator";


const Navbar = () => {
    const auth = useSelector(store=> store.auth)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const logout = () => {
    dispatch(setAuth(false))
        if (localStorage.getItem('auth'))
        {
            localStorage.removeItem('auth')
        }
    }
    return (

            auth.isAuth &&
                <div className="navbar">
                <Button onClick={() => logout()}>Exit Account</Button>
                <MyuseLogoutHook/>
                </div>
    );
};

export default Navbar;