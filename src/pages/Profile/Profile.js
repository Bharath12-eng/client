import React, { useContext, useEffect, useState } from 'react';
import "./profile.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { Spiner } from '../../components/Spiner/Spiner';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import Wrapper from '../../wrapper/Wrapper';
import { Button } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Employeedata} from '../Home/Home';



function Profile({props,empdata}) {
    const [showspin, setshowspin] = useState(true);
    const [profile, setprofile] = useState({})


   
 

    let allemployeedatas = useContext(Employeedata);
    console.log("alldata", empdata)
    
    const { id } = useParams();
    console.log(id);
    let navigate = useNavigate();
    


    console.log("pro",profile)


    const profiledata = async() => {
        console.log("Myid",id);
        
        let response = await axios.get(`http://localhost:5400/apis/employee/${id}`);
        let profileres = response.data;
        console.log("profiles", profileres);
        if (response.status ===201) {
            setprofile(response.data);
            console.log("set",profile)
        }else{
            console.log("err")
        }

        console.log("prodata",profile)


    }

    useEffect(() => {
        profiledata();
        setTimeout(() => {
            setshowspin(false)
        }, 1000)
    }, [id])

    const profileclick = () =>{
        navigate("/allemployee")
    }


    return (
        <>
       
            {
               
                showspin ? <Spiner /> :
                <Wrapper>
                    <div className='container'>
                        <Card className='card-profile shadow col-lg-6 mx-auto mt-5 card-data'>
                            <Card.Body>
                                <Row>
                                    <div className=' profile-data' >
                                        <div className="card-profile-stats">
                                            <img src='./Images/svg.png' alt="My Image" />
                                        </div>
                                        <div>
                                                <Button onClick={profileclick}> 
                                                <h1 className='close-data'> 
                                                    <FontAwesomeIcon icon={faCircleXmark} />
                                                </h1>
                                                </Button>
                                        </div>
                                       
                                    </div>
                                  
                                </Row>
                                <div className='text-center'>
                                    <h3>{profile.singleEmployee.personalDetails.firstName + profile.singleEmployee.personalDetails.lastName}</h3>
                                    <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:-<span>{profile.singleEmployee.personalDetails.email}</span></h4>
                                    <h4><i class="fa-solid fa-mobile-retro"></i>&nbsp;:-<span>{profile.singleEmployee.personalDetails.phone}</span></h4>
                                    <h4><i class="fa-solid fa-person"></i> &nbsp;:-<span>{profile.singleEmployee.personalDetails.Gender}</span></h4>
                                    <h4><i class="fa-sharp fa-solid fa-location-dot location" ></i>&nbsp;:-<span>{profile.singleEmployee.personalDetails.permanentAddress.city}</span></h4>
                                    <h4><i class="fa-solid fa-arrow-up-from-water-pump"></i>&nbsp;:-<span>{profile.singleEmployee.personalDetails.bloodGroup}</span></h4>
                                    <h4><i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date Created&nbsp;:-<span>{moment(profile.singleEmployee.personalDetails.createdAt).format("DD-MM-YYYY")}</span></h4>
                                    <h4><i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date Updated&nbsp;:-<span>{moment(profile.singleEmployee.personalDetails.updatedAt).format("DD-MM-YYY")}
                                    </span></h4>
                                </div>
                            </Card.Body>

                        </Card>
                    </div>
                    </Wrapper>
            }
          

        </>
    )
}

export default Profile