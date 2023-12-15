import Aos from 'aos';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css'
import { useContext, useEffect } from 'react';
import { userContext } from '../context/UserContext';


export default function Navbar() {


let {userD,logout}=useContext(userContext)



  useEffect(()=>{
    Aos.init({duration:2000})
    },[]) 
  return<>
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top mb-5 m-0 py-0 bg-dark shadow-sm ">
  <div className="container">
    <Link className="navbar-brand text-uppercase text-second fw-bold" to="">Trending</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-5 me-auto mb-2 mb-lg-0">
        <li data-aos="flip-down" 
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"  className="nav-item">
          <Link className="nav-link active" aria-current="page" to="">Home</Link>
        </li>
        <li data-aos="fade-right"  className="nav-item">
          <Link className="nav-link" to="tv">TVshow</Link>
        </li>
        <li data-aos="fade-right"  className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li data-aos="fade-up"  className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
    
      </ul>
{userD !==null? <> <Link to="Acount">
        <i className='fas fa-user text-second ' ></i>
        <span className='text-capitalize text-secondary fs-5 mx-2'>{userD?.name}</span>
      </Link>
      <li  data-aos="fade-down-right" className="nav-item" >
          <button className="nav-link btn btn-sm m-2 btn-warning py-0"onClick={logout} >Log out</button>
        </li>
      </>
      : <ul className='navbar-nav mx-5 m-auto mb-2 mb-lg-0'>
       <li data-aos="fade-up-left" className="nav-item">
          <Link className="nav-link btn btn-sm m-2 btn-success py-0" to="login">Login</Link>
        </li>
        <li  data-aos="fade-down-right" className="nav-item" >
          <Link className="nav-link btn btn-sm m-2 btn-primary py-0" to="register">Register</Link>
        </li>
       </ul>}
     


     
    
    </div>
  </div>
</nav>
  </>
}
