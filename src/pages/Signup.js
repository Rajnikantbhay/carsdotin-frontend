import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const [ info, setInfo ] = useState({name:'', email:'', password:''});
  const [ errors, setErrors ] = useState({});
  const [visible, setVisible] = useState(false);
  
  const navigate = useNavigate();

  const handleIsVisible = () => {
    setVisible(!visible);
  }

  const handleOnChange = (e) => {
    setInfo({...info, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user", info);
      navigate("/");
    } catch (error) {
      
      
      if(error.response && error.response.status === 400) {
        setErrors(error.response.data.errors.reduce((acc, err) => {
          acc[err.path] = err.msg;
          return acc;
        }, {}));
             
      } else{
        console.log(`Ohter Error ${error}`) // for debugging purposes only
      }
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
      <form className='border border-1 p-4' onSubmit={handleSubmit}>
    {/* name element */}

    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" id="exampleInputName" name='name' value={info.name} onChange={handleOnChange} />
    {errors.name && <p className="text-danger small" >{errors.name}</p>}
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={info.email} onChange={handleOnChange} />
    {errors.email && <p className='text-danger small' >{errors.email}</p>}
    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <div className='d-flex bg-white rounded align-items-center'><input type={visible ? "text" : "password"} className="form-control shadow-none border-0" id="exampleInputPassword1" name='password' value={info.password} onChange={handleOnChange} /> 
    <i className={visible ? "bi bi-eye-slash-fill mx-2" : "bi bi-eye-fill mx-2"} style={{color:"grey", cursor:"pointer"}} id="eyeIcon" onClick={handleIsVisible} ></i>
    </div>
    {errors.password && <p className='text-danger small' >{errors.password}</p>}
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link className='mx-4' to={"/tologin"}>Alreay have an account?</Link>
</form>
</div>
</div>
  )
}
