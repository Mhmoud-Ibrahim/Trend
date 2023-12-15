import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aos from 'aos'
import 'aos/dist/aos.css'
import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "./Loading";

export default function ItemsDetails() {
const[loading,setloading]=useState(false)
    let {id,mediaType} = useParams();
    const[trending,setTrending]=useState({})
    async function getItemDetails(id,mediaType){
      setloading(true)
    let {data}= await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f3315c4ac6766b68283c8d019253abdc`)
    setTrending(data);
  setloading(false)
}
useEffect(()=>{
    Aos.init({duration:1000})
    getItemDetails(id,mediaType)
    },[])

  return <>
  <Helmet>
   <title>Details</title>
  </Helmet>
  {loading? <Loading/>:<div className="row">
     <div data-aos='zoom-in-left' className="col-md-4 p-5 "> 
        {trending?.poster_path?<img loading="lazy"  src={'https://image.tmdb.org/t/p/w500' + trending?.poster_path} className='w-100 ' height={350} alt="" />:<img  src={'https://image.tmdb.org/t/p/w500' + trending?.profile_path} className='w-100 ' alt="" />}
    </div>
 <div className="col-md-8 p-1 mt-2   ">
   <div className="itemDetails mt-5  d-flex justify-content-start  align-items-start flex-column">
   <h2  data-aos='zoom-in-left' className=" mb-5 text-info text-uppercase ">{trending?.name} {trending?.title}</h2>
   
 {trending?.popularity?<p  data-aos='zoom-in-right'> <span>popularity:</span> {trending.popularity}</p> : '' }
 {trending?.vote_average?<p  data-aos='zoom-in-right'> <span>Vote:</span> {trending?.vote_average}</p> : '' }
 {trending?.biography?<p  data-aos='zoom-in-right'> <span>Biography:</span> {trending.biography.split(' ').slice(0,20).join(" ")}</p> : '' }
 {trending?.original_name?<p  data-aos='zoom-in-right'><span>Original Name:</span>  {trending.original_name}</p> : '' }
 {trending.release_date?<p  data-aos='zoom-in-right'> <span>Release Date :</span>{trending.release_date}</p> : '' }
   </div>
  </div>
  </div>}
  

  
  </>
}
