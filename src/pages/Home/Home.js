import React, { createContext, useContext, useEffect, useState } from 'react';
import "./home.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Wrapper from '../../wrapper/Wrapper';
import { Spiner } from '../../components/Spiner/Spiner';
import { useNavigate } from 'react-router-dom';
import { Tables } from '../../components/Tables/Tables';
import {GlobalContext} from '../../GlobalContext';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { allemployee, deleteEmployee, } from '../../API/EmpApi';
import Profile from '../Profile/Profile';

// export const EmployeeContext = createContext();

export const Employeedata = createContext()

export const Homepage = () => {
    const navigate = useNavigate();

    const [showspin, setshowspin] = useState(true);
    
    const [search, setsearch] = useState("");
    const [gender,setgender] = useState("All");
    const [sort, setsort] = useState("new")
    const [page, setpage] = useState(1);
    const [pageCount,setpageCount] = useState(0)
    const [empdata,setempdata ] = useState([])
    const [shows, setshows] = useState(false)
    const data= useContext(GlobalContext);

   
   
  

    // const employeedata = async() =>{
    //         const resdata = await axios.get(`/api/allemployee?search=${search}`);
    //         console.log(resdata);
    //         if(resdata.status==201){
                
    //             setempdata(resdata.data.empdata);
    //             console.log("mydata",resdata.data)
                
    //         }
    // }

    // const employeedatas = async()=>{
    //     const myresponse = await allemployee(search,gender,sort,page);
    //     console.log("Mycount",myresponse.data.Pagination.pagecount)
    //     if(myresponse.status==201){
                
    //         setempdata(myresponse.data.empdata);
    //         setpageCount(myresponse.data.Pagination.pagecount)
    //         console.log("mydata",myresponse.data)
            
    //     }
    // }


   const allEmployeesdata = async()=>{
     const resdata = await allemployee(sort,search,page);
     console.log("myres",resdata.data)
     console.log("pagedata",resdata.data.Pagination.pageCount)
     if(resdata.status===201){
        setempdata(resdata.data.empdata);
 
        setpageCount(resdata.data.Pagination.pageCount)
      
     }
   }
    

    console.log("emp",empdata)

    const deletedata = async(id)=>{
        console.log("id",id)
        const deletemp = await axios.delete(`http://localhost:5400/apis/deleteemployee/${id}`);
        console.log("deletedata",deletemp);
        if(deletemp.status===201){
            allEmployeesdata();
            console.log("deleted data",deletemp)
            // employeedatas();
        }else{
           console.log("error")
        }
      
        toast.success("Employee Deleted Sucessfully",{position:toast.POSITION.TOP_CENTER,theme:"colored",autoClose:1000})


}

//Pagination

const handleprevious = ()=>{
    setpage(()=>{
        if(page===1){
            return page;
        }else{

            return page-1;
        }
    })
}


const handlenext = () =>{
    setpage(()=>{
        if(page==pageCount){
                return page;
        }else{
            return page+1;
        }
    })
}

    useEffect(() => {
       allEmployeesdata();
        // employeedatas();
        setTimeout(() => {
            setshowspin(false)
        }, 1000)
    }, [sort,search,page])

    const Addemployees = () => {
        navigate("/addEmployee")
    }
    return (

        <>
            <Wrapper>
                {/* search and Button */}
                <div className='container'>
                    <div className='main_div'>
                        <div className="search_add mt-4 d-flex justify-content-between">
                            <div className="search col-lg-4">
                                <Form className='d-flex'>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-lable="Search"
                                        onChange={(e)=>setsearch(e.target.value)}
                                    />

                                    <Button variant='success' className='search_btn' >Search</Button>
                                </Form>

                            </div>
                            <div className='add_btn'>
                                <Button variant='primary' onClick={Addemployees} ><i class="fa-solid fa-plus"></i> &nbsp; Add Employee</Button>
                            </div>
                        </div>

                        <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
                            {/* <div className='fliter_gender'>
                                <div className='filter'>
                                    <h3>Filter By Gender</h3>
                                    <div className='gender d-flex justify-content-between'>
                                        <Form.Check
                                            type={"radio"}
                                            label={`ALL`}
                                            name="gender"
                                            value={"All"}
                                            onChange={(e)=>setgender(e.target.value)}
                                            defaultChecked />
                                        <Form.Check
                                            type={"radio"}
                                            label={`Male`}
                                            name="gender"
                                            value={"Male"}
                                            onChange={(e)=>setgender(e.target.value)}
                                        />
                                        <Form.Check
                                            type={"radio"}
                                            label={`Female`}
                                            name="gender"
                                            value={"Female"}
                                            onChange={(e)=>setgender(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div> */}
                            {/* sort by value */}
                            <div className='filter_newold'>
                                <h3>Sort By Value</h3>
                                <Dropdown className='text-center'>
                                    <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                                        <i class="fa-solid fa-sort"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>setsort("new",toast.success("sorted",{position:toast.POSITION.TOP_CENTER,theme:"colored",autoClose:1000}))}>New Records</Dropdown.Item>
                                        <Dropdown.Item onClick={()=>setsort("old",toast.success("sorted",{position:toast.POSITION.TOP_CENTER,theme:"colored",autoClose:1000}))}>Old Records</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                   

                    {
                        
                        showspin ? <Spiner /> : <Tables 
                                                    empdata={empdata}
                                                    deletedata={deletedata} 
                                                    handlenext={handlenext}
                                                    handleprevious={handleprevious}
                                                    page={page}
                                                    setpage={setpage}
                                                    pageCount = {pageCount}
                                                    />
                    }

                   

                </div>
                <ToastContainer></ToastContainer>
            </Wrapper>
           
            {
                // shows && <Employeedata.Provider value={empdata}>
                //                 <Profile />
                //         </Employeedata.Provider>
                shows && <Profile 
                          empdata={empdata}
                          />
            }
        </>
    )
}


