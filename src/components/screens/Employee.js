import React from 'react'
import { NavLink } from 'react-router-dom'
import Sidenav from '../Layout/Sidenav';
import Navbar from '../Layout/Navbar';



function Employee(props) {
    // console.log(props);
    const { emp_id, emp_name, emp_father_name, emp_mother_name, emp_present_address, emp_permanent_address, emp_email, emp_phone, emp_alt_phone, emp_blood_group, emp_gender, emp_age, emp_DOB, emp_accommodation, emp_education, emp_work_history, emp_UAN_no, emp_ESI_no, emp_contact_reference, emp_employment_reference, emp_family_bg, emp_language, emp_hobbies, emp_criminal_offense } = props;

    
    return (
        <div>
        <Sidenav />
        <Navbar />
        
                    <h6 className='text-center'> {emp_name} fgdfg</h6>
                    <h6 className='text-center'> {emp_father_name}dfgdfg </h6>
                    <h6 className='text-center'> {emp_education} dfgdfgfdg</h6>
                    <h6>{emp_work_history}</h6>
                    <h6>{emp_work_history}</h6>
                    <h6>{emp_work_history}</h6>
                    <h6>{emp_work_history}</h6>
                    <h6>{emp_work_history}</h6>
                    <h6>{emp_work_history}</h6>
                
        </div>
        
    )
}

export default Employee