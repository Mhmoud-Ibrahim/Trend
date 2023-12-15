import axios from "axios";
import { useEffect, useState } from "react"


 export default function useTrending(url){

const[trending,setTrending]=useState([]);



async function getTrending(){

    let {data} =await axios.get(url)
    setTrending(data.results);
    
}

useEffect(()=>{
    getTrending();
})


    return{trending}
}