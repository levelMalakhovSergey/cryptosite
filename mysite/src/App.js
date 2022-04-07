
import React, {useEffect, useState} from "react";
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/Navbar";
function App() {
    const [isAuth,setIsAuth] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('auth'))
        {
            setIsAuth(true)
        }
    },[])
  return (
      <AuthContext.Provider  value={{isAuth, setIsAuth}}>
          <BrowserRouter>
              <Navbar/>
              <AppRouter/>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
