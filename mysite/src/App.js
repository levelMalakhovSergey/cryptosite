
import React, {useEffect, useState} from "react";
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar";
import {useDispatch} from "react-redux";
import {setAuth} from "./redux/Actions/actionCreator";
function App() {
    const [gettingArrLength,setGettingArrLength] = useState(7)
    const dispatch = useDispatch()
    useEffect(() => {
        if (localStorage.getItem('auth'))
        {
            dispatch(setAuth(true))
        }
    },[])
  return (
          <BrowserRouter>
              <Navbar/>
              <AppRouter/>
          </BrowserRouter>
  );
}

export default App;
