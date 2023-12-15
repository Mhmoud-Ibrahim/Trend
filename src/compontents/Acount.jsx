import Aos from 'aos'
import 'aos/dist/aos.css'
import { useContext, useEffect} from 'react'
import { userContext } from '../context/UserContext'


export default function Acount() {

let {getuserdata,userD}=useContext(userContext)





    useEffect(()=>{
        getuserdata();
       
        Aos.init({duration:1000})
        },[])
  return<>
  <div className="container mt-5 w-75 py-4">
    <div  data-aos='fade-right' className="row bg-main rounded-2 mt-5 text-center">
    <h2 data-aos='zoom-out-right'>Check Your Data </h2>
        <div className="d-flex">
            <ul data-aos='zoom-in-left' className=' text-start' >
                <li className='text-dark' > <span  className="text-dark fw-bold fs-4 ">name:</span> {userD?.name}</li>
                <li className='text-dark'> <span  className="text-dark fw-bold fs-4 ">Id:</span>{userD?.id} </li>
                <li className='text-dark'> <span  className="text-dark fw-bold fs-4 ">Role:</span>{userD?.role} </li>
                
                
            </ul>
    
        </div>
       
    </div>
  </div>
  
  
  </>
}
