import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext';
// import EmployeeCore from './EmployeeCore';
import Sidenav from '../Layout/Sidenav'
import Navbar from '../Layout/Navbar'
import Employee from './Employee';




function EmployeeCore() {
    const data = useContext(GlobalContext);
    const [employee] = data.employeeAPI.employee;


    return (
        <>
            <Navbar />
            <Sidenav />
            <div className="row">
                {
                    employee.map((item, index) => {
                        return <Employee key={index} {...item} />
                    })
                }
               
            </div>

        </>

    )
}

export default EmployeeCore