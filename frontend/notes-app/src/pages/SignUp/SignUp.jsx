import React, { useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';


import Login from '../Login/Login';


const SignUp = () => {
  const[name, setName]=useState("");
  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");
  const[error, setError]=useState(null);

  const navigate=useNavigate()



  const handleSignup=async(e)=>{
    e.preventDefault();

    if(!name){
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)){
      setError("Please enter a valid Email address.");
      return;
    }

    if(!password){
      setError("Please enter a Password");
      return;
    }

    setError("");
    try{
      const response= await axiosInstance.post("/create-account",{
        fullName: name,
        email: email,
        password:password,
      });
      if (response.data && response.data.error){
        setError(response.data.message)
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }

    }catch(error){
      if (error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{setError("this unexpected error occured")}
    }

    
  }
  return (
    <div>
        <Navbar />
  <div className="flex items-center justify-center mt-28">
    <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignup}>
            <h4 className="2-xl mb-7">SignUp</h4>

            <input type="text" 
              placeholder="Name" 
              className="input-box flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 w-full text-sm  py-3 mr-3  outline-none"
              value={name} 
              onChange={(e)=>setName(e.target.value)}
              />

              <input type="text" 
              placeholder="Email" 
              className="input-box flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 w-full text-sm  py-3 mr-3  outline-none"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />

             <PasswordInput value={password}
             onChange={(e)=>setPassword(e.target.value)}/>

            {error&&<p className="text-red-500 text-xs pb-1">{error}</p>}


            <button type="submit" className="btn-primary">SignUp</button>


            <p className="text-sm text-center mt-4">
             Already have an account? 
             <Link to="/Login" className="font-medium text-primary underline"> Login Here
            </Link>
            </p>
        </form>
    </div>
    </div>
      
    </div>
  )
}

export default SignUp
