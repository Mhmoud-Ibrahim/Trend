import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import useTrending from '../Hooks/useTrending'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'




export default function Tv() {
    
  let {trending} = useTrending(`https://api.themoviedb.org/3/trending/tv/week?api_key=f3315c4ac6766b68283c8d019253abdc`)
  
  useEffect(()=>{
    Aos.init({duration:1000})
    },[])

  return <>
  <Helmet>
<title>Tvshow</title>
  </Helmet>
 <div className="container p-1">
  <div className="row  py-5">
    <div data-aos='zoom-in-up' className="col-md-3 card-title d-flex align-align-items-center">
    <div className='text-start'>
    <div className="brdr w-25 mb-3 "></div>
      <h2 className='h4' >Trending <br />TVshow <br />Right  </h2>
      <p className='  text-light-emphasis'>Top Trending TVshow By Week</p>
      <div className="brdr w-100 mb-3 "></div>
    </div>
    </div>

    {trending?.map((item , index)=> 
    <div data-aos='fade-right'  key={index}
     className="col-md-2 text-center">
    <Link className='text-decoration-none text-white' to={`/ItemsDetails/${item.id}/${item.media_type}`}>
    <div className='item position-relative' >
      {item.poster_path?<img loading='lazy' src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />:<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100 ' alt="" />}<img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100 ' alt="" />
      <h4 className="h6 my-2">{item.name} {item.title} </h4>
      {item.vote_average?      <div className='vote p-1 top-0 end-0 position-absolute'  >{item.vote_average.toFixed(2)}</div>:""}
    </div>
</Link>
  </div>   )}
  </div>
 </div>

 
  
  </>
}
