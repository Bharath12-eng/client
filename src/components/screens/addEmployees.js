import React, { createContext, useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Wrapper from '../../wrapper/Wrapper';
import Button from 'react-bootstrap/Button';
import Crad from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import "./addemployee.css"

import TableRows from './TableRows';
import TableRowsQuali from './TableRowsQuali';
import { useState, useEffect } from 'react';
import { addEmployeedata, qualificationdata, singleEmployee, allemployee } from '../../API/EmpApi';
import Qualification from './qualifications';

import { Link } from 'react-router-dom';
import EmployeeParent, { ParentContext } from './employeeParent';
// import Employeeparent from './allemployese';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Validation } from './validations';
import { useForm, useform } from 'react-hook-form'

const employeContext = createContext();

const Employeechild = createContext();


export const useMyContext = () => {
    return useContext(employeContext);
};



const initialState = {


    firstName: "",
    lastName: "",
    email: "",
    bloodGroup: "",
    countryCode: "",
    phone: "",
    altPhone: "",
    DOB: "",
    maritalStatus: "",
    languages: "",
    accommodation: "",
    gender: "",

    permanentAddress: {
        country: "",
        doorNo: "",
        locality: "",
        city: "",
        state: "",
        pincode: ""
    },

    contactAddress: {
        country: "",
        doorNo: "",
        locality: "",
        city: "",
        state: "",
        pincode: ""
    }
    // qualification:{
    //     examination_Passed:"",
    //     university:"",
    //     year_of_passing:"",
    //     percentage:""
    // }






}


const AddEmployees = ({ paydata, onValueChanges, qualificaction, showtabs }) => {
    const EmployeeContexts = useContext(ParentContext)

    console.log("mycontext", EmployeeContexts);
    const myStyles = {
        marginTop: '3%'
    };

    const [employee, setemployee] = useState(initialState);
    const [isEmployeeParentHidden, setIsEmployeeParentHidden] = useState(false);
    const [value, setvalue] = useState(initialState)
    const [form, setform] = useState({})
    const [resdata, setresdata] = useState(null)
    const [submits, setsubmits] = useState(false)


    const [activeTab, setActiveTab] = useState(0);
    const [tab, settab] = useState(1)
    const [tabCompletion, setTabCompletion] = useState([false, false, false, false]);


    const [rowsDataQuali, setRowsDataQuali] = useState([]);
    const [forms, setForms] = useState([{ id: 1 }]);
    const [allemp, setallemp] = useState([])

    const [showdata, setshowdata] = useState(false);
    const [errors, seterrors] = useState({})


    console.log("myemp", employee)

    const navigate = useNavigate();
    useEffect(() => {



        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        console.log("Response data ", resdata)

        // Loop over them and prevent submission
        Array.from(forms).forEach((form) => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, true);
        });
        console.log("myerrors", errors)
        if (Object.keys(errors).length === 0 && submits) {
            console.log(employee)
        }
        // return ()=>{
        //     showtabs();
        // }
        if (typeof showtabs === 'function') {
            showtabs();
        }

        // showtabs();

    }, [errors, resdata, showtabs]);

    const handleDuplicate = () => {
        const newForm = { id: forms.length + 1 };
        setForms([...forms, newForm]);
    };




    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        // For nested properties, split the name into nested keys
        const nestedKeys = name.split(".");
        let updatedEmployee = { ...employee };

        // Traverse the nestedKeys and update the corresponding property value
        let currentProperty = updatedEmployee;
        for (let i = 0; i < nestedKeys.length; i++) {
            const key = nestedKeys[i];
            if (i === nestedKeys.length - 1) {
                currentProperty[key] = value; // Update the leaf property value
            } else {
                currentProperty = currentProperty[key]; // Traverse to the next nested property
            }
        }

        // setEmployee(updatedEmployee);
        // console.log("Set",setEmployee)
    };

    const onValueChange = (e) => {

        setemployee({ ...employee, [e.target.name]: e.target.value });
        if (!!errors[e.target.name]) {
            seterrors({
                ...errors,
                [e.target.value]: null
            })
        }
        console.log("emp", employee)
    }

    const createaddPayload = (data) => {
        console.log(data);


        var payload = {
            personalDetails: {

                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                bloodGroup: data.bloodGroup,
                countryCode: data.countryCode,
                phone: data.phone,
                altPhone: data.altPhone,
                DOB: data.DOB,
                maritalStatus: data.maritalStatus,
                languages: data.languages,
                accommodation: data.accommodation,
                gender: data.gender,
                permanentAddress: {
                    country: data.country,
                    doorNo: data.doorNo,
                    locality: data.locality,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode
                },
                contactAddress: {
                    country: data.concountry,
                    doorNo: data.doorNo,
                    locality: data.locality,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode
                }
                //     qualification:{
                //         examination_Passed:data.examination_Passed,
                //         university:data.university,
                //         year_of_passing:data.year_of_passing,
                //         percentage:data.percentage

                // }
            }

        }
        return payload

    }

    const addTableRowsQuali = () => {

        const rowsInput = {
            Examination: '',
            University: '',
            Year: '',
            Percentage: ''
        }
        setRowsDataQuali([...rowsDataQuali, rowsInput])

    }
    const deleteTableRowsQuali = (index) => {
        const rows = [...rowsDataQuali];
        rows.splice(index, 1);
        setRowsDataQuali(rows);
    }

    const handleChangeQuali = (index, evnt) => {

        const { name, value } = evnt.target;
        const rowsInput = [...rowsDataQuali];
        rowsInput[index][name] = value;
        setRowsDataQuali(rowsInput);
    }




    const handleTabClick = (tabIndex) => {
        if (!tabCompletion[tabIndex - 1]) {
            return; // Return early if the previous tab is incomplete
        }
        setActiveTab(tabIndex);
    };

    const handleSaveAndContinue = async () => {
        // Add your logic here to save the current tab data and proceed to the next tab
        Qualificationdata();
        // showtabs();
        console.log('Save and Continue clicked!');





        const updatedTabCompletion = [...tabCompletion];
        updatedTabCompletion[activeTab] = true;
        setTabCompletion(updatedTabCompletion);
        if (activeTab < 3) {

            setActiveTab(activeTab + 1);
        }




        // const qualitydata = await singleEmployee(id);
    };

    const handleGoBack = () => {
        // Add your logic here to go back to the previous tab
        console.log('Go Back clicked!');
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };
    let response;

    const AddDeatials = async (e,handleResponse) => {
        e.preventDefault();
        console.log("myuser", employee)

        seterrors(Validate(employee))
        setsubmits(true)

        var payload = createaddPayload(employee);
        // const payload = {"personalDetails":employee}
        console.log("mypay", payload)
        response = await addEmployeedata(payload);
        toast.success("Personal-Deatails added Sucessfully", { position: toast.POSITION.TOP_CENTER, theme: "colored", autoClose: 3000 })
        setresdata(response);
        handleResponse(response)
        setIsEmployeeParentHidden(true);
        showtabs();
        console.log("myshops",showtabs)

        console.log("myemployee", response);

        // setActiveTab(activeTab + 1)

        //    console.log("shows", showtabs)

        // if(response.data.savedata.step=="qualificactions"){
        //    navigate(activeTab==1)
        // }
        // else if(response.data.savedata.step=="workhistory"){
        //     navigate(activeTab==2)
        // }else if(response.data.savedata.step=="otherDetails"){
        //     navigate(activeTab==3)
        // }

        //     const employeesdata = await addEmployeedata();
        //    console.log("response",employeesdata)

        // navigate(`/allemployee`)
        // navigate("/allemployee")
        // showtabs();
        // setActiveTab(activeTab+1)

        //    return <EmployeeParent />
    }


    console.log("formvalues", employee)
    const Validate = (values) => {
        let formerrors = {};
        if (!values.firstName) {
            formerrors.firstName = "First Name is Required"
        }
        if (!values.lastName) {
            formerrors.lastName = "Laste Name is Required"
        }

        if (!values.email) {
            formerrors.email = "Email is Required"
        }

        if (!values.bloodGroup) {
            formerrors.bloodGroup = "Blood Group is Required"
        }

        if (!values.countryCode) {
            formerrors.countryCode = "Country Code is Required"
        }

        if (!values.phone) {
            formerrors.phone = "Phone Number is required"
        }

        if (!values.altPhone) {
            formerrors.altPhone = "Alternate Number is Reaquired"
        }

        if (!values.DOB) {
            formerrors.DOB = "Date of Birth is Required"
        }

        if (!values.maritalStatus) {
            formerrors.maritalStatus = "Marital Status is Required"
        }

        if (!values.languages) {
            formerrors.languages = "Language is Required"
        }

        if (!values.accommodation) {
            formerrors.accommodation = "Accommodation is Required"
        }

        if (!values.gender) {
            formerrors.gender = "Gender is Required"
        }

        if (!values.country) {
            formerrors.country = "Country is Required"
        }

        if (!values.doorNo) {
            formerrors.doorNo = "Door No is Required"
        }
        if (!values.locality) {
            formerrors.locality = "Locality is Required"
        }


        if (!values.city) {
            formerrors.city = "City is Required"
        }


        if (!values.state) {
            formerrors.state = "State is Required"
        }



        if (!values.pincode) {
            formerrors.pincode = "Pincode is Required"
        }


        if (!values.country) {
            formerrors.country = "Country is Required"
        }

        if (!values.doorNo) {
            formerrors.doorNo = "Door No is Required"
        }
        if (!values.locality) {
            formerrors.locality = "Locality is Required"
        }


        if (!values.city) {
            formerrors.city = "City is Required"
        }


        if (!values.state) {
            formerrors.state = "State is Required"
        }



        if (!values.pincode) {
            formerrors.pincode = "Pincode is Required"
        }







        return formerrors
    }

    console.log("resdata", response)


    // const showtabs = () =>{

    //     if(activeTab===0  && response.data.savedata.step==="qualifications"){
    //         setActiveTab(activeTab + 1);

    //       console.log("qualification data")

    //     }else if(activeTab===2 && response.data.savedata.step=="workhistory"){
    //       setActiveTab(activeTab+1)
    //     }else if(activeTab===3 && response.data.savedata.step=="otherDetails"){
    //        setActiveTab(activeTab+1)
    //     }
    // }


    const Qualificationdata = async (response) => {

        let id = response.data.savedata._id;

        let paydatas = paydata(qualificaction);
        console.log("qualitydata", paydatas)
        let qualificactions = await qualificationdata(id);
        console.log("employee-qualifications", qualificactions)
    }






    return (
        <>

            <div className='container'>

                <div className="row">
                    <div className="col-md-12">
                        <form className="needs-validation" noValidate>
                            <div className="row mb-2 mt-5">
                                <div className="col-md-4">
                                    <label htmlFor="firstName" className="form-label form-datas">First Name<span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="firstName" value={employee.firstName} id="firstName" className="form-control" isInvalid={!!errors.firstName} required />

                                    <div class="invalid-feedback">
                                        Please enter a name.
                                    </div>
                                    <p className='errormsg'>{errors.firstName}</p>


                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="last name" className="form-label form-datas">Last Name<span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="lastName" value={employee.lastName} id="LastName" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter a name.
                                    </div>
                                    <p className='errormsg'>{errors.lastName}</p>

                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label form-datas">Email Address<span className='Required-data'>*</span></label>
                                    <input type="email" onChange={(e) => onValueChange(e)} name="email" value={employee.email} id="Email" className="form-control"
                                        required />

                                    <div class="invalid-feedback">
                                        Please enter an Email-Id.
                                    </div>

                                    <p className='errormsg'>{errors.email}</p>
                                </div>

                            </div>


                            <div className="row mb-2 mt-2" style={myStyles}>
                                <div className="col-md-4">
                                    <label htmlFor="Blood" className="form-label form-datas">Blood Group<span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="bloodGroup" value={employee.bloodGroup} id="BloodGroup" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter your blood group.
                                    </div>
                                    <p className='errormsg'>{errors.bloodGroup}</p>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label form-datas">Country Code<span className='Required-data'>*</span></label>
                                    <input type="tel" name="countryCode" onChange={(e) => onValueChange(e)} value={employee.countryCode} id="Phone" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the Country code.
                                    </div>

                                    <p className='errormsg'>{errors.countryCode}</p>
                                </div>


                                <div className="col-md-4">
                                    <label htmlFor="phone" className="form-label form-datas">Contact no<span className='Required-data'>*</span></label>
                                    <input type="tel" name="phone" onChange={(e) => onValueChange(e)} id="Phone" value={employee.phone} className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter your phone no.
                                    </div>

                                    <p className='errormsg'>{errors.phone}</p>
                                </div>


                            </div>

                            <div className="row mb-2" style={myStyles}>
                                <div className="col-md-4">
                                    <label htmlFor="altno" className="form-label form-datas">Alternate no <span className='Required-data'>*</span></label>
                                    <input type="tel" name="altPhone" onChange={(e) => onValueChange(e)} value={employee.altPhone} id="AltPhone" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter your alternate phone no.
                                    </div>
                                    <p className='errormsg'>{errors.altPhone}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="DOB" className="form-label form-datas">Date of Birth<span className='Required-data'>*</span></label>
                                    <input type="date" name="DOB" onChange={(e) => onValueChange(e)} value={employee.DOB} id="DOB" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter your DOB.
                                    </div>
                                    <p className='errormsg'>{errors.DOB}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="maritalStatus" className="form-label form-datas">Marital Status<span className='Required-data'>*</span></label>
                                    <select className="form-select" aria-label="Default select example" name="maritalStatus" onChange={(e) => onValueChange(e)} value={employee.maritalStatus} id="MaritalStatus" required >
                                        <option selected hidden disabled value="">Select an option</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                        <option value="separated">Separated</option>
                                    </select>

                                    <div class="invalid-feedback">
                                        Please select an option.
                                    </div>
                                    <p className='errormsg'>{errors.maritalStatus}</p>
                                </div>

                            </div>
                            <div className="row mb-4" style={myStyles}>
                                <div className="col-md-4">
                                    <label htmlFor="languages" className="form-label form-datas">Languages Known <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="languages" value={employee.languages} id="Languages" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the languages.
                                    </div>
                                    <p className='errormsg'>{errors.languages}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="accommodation" className="form-label form-datas">Accommodation <span className='Required-data'>*</span></label>
                                    <select className="form-select" aria-label="Default select example" required name='accommodation' onChange={(e) => onValueChange(e)} value={employee.accommodation} id='Accommodation'>
                                        <option selected hidden disabled value="">Select an option</option>
                                        <option value="rental">Rental</option>
                                        <option value="paying guest">Paying Guest</option>
                                        <option value="own">Own</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <div class="invalid-feedback">
                                        Please select an option.
                                    </div>
                                    <p className='errormsg'>{errors.accommodation}</p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="gender" className="form-label form-datas">Gender <span className='Required-data'>*</span></label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => onValueChange(e)} required name='gender' value={employee.gender} id='Gender'>
                                        <option selected hidden disabled value="">Select an option</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="trans">Trans</option>
                                        <option value="intersex">Intersex</option>
                                        <option value="do not disclose">Do not disclose</option>
                                    </select>

                                    <div class="invalid-feedback">
                                        Please select an option.
                                    </div>
                                    <p className='errormsg'>{errors.gender}</p>
                                </div>


                            </div>
                            <div className="row mb-2" style={myStyles}>
                                <div className="row " style={myStyles}>
                                    <h5>Permanent Address</h5>
                                    <div className="col-md-2">
                                        <label htmlFor="country" className="form-label form-datas">Country <span className='Required-data'>*</span></label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="country" value={employee.country} id="PermanentState" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the state.
                                        </div>
                                        <p className='errormsg'>{errors.country}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="doorNo" className="form-label form-datas">House no <span className='Required-data'>*</span></label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="doorNo" value={employee.doorNo} id="PermanentHouseNo" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the details.
                                        </div>
                                        <p className='errormsg'>{errors.doorNo}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="locality" className="form-label form-datas">Locality <span className='Required-data'>*</span></label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="locality" value={employee.locality} id="PermanentRoadLocality" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the details.
                                        </div>
                                        <p className='errormsg'>{errors.locality}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="city" className="form-label form-datas">City <span className='Required-data'>*</span></label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="city" value={employee.city} id="PermanentCity" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the city.
                                        </div>
                                        <p className='errormsg'>{errors.city}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="state" className="form-label form-datas">State <span className='Required-data'>*</span></label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="state" value={employee.state} id="PermanentState" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the state.
                                        </div>
                                        <p className='errormsg'>{errors.state}</p>
                                    </div>

                                    <div className="col-md-2">
                                        <label htmlFor="pincode" className="form-label form-datas">PinCode <span className='Required-data'>*</span></label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="pincode" value={employee.pincode} id="PermanentPinCode" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the pincode.
                                        </div>
                                        <p className='errormsg'>{errors.pincode}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2" style={myStyles}>
                                <h5>Current Address</h5>
                                <div className="col-md-2">
                                    <label htmlFor="concountry" className="form-label form-datas">Country <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="concountry" value={employee.concountry} id="CurrentState" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the Country.
                                    </div>
                                    <p className='errormsg'>{errors.country}</p>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="condoorNo" className="form-label form-datas">House no <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="condoorNo" value={employee.condoorNo} id="CurrentHouseNo" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the details.
                                    </div>
                                    <p className='errormsg'>{errors.doorNo}</p>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="conlocality" className="form-label form-datas">Locality <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="conlocality" value={employee.conlocality} id="CurrentRoadLocality" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the details.
                                    </div>
                                    <p className='errormsg'>{errors.locality}</p>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="concity" className="form-label form-datas">City <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="concity" value={employee.concity} id="CurrentCity" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the city.
                                    </div>
                                    <p className='errormsg'>{errors.city}</p>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="constate" className="form-label form-datas">State <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="constate" value={employee.constate} id="CurrentState" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the state.
                                    </div>
                                    <p className='errormsg'>{errors.state}</p>
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor="conpincode" className="form-label form-datas">PinCode <span className='Required-data'>*</span></label>
                                    <input type="text" onChange={(e) => onValueChange(e)} name="conpincode" value={employee.conpincode} id="CurrentPinCode" className="form-control" required />

                                    <div class="invalid-feedback">
                                        Please enter the pincode.
                                    </div>
                                    <p className='errormsg'>{errors.pincode}</p>
                                </div>
                            </div>

                            <div className="form-group mt-3 sub-data">
                                <input type='submit' onClick={(e) => AddDeatials(e)} value='Submit' className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
                <EmployeeParent />
                <Employeechild.Provider value={resdata}>
                {isEmployeeParentHidden && <EmployeeParent response={resdata} />}
                </Employeechild.Provider>
            </div>
            
            {
                showdata && <EmployeeParent 
                            AddDeatials = {AddDeatials}
                            Qualificationdata = {Qualificationdata}
                            activeTab={activeTab}
                            employee={employee}
                            setActiveTab={setActiveTab}
                            response={response}
                            handleTabClick={handleTabClick()}
                            tabCompletion={tabCompletion}
                            
                            />

            }
        </>

    )
}

export default AddEmployees;
export {Employeechild}