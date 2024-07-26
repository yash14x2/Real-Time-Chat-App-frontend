import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { registerroute } from "../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  var counter = 0;
  const [value, setValue] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
  });

  const [error, setError] = useState({
    status: false,
    msg: "",
  });

  console.log(error);
  const  handlesubmit = async (e) => {
    for (const [key, val] of Object.entries(value)) {
      if (val == "") {
        counter += 1;
      }
    }
    e.preventDefault();
    if( handlevalidation()){
       const  {username , password , confirmpassword ,email } = value
        const {data} = await axios.post(registerroute , 
            {
              username ,
              password,
              confirmpassword,
              email  
            }
        )
    if(data.status == true){
        localStorage.setItem("chat-app-user" , JSON.stringify(data.user));
        navigate("/")
    }

    else{
        console.log("sorry not")
    }

        console.log("calling an api")
    }
   

    
  };

  const handlevalidation = () => {
     if (counter > 1) {
        setError({ ...error, status: true, msg: "please enter all fields" });
        return false
      } 
    else if (value.username === "") {
      setError({ ...error, status: true, msg: "please enter username" });
      return false
    } else if (value.email === "") {
      
      setError({ ...error, status: true, msg: "please enter ueser email" });
      return false
    } else if (value.password === "") {
      setError({ ...error, status: true, msg: "please insert user password" });
      return false
    } else if (value.confirmpassword === "") {
      setError({
        ...error,
        status: true,
        msg: "please insert usercinfirmpassword",
      });
      return false
    }
    else if (value.confirmpassword != value.password) {
        setError({
          ...error,
          status: true,
          msg: "password and confirm password is not matching",
        });
        return false
      }
    return true
  };
  const handlechange = (e) => {
    {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };
  return (
    <div>
      <form autocomplete="off">
        <label for="username">
          username
          <input
            type="text"
            name="username"
            value={value.username}
            onChange={handlechange}
          />
        </label>
        <label for="email">
          email
          <input
            type="text"
            name="email"
            value={value.email}
            onChange={handlechange}
          />
        </label>
        <label for="password">
          password
          <input
            type="password"
            name="password"
            value={value.password}
            onChange={handlechange}
          />
        </label>
        <label for="confirmpassword">
          confirmpassword
          <input
            type="password"
            name="confirmpassword"
            value={value.confirmpassword}
            onChange={handlechange}
          />
        </label>
        <button type="submit" onClick={handlesubmit}>
          Submit
        </button>
        <span>
          Alredy have an account ? <Link to="/login">Login</Link>
        </span>
        {error.status && error.msg}
      </form>
    </div>
  );
};

export default Register;
