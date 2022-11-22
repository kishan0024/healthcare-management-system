import React from 'react'
import "./login.css";
import HealingIcon from '@mui/icons-material/Healing';
import MedicationIcon from '@mui/icons-material/Medication';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
export const Login = () => {
  const [userType,setUserType]=useState("");
  const [userEmail,setUserEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  let navigate=useNavigate();

  const [dis,setDisplay]=useState("none");
console.log(dis);
  const login_validation = ()=>{
// console.log("hello");

    const userType=document.getElementById("inputType").value;
    const userEmail=document.getElementById("inputEmail").value;
    const password=document.getElementById("inputPassword").value;


    if(userType=="")
    {
    setError("Please select UserType...");
    setDisplay(1);
    }
    else if( userEmail=="")
    {
      // console.log("ssss");
      setError("Please Enter Email...");
      setDisplay(1);
      // document.getElementById("alertss").style.display="block";
    }
    else if( password=="")
    {
      setError("Please enter Password...");
      setDisplay(1);
    }
    else
    {
      const data={
        
        "Email":userEmail,
        "Password":password,
        "Usertype":userType
      }
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }
       
      let req=fetch("http://localhost:5000/User/SignIn",options);
      req.then(res =>
            res.json()).then(d => 
              {
                if(d.Status)
                {
                  alert(d.Status);
                  
                }
                else
                {
                  sessionStorage.setItem("useremail",d.Email);
                  sessionStorage.setItem("workId",d.WorkId);
                  sessionStorage.setItem("usertype",userType);
                  if(d.HospitalName)
                  {
                    sessionStorage.setItem("Hospital",d.HospitalName);  
                  }
                              
                  if(userType=="Admin")
                  {
                    navigate('/Admin/Dashboard');

                  }
                  else if(userType=="Doctor")
                  {
                    console.log(userType);
                    navigate('/Doctor/Dashboard');
                    
                  }
                  else if(userType="Pharmacist")
                  {
                    navigate('/Pharmacist/Dashboard')
                  }
                
                }
               
            })





    }


    // console.log(userType,userEmail,password); 
  };


  return (

    <>
    
   

    <div className="Signin_header">
      <div style={{color:"#f6f6f2"}}>
        <HealingIcon/>

      </div>
      <div> GLOBAL HOSPITALS</div>
       
    </div>
    <div class="alert alert-primary" role="alert" style={{display:(dis?'none':"block")}}>
      {error}
    </div>

    <div className="Signin_div" >
      <div className="Signin_div_inner pt-3">
        <div style={{fontWeight:"300",fontSize:"2rem",color:"#388087"}}>Welcome back!..</div>
        <div className="login_logo">
          <img src="medical.svg" alt="sda" style={{height:"80%",width:"80%"}}/>
        </div>
      </div>
      <div className='Signin_div_inner' >
        <div style={{width:"100%"}}>
            <div className="row g-3 p-3 justify-content-center">
            <div className="col-md-10">
              {/* <label for="inputEmail4" className="form-label">Email</label> */}
              <input type="email" className="form-control" id="inputEmail" placeholder='Email Id'/>
            </div>
            <div className="col-md-10">
              {/* <label for="inputPassword4" className="form-label">Password</label> */}
              <input type="password" className="form-control" id="inputPassword" placeholder='Password'/>
            </div>
            <div className="col-md-10 text-center">
              <label for="inputType" className="form-label">Select Role</label>
              <select id="inputType" className="form-select">
                <option selected value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Pharmacist">Pharmacist</option>
              </select>
            </div>

            <div className="d-flex justify-content-center mt-4">
            {/* <input type="submit" className="form-control" id="inputPassword" placeholder='Password'/> */}
            <button type="submit" className="btn btn-primary m-auto" onClick={login_validation}>Sign in</button>


            </div>
        
           
       
          </div>


        </div>

  




      </div>
    </div>
    </>
  )
}
