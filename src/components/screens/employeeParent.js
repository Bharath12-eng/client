import React, { createContext, useState } from 'react'
import Qualification from './qualifications';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Crad from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEmployee, { employeeContext } from "./addEmployees"
import AddEmployees, { useMyContext } from './addEmployees';
import Wrapper from '../../wrapper/Wrapper';
import { Employeechild } from './addEmployees';
import './Employeeparent.css'
import { addEmployeedata, qualificationdata, singleEmployee, allemployee } from '../../API/EmpApi';
import { yellow } from '@mui/material/colors';

export const ParentContext = createContext();


const EmployeeParent = ({ AddDeatials, Qualificationdata, activeTab, resdata, setActiveTab, employee, tabCompletion }) => {

    // const { response, setresdata } = useMyContext();
    

    console.log("active data", activeTab)
    const [showmodals, setshowmodals] = useState(false)
    let EmployeeDatas = resdata;

    const [responsedata, setresponsedata] = useState(employee);
    const [forms, setForms] = useState([{ id: 1 }]);
    console.log("responsedata", employee)
    console.log("employeedatas", EmployeeDatas);

  

    const handleTabClick = (tabIndex) => {
        if (!tabCompletion[tabIndex - 1]) {
            return; // Return early if the previous tab is incomplete
        }
        setActiveTab(tabIndex);
    };
    const handleDuplicate = () => {
        const newForm = { id: forms.length + 1 };
        setForms([...forms, newForm]);
    };




    const showtabs = () => {

        if (activeTab === 0 && EmployeeDatas.data.savedata.step === "qualifications") {
            setActiveTab(activeTab + 1);

            console.log("qualification data")

        } else if (activeTab === 2 && EmployeeDatas.data.savedata.step === "workhistory") {
            setActiveTab(activeTab + 1)
        } else if (activeTab === 3 && EmployeeDatas.data.savedata.step === "otherDetails") {
            setActiveTab(activeTab + 1)
        } else {
            // setActiveTab(<AddEmployees showtabs={showtabs} />)
        }
    }



    return (
        <>
        <Wrapper>
            <ParentContext.Provider value={{showtabs}} >
                <div className='container'>

             <div className="row">
                 <div className="col-md-12">
                                <h2 className='text-center mt-1'>Add Employee Details</h2>


                    <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="home-tab-pane"
                                aria-selected={activeTab === 0}
                                onClick={() => handleTabClick(0)}
                                tabname="Personal Details"
                            >
                                Personal Details
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected={activeTab === 1}
                                // disabled={!tabCompletion[0]} // Disable the button until the first tab is completed
                                onClick={() => handleTabClick(1)}
                                tabname="qualification"
                            >
                                Qualification
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                                id="contact-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#contact-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="contact-tab-pane"
                                aria-selected={activeTab === 2}
                                // disabled={!tabCompletion[1]} // Disable the button until the second tab is completed
                                onClick={() => handleTabClick(2)}
                                tabname="Workhistory"
                            >
                                Work History
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
                                id="disabled-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#disabled-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="disabled-tab-pane"
                                aria-selected={activeTab === 3}
                                // disabled={!tabCompletion[2]}
                                tabname="other Deatils"
                            // Disable the button until the third tab is completed
                            >
                                Other Details
                            </button>
                        </li>
                    </ul>


                    <div className="tab-content" id="myTabContent">
                        <div
                            className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`}
                            id="home-tab-pane"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                            tabIndex="0"
                        >
                            {activeTab === 0 && <h1></h1>}
                            <div
                                className={`tab-pane ${activeTab === 0 ? 'fade show active' : ''}`}
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                                tabIndex="0"
                            >


                        <AddEmployees
                        // showtabs={showtabs}
                         />
                            </div>


                        </div>

                        <div
                            className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`}
                            id="profile-tab-pane"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                            tabIndex="0"
                        >
                            {activeTab === 1 && <h4></h4>}

                            <div className={`tab-pane ${activeTab === 1 && showtabs() ? 'fade show active' : ''}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="1">
                                {/* <table className="table table-responsive table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className='text-center'>Examination Passed</th>
                                                        <th scope="col" className='text-center'>University</th>
                                                        <th scope="col" className='text-center'>Year Of Passing</th>
                                                        <th scope="col" className='text-center'>Percentage of Marks</th>
                                                        <th><button className="btn btn-outline-success" onClick={addTableRowsQuali} > + </button></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <TableRowsQuali onChange={onValueChange} employeedata={employee} rowsData={rowsDataQuali} deleteTableRows={deleteTableRowsQuali} handleChange={handleChangeQuali} />
                                                </tbody>
                                            </table> */}

                                <Qualification
                                activeTab = {activeTab}
                                 />

                            </div>
                        </div>


                        <div
                            className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`}
                            id="contact-tab-pane"
                            role="tabpanel"
                            aria-labelledby="contact-tab"
                            tabIndex="0"
                        >
                            {activeTab === 2 && <h4></h4>}

                            <div className={`tab-pane ${activeTab === 2 ? 'fade show active' : ''}`} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="2">
                                <p>My data 3</p>
                                <button className='btn btn-success' onClick={handleDuplicate}>Add More</button>
                            </div>
                        </div>



                        <div
                            className={`tab-pane fade ${activeTab === 3 ? 'show active' : ''}`}
                            id="disabled-tab-pane"
                            role="tabpanel"
                            aria-labelledby="disabled-tab"
                            tabIndex="0"
                        >
                            {activeTab === 3 && <h4></h4>}

                            <div className={`tab-pane ${activeTab === 3 ? 'fade show active' : ''}`} id="pills-Other" role="tabpanel" aria-labelledby="pills-Other-tab" tabIndex="3">
                                <p>Other Data</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            </ParentContext.Provider>
            </Wrapper>
            {
                showmodals && <AddEmployees
                                showtabs={showtabs}
                />
            }


        </>
    )
}




export default EmployeeParent;