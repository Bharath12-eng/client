import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'

function Menu() {
    const state = useContext(GlobalContext);
    const [isLogged] = state.userAPI.isLogged;
    // const [isAdmin] = state.userApi.isAdmin;

    const defaultRouter = () => (
        <ul className='navbar-nav'>
        <li className='nav-item'>
            <NavLink to={`/login`} className='nav-link'>Login</NavLink>
        </li>
        <li className='nav-item'>
            <NavLink to={`/register`} className='nav-link'>Register</NavLink>
        </li>
    </ul>
    );

    const userRouter = () => (
        <ul className='navbar-nav'>
        <li className='nav-item'>
            <NavLink to={`/login`} className='nav-link'>Login</NavLink>
        </li>
        <li className='nav-item'>
            <NavLink to={`/#`} className='nav-link btn btn-danger'>Logout</NavLink>
        </li>
    </ul>
    )

    return (
        <div className='navbar navbar-expand-md navbar-dark bg-primary'>
            <div className="container">
                <NavLink to={"/"} className='navbar-brand'>VIDZI HR APP</NavLink>

                <button className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className='navbar-toggler-icon'></span>
                </button>
                    <div className='collapse navbar-collapse justify-content-end' id='menu'>
                        {
                            isLogged ?  userRouter()  :  defaultRouter() 
                        }
                    </div>
            </div>
        </div>
    )
}

export default Menu