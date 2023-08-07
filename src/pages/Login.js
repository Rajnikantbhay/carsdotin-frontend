import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../ProductContext'

export default function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""})
  const navigate = useNavigate();
  const { setUserEmail } = useContext(CartContext);

  const handleLogin = (e) => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/loginuser", credentials);

      if(response) {
        console.log("response: ",response)
       localStorage.setItem("userEmail", credentials.email);
       localStorage.setItem("authToken", response.data.authToken);
       setUserEmail(credentials.email)
       localStorage.setItem(`userCart${response.data.userCart._id}`, JSON.stringify(response.data.userCart));
       navigate("/")
      }

  } catch (error) {
      console.log("error", error)
  }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
      <form className='border border-1 p-4' onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleLogin} />
    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <div className='d-flex bg-white rounded align-items-center'><input className="form-control shadow-none border-0" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleLogin} /> 
    <i style={{color:"grey", cursor:"pointer"}} id="eyeIcon" ></i>
    </div>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link className='mx-4' to={"/tosignup"}>new user?</Link>
</form>
</div>
</div>
  )
}
