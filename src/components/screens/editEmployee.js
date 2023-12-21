import React from 'react'
import Card from 'react-bootstrap/Card'
import Wrapper from '../../wrapper/Wrapper';
import Button from 'react-bootstrap/Button';
import Crad from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row"
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';
import { useNavigate,useParams } from 'react-router-dom';
import TableRows from './TableRows';
import { useState,useEffect } from 'react';
import { addEmployeedata } from '../../API/EmpApi';
import { singleEmployee } from '../../API/EmpApi';


const initialState = {

    personalDetails: {
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
        permanentAddress: [
            {
                country: "",
                doorNo: "",
                locality: "",
                city: "",
                state: "",
                pincode: ""

            }
        ],
        contactAddress: [
            {
                concountry: "",
                condoorNo: "",
                conlocality: "",
                concity: "",
                constate: "",
                conpincode: ""

            }
        ]
    },
};


const EditEmployees = () => {
    const myStyles = {
        marginTop: '3%'
      };

    const [employee, setemployee] = useState(initialState);
    console.log("myemp", employee)
    const navigate = useNavigate();
    const { id} = useParams();

    useEffect(()=>{
        loadDetails();
    },[]);

    const loadDetails = async() =>{
        let response = await singleEmployee(id);
        setemployee(response.data)
    }

    const onValueChange = (e) => {
        setemployee({ ...employee, [e.target.name]: e.target.value });
        console.log("emp", employee)
    }

    

    const AddDeatials = async (e) => {
        e.preventDefault();
        await addEmployeedata(employee);
        navigate(`/allemployee`)
    }
    return (
        <>
            <Wrapper>
                <div className='container'>

                    <div className="row">
                        <div className="col-md-12">
                            <h2 className='text-center mt-1'>Edit Employee Details</h2>
                       

                            <form className="needs-validation" noValidate>
                                <div className="row mb-2 mt-5">
                                    <div className="col-md-4">
                                        <label htmlFor="FirstName" className="form-label">First Name</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.firstName" value={employee.firstName} id="FirstName" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter a name.
                                        </div>

                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="last name" className="form-label">Last Name</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.lastName" value={employee.lastName}id="LastName" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter a name.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" onChange={(e) => onValueChange(e)} name="personalDetails.email" value={employee.email} id="Email" className="form-control"
                                            required />

                                        <div class="invalid-feedback">
                                            Please enter an Email-Id.
                                        </div>
                                    </div>

                                </div>


                                <div className="row mb-2 mt-2" style={myStyles}>
                                    <div className="col-md-4">
                                        <label htmlFor="Blood" className="form-label">Blood Group</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.bloodGroup" value={employee.bloodGroup} id="BloodGroup" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter your blood group.
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="phone" className="form-label">Country Code</label>
                                        <input type="tel" name="personalDetails.countryCode" value={employee.countryCode} id="Phone" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the Country code.
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <label htmlFor="phone" className="form-label">Contact no.</label>
                                        <input type="tel" name="personalDetails.phone" id="Phone" value={employee.phone}className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter your phone no.
                                        </div>
                                    </div>


                                </div>
                                
                                <div className="row mb-2" style={myStyles}>
                                    <div className="col-md-4">
                                        <label htmlFor="altno" className="form-label">Alternate no.</label>
                                        <input type="tel" name="personalDetails.altPhone" value={employee.altPhone} id="AltPhone" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter your alternate phone no.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="age" className="form-label">Date of Birth</label>
                                        <input type="date" name="personalDetails.DOB" value={employee.DOB} id="DOB" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter your DOB.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="age" className="form-label">Marital Status</label>
                                        <select className="form-select" aria-label="Default select example" name="personalDetails.maritalStatus" value={employee.maritalStatus} id="MaritalStatus" required >
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
                                    </div>

                                </div>
                                <div className="row mb-4" style={myStyles}>
                                    <div className="col-md-4">
                                        <label htmlFor="age" className="form-label">Languages Known</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.languages" value={employee.languages} id="Languages" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the languages.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="age" className="form-label">Accommodation</label>
                                        <select className="form-select" aria-label="Default select example" required name='personalDetails.accomadation' value={employee.accommodation} id='Accommodation'>
                                            <option selected hidden disabled value="">Select an option</option>
                                            <option value="rental">Rental</option>
                                            <option value="paying guest">Paying Guest</option>
                                            <option value="own">Own</option>
                                            <option value="other">Other</option>
                                        </select>

                                        <div class="invalid-feedback">
                                            Please select an option.
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="age" className="form-label">Gender</label>
                                        <select className="form-select" aria-label="Default select example" onChange={(e) => onValueChange(e)} required name='personalDetails.gender' value={employee.gender} id='Gender'>
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
                                    </div>


                                </div>
                                <div className="row mb-2" style={myStyles}>
                                    <div className="row " style={myStyles}>
                                        <h5>Permanent Address</h5>
                                        <div className="col-md-2">
                                            <label htmlFor="Address" className="form-label">Country</label>
                                            <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.permanentAddress.country"  value={employee.country}id="PermanentState" className="form-control" required />

                                            <div class="invalid-feedback">
                                                Please enter the state.
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="Address" className="form-label">House no.</label>
                                            <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.permanentAddress.doorNo"  value={employee.doorNo}id="PermanentHouseNo" className="form-control" required />

                                            <div class="invalid-feedback">
                                                Please enter the details.
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="Address" className="form-label">Locality/Landmark</label>
                                            <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.permanentAddress.locality" value={employee.locality} id="PermanentRoadLocality" className="form-control" required />

                                            <div class="invalid-feedback">
                                                Please enter the details.
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="Address" className="form-label">City</label>
                                            <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.permanentAddress.city" value={employee.city} id="PermanentCity" className="form-control" required />

                                            <div class="invalid-feedback">
                                                Please enter the city.
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="Address" className="form-label">State</label>
                                            <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.permanentAddress.state"  value={employee.state}id="PermanentState" className="form-control" required />

                                            <div class="invalid-feedback">
                                                Please enter the state.
                                            </div>
                                        </div>
                                       
                                        <div className="col-md-2">
                                            <label htmlFor="Address" className="form-label">PinCode</label>
                                            <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.permanentAddress.pincode" value={employee.pincode}id="PermanentPinCode" className="form-control" required />

                                            <div class="invalid-feedback">
                                                Please enter the pincode.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2"  style={myStyles}>
                                    <h5>Current Address</h5>
                                    <div className="col-md-2">
                                        <label htmlFor="Address" className="form-label">Country</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.contactAddress.concountry" value={employee.concountry}id="CurrentState" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the Country.
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="Address" className="form-label">House no.</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.contactAddress.condoorNo" value={employee.condoorNo}id="CurrentHouseNo" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the details.
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="Address" className="form-label">Locality/Landmark</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.contactAddress.conlocality" value={employee.conlocality} id="CurrentRoadLocality" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the details.
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="Address" className="form-label">City</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.contactAddress.concity" value={employee.concity} id="CurrentCity" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the city.
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="Address" className="form-label">State</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.contactAddress.constate"  value={employee.constate}id="CurrentState" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the state.
                                        </div>
                                    </div>
                                   
                                    <div className="col-md-2">
                                        <label htmlFor="Address" className="form-label">PinCode</label>
                                        <input type="text" onChange={(e) => onValueChange(e)} name="personalDetails.contactAddress.conpincode" value={employee.conpincode} id="CurrentPinCode" className="form-control" required />

                                        <div class="invalid-feedback">
                                            Please enter the pincode.
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-2">
                                    <input type='submit' onClick={(e) => AddDeatials(e)} value='Submit' className="btn btn-success" />
                                </div>
                            </form>
                        
                        </div>
                    </div>

                </div>
            </Wrapper>
        </>
    )
}

export default EditEmployees;