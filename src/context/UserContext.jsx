import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState} from "react";

 export let userContext = createContext();


export default function UserContextProvider(props){
const[userD,setuserD]=useState();

 function getuserdata(){
    let undecodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(undecodedToken)
    setuserD(decodedToken)
 }


 function logout(){
    localStorage.removeItem("userToken");
    setuserD(null)
 }




 useEffect(()=>{
    if(localStorage.getItem('userToken') !==null){
        
        getuserdata();
    }
   
  },[])
 

return <userContext.Provider value={{getuserdata,userD,logout,setuserD}}>
    {props.children}
</userContext.Provider>
 }
