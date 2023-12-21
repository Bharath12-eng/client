import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Menu from './screens/Menu'
import Login from './screens/Login'
import Register from './screens/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../GlobalContext'
// import { Homepage } from '../pages/Home/Homepage';
import { Edit } from '../pages/Edit/Edit';
// import Registerpage from '../pages/Register/Registerpage';
import Profile from '../pages/Profile/Profile';
import Pnf from '../utils/Pnf'
// import Employee from './screens/Employee'
// import EmployeeList from './screens/EmployeeList'
import AddEmployee from './screens/AddEmployee'
import '../App.css'
import { Homepage } from '../pages/Home/Home'
import Registerpage from '../pages/Register/Register'
import AddEmployees from './screens/addEmployees'
import EditEmployees from './screens/editEmployee'
import Qualification from './screens/qualifications'
import EmployeeParent from './screens/employeeParent'
import TabComponent from './screens/Parent'

function Pages() {
    // const state = useContext(GlobalContext);
    // const [isLogged] = state.userAPI.isLogged
    return (
        <Router>
            <Menu />
            <ToastContainer autoClose={5000} position={'top-right'} />
            <Routes>
                <Route path="/allemployee" element={<Homepage />} />
                {/* <Route exact path={"/"} element={ <Home /> } />
                <Route exact path={'/*'} element={<Pnf />} />
                <Route path="/register" element={<Registerpage />} />

                <Route path="/edit/:id" element={<Edit />} />
           
       
                
               <Route exact path={'/edit/:id'} element={<EditEmployees />}  /> */}
               <Route exact path={'/parent'}  element={<TabComponent />} />
               <Route path = {'/addEmployee'} element = {<EmployeeParent />}  />
               <Route path="/empProfile/:id" element={<Profile />} />
               
               {/* <Route exact path={'/qualification/:id'} element={<Qualification />} /> */}
            </Routes>
        </Router>
    )
}

export default Pages