import React, { useState, useEffect } from 'react'
import axios from 'axios'


function EmployeeApi() {
    const [employee, setEmployee] = useState([])

    const getEmployee = async () => {
        const res = await axios.get(`/api/employee`);
        // console.log(`employees = `, JSON.stringify(res));
        
        setEmployee(res.data.employee);
    }

    useEffect(() => {
        getEmployee();
    }, [])

    return {
        employee: [employee, setEmployee]
    }
}

export default EmployeeApi