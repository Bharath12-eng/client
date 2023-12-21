import React, { useContext, useEffect, useState } from 'react'

import Wrapper from '../../wrapper/Wrapper';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GlobalContext } from '../../GlobalContext';
import { useNavigate } from 'react-router-dom';
import TableRows from './TableRows';
import TableRowsQuali from './TableRowsQuali';
import './photo.css';

const LoadingSpinner = () => {
    return (
        <div
            className="spinner-border text-success"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
        >
            <span className="visually-hidden"> Loading... </span>
        </div>
    );
};


const initialState = {
    personalDetails: {
        FirstName: '',
        LastName: '',
        FatherName: '',
        MotherName: '',
        Email: '',
        BloodGroup: '',
        Phone: null,
        AltPhone: null,
        Age: null,
        DOB: '',
        MaritalStatus: '',
        Languages: '',
        Accommodation: '',
        Gender: '',
        Family: [
            {
                relation: '',
                age: null,
                education: '',
                occupation: '',
                otherDetails: '',
            },
        ],
        CurrentHouseNo: '',
        CurrentRoadLocality: '',
        CurrentCity: '',
        CurrentState: '',
        CurrentPinCode: '',
        PermanentHouseNo: '',
        PermanentRoadLocality: '',
        PermanentCity: '',
        PermanentState: '',
        PermanentPinCode: '',
    },
    qualification: [
        {
            examinationPassed: '',
            university: '',
            yearOfPassing: null,
            percentageOfMarks: null,
        },
    ],
    workHistory: [
        {
            organization: '',
            location: '',
            industry: '',
            designation: '',
            dateOfJoining: '',
            dateOfLeaving: '',
            netSalary: '',
            reasonForChange: '',
        },
    ],
    otherDetails: {
        illegalProceedings: '',
        illegalProceedingsDetails: '',
        employeeId: '',
        dateOfJoining: '',
        accessCardNo: '',
        positionOffered: '',
    },
    deleted: false,
    deletedAt: null,
};


