import React, { useState} from 'react'
import { Fragment } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../ProductContext'

export default function Navbar({ query, handleSearch }) {
  const { state } = useContext(CartContext);
  const navigate = useNavigate();
  const [ show, setShow ] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")
  }

  const handleToggleState = () => {
    setShow(!show)
  }

  return (
    <Fragment>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
  <div className="container-fluid">
    <Link className="navbar-brand fst-italic fw-bold" to="/">Carsdotin</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {(!localStorage.getItem("authToken")) ? "" : <Link className="nav-link active" aria-current="page" to="/myorders">My Orders</Link>}
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={"/about"}>About</Link>
        </li>

        {(!localStorage.getItem("authToken")) ?  (<li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" role="button" onClick={handleToggleState}>
            Signup/Login
          </Link>
          <ul className={`dropdown-menu ${show ? "show": ""}`}>
            <li><Link className="dropdown-item" role='button' to="/tosignup" onClick={() => setShow(!show)}>Signup</Link></li>
            <li><Link className="dropdown-item" role='button' to="/tologin" onClick={() => setShow(!show)}>Login</Link></li>
          </ul>
        </li>) : (<li><Link onClick={handleLogout} role='button' className='nav-link'>Logout</Link></li>)}
        
       
      </ul>
      <form className="d-flex  rounded mx-4" role="search">
        <input className="form-control rounded-0" type="search" placeholder="Search" aria-label="Search" value={query} onChange={handleSearch}/>
        <button className="btn btn-primary rounded-0"><i class="bi bi-search"></i></button>
      </form>
      <Link to="/tocart"><div className='fs-4' style={{cursor:"pointer"}}><i class="bi bi-cart4">cart</i></div></Link>
    </div>
  </div>
</nav>    
</Fragment>
  )
}
