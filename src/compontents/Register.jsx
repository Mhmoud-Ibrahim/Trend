import Aos from 'aos'
import 'aos/dist/aos.css'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import axios from 'axios';
import  { useState } from 'react'
import *as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Register() {

const [loading,setLoading]=useState(false)
let navigate = useNavigate()
const[errormessage,setErrormessage]=useState('')
async function sendregistertoapi(values){
  setLoading(true);
  let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((err)=>{
    setLoading(false);
  setErrormessage(`${err.response.data.errors.msg}`)
})
if(data.message === 'success'){
  localStorage.setItem('userToken',data.token)
  setLoading(false);
navigate('/login')
}
}
let validationSchema =Yup.object({
  name:Yup.string().required('name is required').min(4,'name canot less than 4 digits'),
  email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
  password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{4,10}$/),
  rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'not matched'),
  phone:Yup.string().required('phone is required').matches(/^(002){0,1}01[0125][0-9]{8}$/,'invalid number')})
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
   validationSchema 
    ,onSubmit:sendregistertoapi
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
  return <>
    <Helmet>
  <title>Register</title>
</Helmet>
  <div className="container mt-5 py-0 bg-main text-start shadow">
    <h2  data-aos='zoom-out-right' className="text-second">Register Now</h2>
    <form onSubmit={formik.handleSubmit}>

      {errormessage?<div className='alert alert-danger mt-1'>{errormessage}</div>:null}
      <label htmlFor="name">Name: </label>
      <input   data-aos='zoom-in-right' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" value={formik.values.name} name="name" id='name' className='form-control mb-1' placeholder='Enter Your Name.....'/>
     {formik.errors.name&&formik.touched.name? <div className='alert alert-danger mt-2'>{formik.errors.name}</div>:null}
     
     <label htmlFor="email">Email: </label>
      <input   data-aos='zoom-in-right' onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id='email' className='form-control mb-1' placeholder='Enter Your Email.....'/>
      {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-1'>{formik.errors.email}</div>:null}

      <label htmlFor="password" >password:</label>
    <div className="d-flex password position-relative">
    <input   data-aos='zoom-in-right' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   type="password" id="password" name="password" className=" pass form-control mb-1 "/>   
    <span > <i onClick={showHidepassword}  className="fa-regular fa-eye text-main " ></i> </span>
    </div>  {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-1'>{formik.errors.password}</div>:null}
   
      <label htmlFor="rePassword">rePassword: </label>
      <input  data-aos='zoom-in-right' onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.rePassword} name="rePassword" id='rePassword' className='form-control mb-1' placeholder='Enter Your rePassword.....'/>
           {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger mt-1'>{formik.errors.rePassword}</div>:null}

      
      <label htmlFor="phone">phone: </label>
      <input   onChange={formik.handleChange}   onBlur={formik.handleBlur} type="tel" value={formik.values.phone} name="phone" id='phone' className='form-control mb-1' placeholder='E.X:01278576425'/>
      {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger mt-1'>{formik.errors.phone}</div>:null}

{loading? <button   disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-light px-5 text-center  mt-2 mb-1 '>
          <i className='fas fa-spinner fa-spin' ></i>
          </button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-light px-5   mt-1 mb-1 '>Register</button>}
    <h5 className='mb-2 mt-0 w-50 m-auto'> Already I have acount? <Link to="/login">Login</Link> </h5>
  
    </form>
  </div>
  </>
}
