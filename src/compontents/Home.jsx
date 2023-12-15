import { useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Tv from './Tv'
import People from './People'
import Movies from './Movies'
import { Helmet } from 'react-helmet'
import Loading from './Loading'



export default function Home() {

const[loading,setLoading]=useState(false);
setTimeout(isloading,1500)

function isloading(){
  setLoading(false)
}

  useEffect(()=>{
    setLoading(true)
    Aos.init({duration:1000})
    },[])

  return <>
  <Helmet>
    <title>Home</title>
  </Helmet>
  {loading?<Loading/>:
  <div className="container">
  <Movies/>
  <Tv/>
  <People/>
 </div>}
 


 
  </>
}
