
import React, {useEffect, useState} from "react";
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar";
function App() {
    const [isAuth,setIsAuth] = useState(false)
    const [gettingArrLength,setGettingArrLength] = useState(7)
    useEffect(() => {
        if (localStorage.getItem('auth'))
        {
            setIsAuth(true)
        }
    },[])
  return (
      <AuthContext.Provider  value={{isAuth, setIsAuth,gettingArrLength,setGettingArrLength}}>
          <BrowserRouter>
              <Navbar/>
              <AppRouter/>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
