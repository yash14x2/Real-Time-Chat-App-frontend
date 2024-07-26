import React from 'react';
import './logout.css';
import { useNavigate } from 'react-router-dom';

const Logoutbutton = () => {
    const navigate = useNavigate()
    function handleLogout(){
        localStorage.removeItem('chat-app-user')
        navigate("/login")
    }
  return (
    <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
  )
}

export default Logoutbutton
