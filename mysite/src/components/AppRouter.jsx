import React, {useContext} from 'react';
import {AuthContext} from "../context";
import Table from "../pages/Table";
import Login from "../pages/Login";
import {Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import AppWs from "./AppWs";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)

    return (
    <Routes>

        {isAuth}? <Route path='/table' element={<Table/>}/>
                : <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Login/>}/>

    </Routes>
    );
};

export default AppRouter;