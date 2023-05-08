import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Menu from './screens/Menu'
import Login from './screens/Login'
import Register from './screens/Register'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContext } from '../GlobalContext'
import Pnf from '../utils/Pnf'
import Employee from './screens/Employee'

function Pages() {
    const state = useContext(GlobalContext);
    // const [isLogged] = state.userAPI.isLogged
    return (
        <Router>
            <Menu />
            <ToastContainer autoClose={5000} position={'top-right'} />
            <Routes>
                <Route exact path={"/"} element={ <Home /> } />
                <Route exact path={"/login"} element={ <Login />} />
                <Route exact path={"/register"} element={ <Register />} />
                <Route exact path={'/*'} element={<Pnf />} />
                <Route exact path={'/home'} element={<Home/>} />
                <Route exact path={'/employee'} element={<Employee/>} />
            </Routes>
        </Router>
    )
}

export default Pages