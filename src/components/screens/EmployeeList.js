import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext';
import Sidenav from '../Layout/Sidenav'
import Navbar from '../Layout/Navbar'
import Employee from './Employee';


function EmployeeList() {
    const data = useContext(GlobalContext);
    const [employee] = data.employeeApi.employee;
    
    // console.log('employee', JSON.stringify(employee))
    return (
        <>
            <Navbar />
            <Sidenav />
            <div className="row">
                {
                    employee.map((item, index) => {
                        // console.log(`=`,item);
                        return (
                            <Employee key={index} {...item} />
                        )
                    })
                }
                
            </div>
        </>

    )
}

export default EmployeeList