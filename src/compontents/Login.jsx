import Aos from 'aos'
import 'aos/dist/aos.css'
import { useFormik } from 'formik'
import { useContext, useEffect } from 'react'
import axios from 'axios';
import  { useState } from 'react'
import *as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Swal from 'sweetalert2';
import { userContext } from '../context/UserContext';

export default function Login() {

let {getuserdata,userD}=useContext(userContext);


  const [loading,setLoading]=useState(false)
  let navigate = useNavigate()
  const[errormessage,setErrormessage]=useState('')
   
  async function sebdLogin(values){
    setLoading(true);
    let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{
      setLoading(false);
    setErrormessage(`${err.response.data.errors.msg}`)
  })
  if(data.message === 'success'){
    navigate('/')
    setLoading(false);
       getuserdata()
       localStorage.setItem('userEmail',data.user.email)
       Swal.fire({
         icon: "success",
        text:`You are Welcom ${userD?.name}`,
       showConfirmButton:false,
       timer:400
      });
     
    
  }
  }
  let validationSchema =Yup.object({
    email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
    password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{4,10}$/),
  
  })
    
    let formik = useFormik({
      initialValues:{
        email:'',
        password:'',
      },
     validationSchema 
      ,onSubmit:sebdLogin
    })
    const pass = document.querySelector('.pass');
    const toggler = document.querySelector('.fa-eye');
     const showHidepassword = ()=>{
       if(pass.type == 'password'){
         pass.setAttribute('type','text');
       }else{
         pass.setAttribute('type','password');
       }
       toggler.classList.toggle('fa-eye');
       toggler.classList.toggle('fa-eye-slash');
     }
  
  
  
  
    useEffect(()=>{
      Aos.init({duration:1000})
      },[])

  return<>
     <Helmet>
  <title>Login</title>
</Helmet>
  <div className="container mt-5 py-0 bg-main text-start shadow">
    <h2  data-aos='zoom-out-right' className="text-second">Login Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {errormessage?<div className='alert alert-danger mt-1'>{errormessage}</div>:null}
    
     <label htmlFor="email">Email: </label>
      <input   data-aos='zoom-in-right' onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id='email' className='form-control mb-1' placeholder='Enter Your Email.....'/>
      {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-1'>{formik.errors.email}</div>:null}

      <label htmlFor="password" >password:</label>
    <div className="d-flex password position-relative">
    <input   data-aos='zoom-in-right' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="password" id="password" name="password" className=" pass form-control mb-1 "/>   
    <span > <i onClick={showHidepassword}  className="fa-regular fa-eye text-main " ></i> </span>
    </div>  {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-1'>{formik.errors.password}</div>:null}
   
{loading? <button  disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-light px-5 text-center  mt-2 mb-1 '>
          <i className='fas fa-spinner fa-spin' ></i>
          </button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-light px-5   mt-1 mb-1 '>Login</button>}
      <h5 className='mb-2 mt-0 w-50 m-auto'> Dont have acount? <Link to="/register">Register</Link> </h5>
  
    </form>

  
  </div>
  </>
}

