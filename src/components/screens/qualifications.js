import React from 'react';
import TableRowsQuali from './TableRowsQuali';
import { useState } from 'react';
import AddEmployee from './AddEmployee';
import "./qualifications.css";
import { qualificactionDetails } from '../../API/EmpApi';

const initialState = {


    // firstName: "",
    // lastName: "",
    // email: "",
    // bloodGroup: "",
    // countryCode: "",
    // phone: "",
    // altPhone: "",
    // DOB: "",
    // maritalStatus: "",
    // languages: "",
    // accommodation: "",
    // gender: "",

    // permanentAddress: {
    //     country: "",
    //     doorNo: "",
    //     locality: "",
    //     city: "",
    //     state: "",
    //     pincode: ""
    // },

    // contactAddress: {
    //     country: "",
    //     doorNo: "",
    //     locality: "",
    //     city: "",
    //     state: "",
    //     pincode: ""
    // },
    qualification:[{
        examination_Passed:"",
        university:"",
        year_of_passing:"",
        percentage:""
    }]






}

const Qualification = ({activeTab}) => {

    const [employee, setemployee] = useState(initialState);

    const [qualificaction, setqualification] = useState(initialState)

    const [rowsDataQuali, setRowsDataQuali] = useState([]);
    const [showemployee, setshowemployee] = useState(false)

    const onValueChanges = (e) => {

       setqualification({...qualificaction,[e.target.name]:[e.target.value]})
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

    const paydata = (data)=>{
    
        var payloadadata ={
        qualification:{
            examination_Passed:data.examination_Passed,
            university:data.university,
            year_of_passing:data.year_of_passing,
            percentage:data.percentage
        }
    }
    }

    const handleSaveAndContinue = async() =>{
            await qualificactionDetails(qualificaction)
    }




    return (
        <>

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
                    <tr rowsData={rowsDataQuali} deleteTableRows={deleteTableRowsQuali} handleChange={handleChangeQuali}>
                        <td className='table-data'>
                            <input type="text" name="examination_Passed" value={employee.examination_Passed} onChange={(e) => onValueChanges} id="examination_Passed"  required />
                        </td>

                        <td className='table-data'>
                            <input type="text" name="university" value={employee.university} onChange={(e) => onValueChanges} id="university" required />
                        </td>

                        <td className='table-data'>
                            <input type="text" name='year_of_passing' value={employee.year_of_passing} onChange={(e) => onValueChanges} id="year_of_passing" required />
                        </td>

                        <td className='table-data'>
                            <input type='text' name="percentage" value={employee.percentage} onChange={(e) => onValueChanges} id="percentage" required />
                        </td>


                    </tr>

                    {activeTab > 0 && (
                                    <button className="btn btn-primary mt-4" onClick={handleSaveAndContinue}>
                                        Save and Continue
                                    </button>
                                )}

                </tbody>
            </table >
            {showemployee && <AddEmployee 
                            paydata={paydata() }
                            onValueChanges={onValueChanges()} 
                            qualificaction={qualificaction}/>   }
        </>
    )
}


export default Qualification;