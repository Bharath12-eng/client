import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Layout/Navbar'
import Sidenav from '../components/Layout/Sidenav'


// const URL = "http://localhost:5400/api/employee"

function EmployeeApi() {
    const [employee, setEmployee] = useState([])

    const getEmployee = async () =>{
        const res = await axios.get(`api/employee`);
        // console.log('employee=', res.data);
        setEmployee(res.data.employee)
    }

    useEffect(() => {
        getEmployee();
    },[])

    return {
        employee: [employee, setEmployee]
    } 
}

export default EmployeeApi 