import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

function Menu() {
    let context = useContext(AuthContext)



  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
        <div className="container">
            <NavLink to={`/`} className="navbar-brand">Final Project</NavLink>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id='menu'>


                {

                context?.isLogin ?(
                    <>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={`/`} className="nav-link ">Home</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        <li className="nav-item">
                            <button onClick={context.logoutHandler} className="nav-link btn btn-danger">Logout</button>
                        </li>
                    </ul>
                    </>

                ):(

                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={`/login`} className="nav-link">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/booking/form`} className="nav-link">BookingForm</NavLink>
                    </li>
                </ul>
                )
                }
                

                
            </div>
        </div>
    </nav>
  )
}

export default Menu
