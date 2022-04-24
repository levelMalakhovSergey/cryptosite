import React, {useContext} from 'react';
import {AuthContext} from "../context";
import Table from "../pages/Table";
import Login from "../pages/Login";
import {Routes, Route, Navigate } from "react-router-dom";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const auth = useSelector(store => store.auth)

    return (
    <Routes>

        {auth.isAuth}? <Route path='/table' element={<Table/>}/>
                : <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Login/>}/>

    </Routes>
    );
};

export default AppRouter;