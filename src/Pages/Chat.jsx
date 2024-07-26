import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getallusers } from '../Utils/APIRoutes';
import Logoutbutton from '../Components/Logoutbutton/Logoutbutton';
import Inputbox from '../Components/Inputbox/Inputbox';
import { sendmessage } from '../Utils/APIRoutes';
import { getchat } from '../Utils/APIRoutes';
import "./chat.css"

const Chat = () => {
  const navigate  = useNavigate()
  const [contacts , setallcontacts] = useState([]);
  const [currrentuser , setcurrentuser] = useState(undefined)
  const [currrentchat , setcurrentchat] = useState(undefined)
  const [gif , setgif] = useState(false)
  function handlechangechat(item , index){
    setgif(true)
    console.log("selecter user is " , item)
    setcurrentchat(item)
  }
  useEffect(()=>{
    const checkinguserexist = async ()=>{
      if(!localStorage.getItem("chat-app-user")){
        navigate("/login")
      }
      
      else{
        setcurrentuser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    
    }
    checkinguserexist()

  } , [])

  useEffect(()=>{
    const  setalldata = async ()=>{
      if(currrentuser){
        if(currrentuser.isavtarimageset){
          const data = await axios.get(`${getallusers}/${currrentuser._id}`);
          setallcontacts(data.data);
          console.log(data)
           console.log(contacts)
        }
  
        else{
          navigate("/setavtar")
        }
      }

    }
   setalldata()

  } , [currrentuser])
  return (
  
    <div className="chat-board">
      <div className='main-container'>
      <div className="contacts-list">
      {contacts.map((item, index) => (
        <div key={index} className="contact-item" onClick={e => handlechangechat(item, index)}>
          <img
            src={`data:image/svg+xml;base64,${item.avtarimage}`}
            alt={`${item.username}`}
            className="avatar"
          />
          <span className="username">{item.username}</span>
        </div>
      ))}
    </div>
    <div className={`${!gif ? "currenchatwelcome" : "currentchat"}`}>
  

   
      {
        currrentchat && (
          
         <>
          <img
          src={`data:image/svg+xml;base64,${currrentchat.avtarimage}`}
          alt={`${currrentuser.username}`}
          className="avatar"
        />
      <div className='username'>{currrentchat.username}</div>
      <Logoutbutton/>
      <Inputbox currrentchat={currrentchat} currrentuser={currrentuser}></Inputbox>
      </>
          )
       
      }
      {!gif && (
        <>
          <img src={`${process.env.PUBLIC_URL}/robot.gif`} alt='roboto' />
          <h3>select chat for continue</h3>
        </>
      
      )}
    </div>
      </div>
    
    {console.log("this is the current user" , currrentuser)}
    {currrentuser && (<div className="current-user">
      <img
        src={`data:image/svg+xml;base64,${currrentuser.avtarimage}`}
        alt={`${currrentuser.username}`}
        className="avatar"
      />
      <span className="username">{currrentuser.username}</span>
    </div>)}
    
  </div>
  
  
  )
}

export default Chat
