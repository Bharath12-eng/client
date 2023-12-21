
import React,{useState} from 'react';
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import { Pagination, Paginations } from '../Pagination/Paginations';
import { NavLink } from 'react-router-dom';
import Profile from '../../pages/Profile/Profile';
import "./table.css";


export const Tables = ({ empdata, deletedata, handlenext, handleprevious, page, pageCount, setpage }) => {

  const [showmodal, setshowmodal] = useState(false);

  const handlemodal = () =>{
    setshowmodal(true);
  }
  return (
    <>
      <div className='container'>
        <Row>
          <div className='col mt-0'>
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>PhoneNO</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Modify</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    empdata.length > 0 ? empdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1+(page-1)*4}</td>
                            <td>{element.personalDetails.firstName +" "+ element.personalDetails.lastName}</td>
                            <td>{element.personalDetails.email}</td>
                            <td>{element.personalDetails.phone}</td>
                            <td>{element.personalDetails.gender == "male" ? "Male" : "Female"}</td>
                            <td>{element.personalDetails.permanentAddress.locality+","+element.personalDetails.permanentAddress.city}</td>
                            <td>
                              <Dropdown className='text-center modify-data'>
                                <Dropdown.Toggle variant='light' className="action" id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink to={`/employee/${element._id}`} className="text-decoration-none">
                                    {/* <div onClick={handlemodal}> */}
                                       <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                       <Profile /> 
                                      {/* </div> */}
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <div onClick={() => deletedata(element._id)}>
                                      <i class="fa-sharp fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>No Data found</div>
                  }



                </tbody>

              </Table>
              <Paginations
                handlenext={handlenext}
                handleprevious={handleprevious}
                page={page}
                setpage={setpage}
                pageCount={pageCount}

              />
            </Card>

          </div>

        </Row>

      </div>
    </>
  )
}