function AddEmployee() {

    // const [value, setValue] = useState(new Date());
    const [employee, setEmployee] = useState(initialState);

    const data = useContext(GlobalContext);
    // const [product, setProduct] = useState(initialState);
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin] = data.userAPI.isAdmin;
    const [token] = data.token;

    const [rowsData, setRowsData] = useState([]);
    const [rowsDataQuali, setRowsDataQuali] = useState([]);

    const [forms, setForms] = useState([{ id: 1 }]);

    const handleDuplicate = () => {
        const newForm = { id: forms.length + 1 };
        setForms([...forms, newForm]);
    };
    const navigate = useNavigate();

    const styleUpload = {
        display: images ? "block" : "none",
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            const file = e.target.files[0];

            if (!file) return toast.error("file doesn't exists");

            if (file.size > 1024 * 1024 * 1024)
                return toast.error("file size is too large.. it must be less than 1Mb");

            let formData = new FormData();
            formData.append("myfile", file);

            setLoading(true);
            const res = await axios.post(`/api/product/upload`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token,
                },
            });

            setLoading(false);
            setImages(res.data);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };
    const handleDestroy = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(
                `/api/product/destroy`,
                { public_id: images.public_id },
                {
                    headers: { Authorization: token },
                }
            );

            setImages(false);
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
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

        setEmployee(updatedEmployee);
        console.log("Set",setEmployee)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // const formData = new FormData();
            // if (images) {
            //     formData.append("myfile", images);
            // }


            // formData.append('personalDetails.Email', employee.personalDetails.Email);
            // formData.append('personalDetails.empFirstName', employee.personalDetails.empFirstName);
            // formData.append('personalDetails.LastName', employee.personalDetails.LastName);
            // formData.append('personalDetails.FatherName', employee.personalDetails.FatherName);
            // formData.append('personalDetails.MotherName', employee.personalDetails.MotherName);
            // formData.append('personalDetails.BloodGroup', employee.personalDetails.BloodGroup);
            // formData.append('personalDetails.Phone', employee.personalDetails.Phone);
            // formData.append('personalDetails.AltPhone', employee.personalDetails.AltPhone);
            // formData.append('personalDetails.Age', employee.personalDetails.Age);
            // formData.append('personalDetails.DOB', employee.personalDetails.DOB);
            // formData.append('personalDetails.MaritalStatus', employee.personalDetails.MaritalStatus);
            // formData.append('personalDetails.Languages', employee.personalDetails.Languages);
            // formData.append('personalDetails.Accommodation', employee.personalDetails.Accommodation);
            // formData.append('personalDetails.Gender', employee.personalDetails.Gender);

            
            // formData.append('personalDetails.Family[0].relation', employee.personalDetails.Family[0].relation);
            // formData.append('personalDetails.Family[0].age', employee.personalDetails.Family[0].age);
            // formData.append('personalDetails.Family[0].education', employee.personalDetails.Family[0].education);
            // formData.append('personalDetails.Family[0].occupation', employee.personalDetails.Family[0].occupation);
            // formData.append('personalDetails.Family[0].otherDetails', employee.personalDetails.Family[0].otherDetails);

            // formData.append('personalDetails.CurrentHouseNo', employee.personalDetails.CurrentHouseNo);
            // formData.append('personalDetails.CurrentRoadLocality', employee.personalDetails.CurrentRoadLocality);
            // formData.append('personalDetails.CurrentCity', employee.personalDetails.CurrentCity);
            // formData.append('personalDetails.CurrentState', employee.personalDetails.CurrentState);
            // formData.append('personalDetails.CurrentPinCode', employee.personalDetails.CurrentPinCode);
            // formData.append('personalDetails.PermanentHouseNo', employee.personalDetails.PermanentHouseNo);
            // formData.append('personalDetails.PermanentRoadLocality', employee.personalDetails.PermanentRoadLocality);
            // formData.append('personalDetails.PermanentCity', employee.personalDetails.PermanentCity);
            // formData.append('personalDetails.PermanentState', employee.personalDetails.PermanentState);
            // formData.append('personalDetails.PermanentPinCode', employee.personalDetails.PermanentPinCode);

            console.log("adds",employee.personalDetails)
            const res = await axios.post('/api/addEmployee', employee, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("add",employee.personalDetails.FirstName)
           

            setImages(false);
            setEmployee(initialState);
            toast.success(res.data.msg);
            navigate(`/allemployee`);
           
        } catch (err) {
            toast.error(err.response?.data?.msg || 'An error occurred while submitting the form.');
        }
    };
    const addTableRows = () => {

        const rowsInput = {
            Relation: '',
            Age: '',
            Education: '',
            Occupation: '',
            Other: ''
        }
        setRowsData([...rowsData, rowsInput])

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {

        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);



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

    useEffect(() => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.from(forms).forEach((form) => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    }, []);

    // const [activeTab, setActiveTab] = useState(0);

    // const handleTabClick = (tabIndex) => {
    //     if (tabIndex <= activeTab) {
    //         setActiveTab(tabIndex);
    //     }
    // };

    // const handleNextClick = () => {
    //     if (activeTab < 3) {
    //         setActiveTab(activeTab + 1);
    //     }
    // };

    // const handlePrevClick = () => {
    //     if (activeTab > 0) {
    //         setActiveTab(activeTab - 1);
    //     }
    // };
    const [activeTab, setActiveTab] = useState(0);
    const [tabCompletion, setTabCompletion] = useState([false, false, false, false]);

    // const handleTabClick = (tabIndex) => {
    //     setActiveTab(tabIndex);
    // };
    const handleTabClick = (tabIndex) => {
        if (!tabCompletion[tabIndex - 1]) {
            return; // Return early if the previous tab is incomplete
        }
        setActiveTab(tabIndex);
    };

    // const handleSaveAndContinue = () => {
    //     // Add your logic here to save the current tab data and proceed to the next tab
    //     console.log('Save and Continue clicked!');
    //     if (activeTab < 3) {
    //         setActiveTab(activeTab + 1);
    //     }
    // };

    const handleSaveAndContinue = () => {
        // Add your logic here to save the current tab data and proceed to the next tab
        console.log('Save and Continue clicked!');
        const updatedTabCompletion = [...tabCompletion];
        updatedTabCompletion[activeTab] = true;
        setTabCompletion(updatedTabCompletion);
        if (activeTab < 3) {
            setActiveTab(activeTab + 1);
        }
    };


    const handleGoBack = () => {
        // Add your logic here to go back to the previous tab
        console.log('Go Back clicked!');
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };


    return (
        <>
            <Wrapper>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            
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
                                            disabled={!tabCompletion[0]} // Disable the button until the first tab is completed
                                            onClick={() => handleTabClick(1)}
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
                                            disabled={!tabCompletion[1]} // Disable the button until the second tab is completed
                                            onClick={() => handleTabClick(2)}
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
                                            disabled={!tabCompletion[2]} // Disable the button until the third tab is completed
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
                                        <div className={`tab-pane ${activeTab === 0 ? 'fade show active' : ''}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                            <div className="row mb-2 mt-5">
                                                <div className="col-md-4">
                                                    <label htmlFor="FirstName" className="form-label">First Name</label>
                                                    <input type="text" name="personalDetails.FirstName" id="FirstName" className="form-control" onChange={handleChangeInput} value={employee.FirstName} required />

                                                    <div class="invalid-feedback">
                                                        Please enter a name.
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="col-md-4">
                                                    <label htmlFor="last name" className="form-label">Last Name</label>
                                                    <input type="text" name="personalDetails.LastName" id="LastName" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.LastName} required />

                                                    <div class="invalid-feedback">
                                                        Please enter a name.
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="last name" className="form-label">Photo Upload</label>
                                                    <input
                                                        type="file"
                                                        name="myfile"
                                                        id="file_up"
                                                        onChange={handleUpload}
                                                        className="form-control"
                                                    />
                                                    {
                                                        loading ? <div id="file_img"> <LoadingSpinner /> </div> :
                                                            <div id='file_img' style={styleUpload}>
                                                                <img src={images ? images.url : ""} alt="" />
                                                                <span onClick={handleDestroy} className="btn btn-sm btn-danger"> X </span>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    <label htmlFor="father name" className="form-label">Father/Husband Name</label>
                                                    <input type="text" name="personalDetails.FatherName" id="FatherName" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.FatherName} required />

                                                    <div class="invalid-feedback">
                                                        Please enter a name.
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="mother name" className="form-label">Mother Name</label>
                                                    <input type="text" name="personalDetails.MotherName" id="MotherName" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.MotherName} required />

                                                    <div class="invalid-feedback">
                                                        Please enter a name.
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    <label htmlFor="email" className="form-label">Email Address</label>
                                                    <input type="email" name="personalDetails.Email" id="Email" className="form-control" onChange={handleChangeInput}
                                                    value={employee.personalDetails.Email} required />

                                                    <div class="invalid-feedback">
                                                        Please enter an Email-Id.
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="Blood" className="form-label">Blood Group</label>
                                                    <input type="text" name="personalDetails.BloodGroup" id="BloodGroup" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.BloodGroup} required />

                                                    <div class="invalid-feedback">
                                                        Please enter your blood group.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-4">
                                                    <label htmlFor="phone" className="form-label">Contact no.</label>
                                                    <input type="tel" name="personalDetails.Phone" id="Phone" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.Phone} required />

                                                    <div class="invalid-feedback">
                                                        Please enter your phone no.
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="altno" className="form-label">Alternate no.</label>
                                                    <input type="tel" name="personalDetails.AltPhone" id="AltPhone" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.AltPhone} required />

                                                    <div class="invalid-feedback">
                                                        Please enter your alternate phone no.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-md-3">
                                                    <label htmlFor="age" className="form-label">Age</label>
                                                    <input type="text" name="personalDetails.Age" id="Age" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.Age} required />

                                                    <div class="invalid-feedback">
                                                        Please enter your age.
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="age" className="form-label">Date of Birth</label>
                                                    <input type="date" name="personalDetails.DOB" id="DOB" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.DOB} required />

                                                    <div class="invalid-feedback">
                                                        Please enter your DOB.
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="age" className="form-label">Marital Status</label>
                                                    <select className="form-select" aria-label="Default select example" name="personalDetails.MaritalStatus" id="MaritalStatus" onChange={handleChangeInput} value={employee.personalDetails.MaritalStatus} required >
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
                                                <div className="col-md-3">
                                                    <label htmlFor="age" className="form-label">Languages Known</label>
                                                    <input type="text" name="personalDetails.Languages" id="Languages" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.Languages} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the languages.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col-md-4">
                                                    <label htmlFor="age" className="form-label">Accommodation</label>
                                                    <select className="form-select" aria-label="Default select example" onChange={handleChangeInput} value={employee.personalDetails.Accommodation} required name='personalDetails.Accommodation' id='Accommodation'>
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
                                                    <select className="form-select" aria-label="Default select example" onChange={handleChangeInput} value={employee.personalDetails.Gender} required name='personalDetails.Gender' id='Gender'>
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
                                                <div className="col-md-4">
                                                    <label htmlFor="age" className="form-label">ID Proof (PAN/Aadhar)</label>
                                                    <input
                                                        type="file"
                                                        name="myfile"
                                                        id="file_up"
                                                        onChange={handleUpload}
                                                        className="form-control"
                                                        
                                                    />

                                                    <div class="invalid-feedback">
                                                        Please upload an Id proof.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col-md-12">
                                                    <b><label htmlFor="age" className="form-label">Family Background</label></b>
                                                    {/*<table className="table table-responsive table-hover">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col" className='text-center'>Relation</th>
                                                                                <th scope="col" className='text-center'>Age</th>
                                                                                <th scope="col" className='text-center'>Education</th>
                                                                                <th scope="col" className='text-center'>Occupation</th>
                                                                                <th scope="col" className='text-center'>Other Details</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <th><input type="text" name="age" id="age" className="form-control" required /></th>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="row"><input type="text" name="age" id="age" className="form-control" required /></th>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="row"><input type="text" name="age" id="age" className="form-control" required /></th>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="row"><input type="text" name="age" id="age" className="form-control" required /></th>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                                <td><input type="text" name="age" id="age" className="form-control" required /></td>
                                                                            </tr>
                                                                        </tbody>
                                                            </table>*/}
                                                    <table className="table table-responsive table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className='text-center'>Relation</th>
                                                                <th scope="col" className='text-center'>Age</th>
                                                                <th scope="col" className='text-center'>Education</th>
                                                                <th scope="col" className='text-center'>Occupation</th>
                                                                <th scope="col" className='text-center'>Other Details</th>
                                                                <th><button className="btn btn-outline-success" onClick={addTableRows} > + </button></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <h5>Current Address</h5>
                                                <div className="col-md-3">
                                                    <label htmlFor="Address" className="form-label">House no.</label>
                                                    <input type="text" name="personalDetails.CurrentHouseNo" id="CurrentHouseNo" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.CurrentHouseNo} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the details.
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="Address" className="form-label">Road/Locality/Landmark</label>
                                                    <input type="text" name="personalDetails.CurrentRoadLocality" id="CurrentRoadLocality" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.CurrentRoadLocality} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the details.
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="Address" className="form-label">City</label>
                                                    <input type="text" name="personalDetails.CurrentCity" id="CurrentCity" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.CurrentCity} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the city.
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="Address" className="form-label">State</label>
                                                    <input type="text" name="personalDetails.CurrentState" id="CurrentState" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.CurrentState} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the state.
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="Address" className="form-label">PinCode</label>
                                                    <input type="text" name="personalDetails.CurrentPinCode" id="CurrentPinCode" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.CurrentPinCode} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the pincode.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <h5>Permanent Address</h5>
                                                <div className="col-md-3">
                                                    <label htmlFor="Address" className="form-label">House no.</label>
                                                    <input type="text" name="personalDetails.PermanentHouseNo" id="PermanentHouseNo" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.PermanentHouseNo} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the details.
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="Address" className="form-label">Road/Locality/Landmark</label>
                                                    <input type="text" name="personalDetails.PermanentRoadLocality" id="PermanentRoadLocality" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.PermanentRoadLocality} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the details.
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="Address" className="form-label">City</label>
                                                    <input type="text" name="personalDetails.PermanentCity" id="PermanentCity" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.PermanentCity} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the city.
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="Address" className="form-label">State</label>
                                                    <input type="text" name="personalDetails.PermanentState" id="PermanentState" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.PermanentState} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the state.
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <label htmlFor="Address" className="form-label">PinCode</label>
                                                    <input type="text" name="personalDetails.PermanentPinCode" id="PermanentPinCode" className="form-control" onChange={handleChangeInput} value={employee.personalDetails.PermanentPinCode} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the pincode.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type='submit' value='Submit' className="btn btn-success" />
                                            </div> 
                                            </form>
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

                                        <div className={`tab-pane ${activeTab === 1 ? 'fade show active' : ''}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="1">

                                            <table className="table table-responsive table-hover">
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
                                                    <TableRowsQuali rowsData={rowsDataQuali} deleteTableRows={deleteTableRowsQuali} handleChange={handleChangeQuali} />
                                                </tbody>
                                            </table>
                                            { /* <div className="form-group mt-2">
                                                                <input type='submit' value='Submit' className="btn btn-success" />
                                                    </div> */}


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

                                            {
                                                forms.map((form) => (
                                                    <div key={form.id}>

                                                        <div className="row mb-3">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Organization</label>
                                                                <input type="text" name="workHistory.organization" id="organization" className="form-control" onChange={handleChangeInput} value={employee.workHistory.organization} required />
                                                                <div class="invalid-feedback">
                                                                    Please enter a name.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Location</label>
                                                                <input type="text" name="workHistory.location" id="location" className="form-control" onChange={handleChangeInput} value={employee.workHistory.location} required />
                                                                <div class="invalid-feedback">
                                                                    Please enter a location.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Industry</label>
                                                                <input type="text" name="workHistory.industry" id="industry" className="form-control" onChange={handleChangeInput} value={employee.workHistory.industry} required />
                                                                <div class="invalid-feedback">
                                                                    Please select an option.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Designation</label>
                                                                <input type="text" name="workHistory.designation" id="designation" className="form-control" onChange={handleChangeInput} value={employee.workHistory.designation} required />
                                                                <div class="invalid-feedback">
                                                                    Please enter a position.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Date of Joining</label>
                                                                <input type="date" name="workHistory.dateOfJoining" id="dateOfJoining" className="form-control" onChange={handleChangeInput} value={employee.workHistory.dateOfJoining} required />
                                                                <div class="invalid-feedback">
                                                                    Please enter a date.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Date of Leaving</label>
                                                                <input type="date" name="workHistory.dateOfLeaving" id="dateOfLeaving" className="form-control" onChange={handleChangeInput} value={employee.workHistory.dateOfLeaving} required />
                                                                <div class="invalid-feedback">
                                                                    Please enter date.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Net Salary(CTC)</label>
                                                                <input type="text" name="workHistory.netSalary" id="netSalary" className="form-control" onChange={handleChangeInput} value={employee.workHistory.netSalary} required />
                                                                <div class="invalid-feedback">
                                                                    Please enter the CTC.
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="Address" className="form-label">Reason for change</label>
                                                                <textarea className='form-control' name="workHistory.reasonForChange" id="reasonForChange" rows="3" onChange={handleChangeInput} value={employee.workHistory.reasonForChange} required></textarea>
                                                                <div class="invalid-feedback">
                                                                    Please enter the details.
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        { /* <div className="form-group mt-2">
                                                                <input type='submit' value='Submit' className="btn btn-success" />
                                                    </div> */}


                                                    </div>
                                                ))
                                            }
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

                                            <div>
                                                <h3 className='text-center'>For Office Use Only</h3>
                                                <hr />
                                            </div>


                                            <div>
                                                <p>Have you been involved in any illegal/criminal proceedings?</p>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={handleChangeInput}  />

                                                    <label className="form-check-label form-label" htmlFor="inlineRadio1" name="otherDetails.illegalProceedings" id='illegalProceedings' value={employee.otherDetails.illegalProceedings} >No</label>
                                                    <div className="invalid-feedback">Example invalid feedback text</div>
                                                </div>
                                                <div className="form-check form-check-inline form-label">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={handleChangeInput} />
                                                    <label className="form-check-label" htmlFor="inlineRadio2"  name="otherDetails.illegalProceedings" id='illegalProceedings' value={employee.otherDetails.illegalProceedings}>Yes</label>
                                                </div>
                                                <p>If Yes, Please give details</p>
                                                <textarea className='form-control' name="otherDetails.illegalProceedingsDetails" id="illegalProceedingsDetails" rows="3" onChange={handleChangeInput} value={employee.otherDetails.illegalProceedingsDetails} ></textarea>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-6">
                                                    <label htmlFor="Address" className="form-label">Employee ID</label>
                                                    <input type="text" name="employeeId" id="employeeId"  className="form-control" required disabled />

                                                    <div className="invalid-feedback">
                                                        Please enter the employee Id.
                                                    </div>
                                                </div>
                                                <div className="col-md-6 ">
                                                    <label htmlFor="Address" className="form-label">Date of Joining</label>
                                                    <input type="date" name="otherDetails.dateOfJoining" id="dateOfJoining" className="form-control" onChange={handleChangeInput} value={employee.otherDetails.dateOfJoining} required />

                                                    <div className="invalid-feedback">
                                                        Please enter the date.
                                                    </div>
                                                </div>
                                                <div className="col-md-6  mt-4">
                                                    <label htmlFor="Address" className="form-label">Access card no.</label>
                                                    <input type="text" name="otherDetails.accessCardNo" id="accessCardNo" className="form-control" onChange={handleChangeInput} required value={employee.otherDetails.accessCardNo}/>

                                                    <div class="invalid-feedback">
                                                        Please enter the no.
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mt-4">
                                                    <label htmlFor="Address" className="form-label">Position offered</label>
                                                    <input type="text" name="otherDetails.positionOffered" id="positionOffered" className="form-control" onChange={handleChangeInput} value={employee.otherDetails.positionOffered} required />

                                                    <div class="invalid-feedback">
                                                        Please enter the designation.
                                                    </div>
                                                </div>
                                            </div>
                                         {/*   <div className="form-group mt-2">
                                                                <input type='submit' value='Submit' className="btn btn-success" />
                                        </div> */}

                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        <div>
                            {activeTab > 0 && (
                                <button className="btn btn-primary me-2 mt-4" onClick={handleGoBack}>
                                    Back
                                </button>
                                
                                
                            )}
                            {activeTab < 3 && (
                                <button className="btn btn-primary mt-4" onClick={handleSaveAndContinue}>
                                    Save and Continue
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default AddEmployee
















