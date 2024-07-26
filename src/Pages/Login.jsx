import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { loginroute } from '../Utils/APIRoutes';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const Login = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/")
        }
    } , [])
const [responsedata , setresponsedata] = useState()
    const [error , seterror] = useState({
       status : false , 
       msg : "" 
    })
    const [userloginvalue , setuserloginvalue] = useState({
        username : "",
        password:""
    })
    
    const hadnlevalidation = ()=>{
const {username , password} =   userloginvalue
        if(username.trim()===""){
            seterror({status:true , msg:"enter username to process furtehr"});
            return false
        }

        else if(password.trim()===""){
            
            seterror({status:true , msg:"enter password to process furtehr"});
            return false
        }
        return true
    }
    
    const handlechange = (e)=>{
        setuserloginvalue({
            ...userloginvalue , [e.target.name] : e.target.value
        })
    
    }

    const handlesubmit = async(e)=>{
        e.preventDefault();
        if(hadnlevalidation()){
            const {data} = await axios.post(loginroute , {
                username : userloginvalue.username,
                password : userloginvalue.password
            })
console.log("this is og data" ,data)
            
            if(!data.status){
                setresponsedata(data)
            }

            else{
                localStorage.setItem("chat-app-user" , JSON.stringify(data.userfind));
                
                navigate("/")

            }

         


      
        }
        else{
            console.log("sorry")
        }
      
    }
    
    console.log(responsedata)
  return (
    <div>
       <form autocomplete="off">
        <label for="username">
          username
          <input
            type="text"
            name="username"
            value={userloginvalue.username}
            onChange={handlechange}
          />
        </label>
       
        <label for="password">
          password
          <input
            type="password"
            name="password"
            value={userloginvalue.password}
            onChange={handlechange}
          />
        </label>
     
        <button type="submit" onClick={handlesubmit}>
          Submit
        </button>
     
        {!responsedata?.status && responsedata?.msg}
      </form>
    </div>
  )
}

export default Login
