import React from 'react'
import Sidenav from '../Layout/Sidenav';
import Navbar from '../Layout/Navbar';


function Employee(props) {
    // console.log(props.emp_name);
    const { emp_id, emp_name, emp_father_name, emp_mother_name, emp_present_address, emp_permanent_address, emp_email, emp_phone, emp_alt_phone, emp_blood_group, emp_gender, emp_age, emp_DOB, emp_accommodation, emp_education, emp_work_history, emp_UAN_no, emp_ESI_no, emp_contact_reference, emp_employment_reference, emp_family_bg, emp_language, emp_hobbies, emp_criminal_offense } = props;

    // console.log(props.emp_name)
    // console.log("data", JSON.stringify(props))
    // console.log(props.name)
    
    return (
        <div>
        
        <Sidenav />
        <Navbar />
        <div className="container">
        <div className="col-md-4 mt-2 mb-2">
            <div className="card">
                <h1 className='text-center'>Emp Id:{emp_id}</h1>
                <h2 className='text-center'>Name:{emp_name}</h2>
                <h3 className='text-center'>Email:{emp_email}</h3>
                <h4 className='text-center'>Phone:{emp_phone}</h4>
                <h5 className='text-center'>Age:{emp_age}</h5>
                <h6 className='text-center'>Blood Group:{Employee.emp_education}</h6>
            </div>
        </div>
        </div>
        </div>
        
    )
}

export default Employee