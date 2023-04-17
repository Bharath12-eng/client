// import React, {useState} from 'react'
// import axios from "axios"
// import {toast} from 'react-toastify'


// function Register(props) {
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         password: "",
//         mobile: ""
//     })

//     const readValue = (e) => {
//         const{name, value} = e.target;
//         setUser({...user, [name]: value})
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         console.log(`user = `, user);

//         try {
//             await axios.post(`/api/auth/register`, user)
//             .then(res => {
//                 toast.success(res.response.data.msg);
//                     window.location.href = "/"
//             }).catch(err => toast.error(err.response.data.msg))
//         } catch (err) {
//             toast.error(err.response.data.msg);
//         }
//     }
//   return (
//     <div>
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <div className="card">
//                         <div className="card-body">
//                             <form onSubmit={submitHandler}>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="name">Name</label>
//                                     <input type="text" className="form-control" id="name" onChange={readValue} placeholder="Name" value={user.name} required />
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="name">Email</label>
//                                     <input type="email" className="form-control" id="email" onChange={readValue} placeholder="Name" value={user.email} required />
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="name">mobile</label>
//                                     <input type="text" className="form-control" id="mobile" onChange={readValue} placeholder="mobile" value={user.mobile} required />
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="name">Password</label>
//                                     <input type="password" className="form-control" id="password" onChange={readValue} placeholder="Name" value={user.password} required />
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <input type="submit"  value="Register" className='btn btn-success' />
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Register
import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

function Register(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })


    const readValue = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(`user = `, user);
        try {
            await axios.post(`http://localhost:5400/api/auth/register`, user)
                .then(res => {
                    toast.success(res.msg)
                    window.location.href = "/"
                }).catch(err => toast.error(err.message))
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Register</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name='name' id='name' value={user.name} onChange={readValue} className='form-control' required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name='email' id='email' value={user.email} onChange={readValue} className='form-control' required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="number" name='mobile' id='mobile' value={user.mobile} onChange={readValue} className='form-control' required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name='password' id='password' value={user.password} onChange={readValue} className='form-control' required />
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value=" Register" className='btn btn-success' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
